const { WebClient } = require('@slack/web-api');
const slackClient = new WebClient(process.env.SLACK_TOKEN);
const channelId = 'C0AT2K09K';

module.exports = {
  async Send(message) {
    await slackClient.chat.postMessage({ channel: channelId, text: message });
  },
};
