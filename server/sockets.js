module.exports = server => {
  const io = require('socket.io')(server);
  const Slack = require('./slack');

  const socketIds = [];

  io.on('connect', socket => {
    socket.on('message', async message => {
      try {
        await Slack.Send(`${socket.id} -- ${message}`);
      } catch (error) {
        console.log(error);
      }
    });
  });
};
