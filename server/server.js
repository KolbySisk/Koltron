const next = require('next');
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const nextHandler = nextApp.getRequestHandler();
const socketsConfig = require('./sockets');
const { createServer } = require('http');
const { parse } = require('url');

nextApp.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    nextHandler(req, res, parsedUrl);
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });

  socketsConfig(server);
});
