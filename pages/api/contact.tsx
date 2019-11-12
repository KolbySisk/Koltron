import Slack from '../../server/slack';

export default (req, res) => {
  const {
    body: { email, message },
    method,
  } = req;

  if (method === 'POST') {
    (async () => {
      try {
        await Slack.Send(`${email} says: ${message}`);
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
