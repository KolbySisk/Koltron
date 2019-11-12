const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_TOKEN;
const slackClient = new WebClient(token);
const channelId = 'C0AT2K09K';

module.exports = {
  async Send(message) {
    await slackClient.chat.postMessage({ channel: channelId, text: message });
  },
};
