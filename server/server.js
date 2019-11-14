const next = require('next');
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const nextHandler = nextApp.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

const { createServer } = require('http');
const { parse } = require('url');

const socketsConfig = require('./sockets');

const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

nextApp.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    nextHandler(req, res, parsedUrl);

    slackEvents.requestListener();
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`=> Ready on http://localhost:${port}`);
  });

  socketsConfig(server);
});
