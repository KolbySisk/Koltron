import signVerification from '../../server/slack-verify';

export default (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    if (!signVerification(req, res)) return;
    res.send(req.body.challenge);
  }

  // method isn't allowed so return 405
  else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }
};
