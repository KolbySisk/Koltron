const next = require('next');
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const nextHandler = nextApp.getRequestHandler();
const socketsConfig = require('./sockets');
const { createServer } = require('http');
const { parse } = require('url');

const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

nextApp.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    nextHandler(req, res, parsedUrl);

    slackEvents.requestListener();

    // // Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
    // slackEvents.on('message', event => {
    //   console.log(
    //     `Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`
    //   );
    // });

    // // Handle errors (see `errorCodes` export)
    // slackEvents.on('error', console.error);
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });

  socketsConfig(server);
});
