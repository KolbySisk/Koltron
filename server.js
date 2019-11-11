const next = require('next');
const compression = require('compression');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  const server = require('http').Server(app);
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    console.log('wooo ' + socket);
  });

  server.use(compression());

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
