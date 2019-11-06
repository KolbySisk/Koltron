const { WebClient } = require('@slack/web-api');

const slackToken = process.env.SLACK_TOKEN;

export default (req, res) => {
  const {
    body: { email, message },
    method,
  } = req;

  if (method === 'POST') {
    const token = slackToken;
    const web = new WebClient(token);
    const conversationId = 'C0AT2K09K';

    (async () => {
      try {
        await web.chat.postMessage({
          channel: conversationId,
          text: `${email} says: ${message}`,
        });
      } catch (error) {
        res.status(500).json({ message: 'Error sending message.' });
      }
    })();

    res.status(200).json({ message: 'Message successfully sent.' });
  }

  // method isn't allowed so return 405
  else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }
};
