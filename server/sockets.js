const Slack = require('./slack');

module.exports = server => {
  global._io = require('socket.io')(server);

  global._io.on('connect', socket => {
    socket.on('message', async message => {
      try {
        await Slack.Send(`${socket.id} -- ${message}`);
      } catch (error) {
        console.log(error);
      }
    });
  });
};
