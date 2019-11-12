const crypto = require('crypto');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

let signVerification = (req, res, next) => {
  let slackSignature = req.headers['x-slack-signature'];
  let requestBody = JSON.stringify(req.body);
  let timestamp = req.headers['x-slack-request-timestamp'];
  let time = Math.floor(new Date().getTime() / 1000);

  if (Math.abs(time - timestamp) > 300) {
    return res.status(400).send('Ignore this request.');
  }

  if (!slackSigningSecret) {
    return res.status(400).send('Slack signing secret is empty.');
  }

  let sigBasestring = 'v0:' + timestamp + ':' + requestBody;
  let mySignature =
    'v0=' +
    crypto
      .createHmac('sha256', slackSigningSecret)
      .update(sigBasestring, 'utf8')
      .digest('hex');

  const verified = crypto.timingSafeEqual(
    Buffer.from(mySignature, 'utf8'),
    Buffer.from(slackSignature, 'utf8')
  );

  if (verified) {
    return verified;
  } else {
    return res.status(400).send('Verification failed');
  }
};

module.exports = signVerification;
