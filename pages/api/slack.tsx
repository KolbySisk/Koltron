import signVerification from '../../server/slack-verify';

export default (req, res, next) => {
  const { method } = req;

  console.log(req.body);

  if (method === 'POST') {
    signVerification(req, res, next);
  }

  // method isn't allowed so return 405
  else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }
};
