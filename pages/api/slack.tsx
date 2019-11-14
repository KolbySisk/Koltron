// import signVerification from '../../server/slack-verify';

// export default (req, res) => {
//   const { method } = req;

//   if (method === 'POST') {
//     if (!signVerification(req, res)) return;
//     res.send(200);

//     if (req.body.event.bot_id) return;

//     const slackMessage: string = req.body.event.text;
//     const slackMessageSplit: string[] = slackMessage.split('--');

//     if (slackMessageSplit.length) {
//       const g: any = global;
//       const io = g._io;

//       const socketId = slackMessageSplit[0].trim();
//       const message = slackMessageSplit[1].trim();

//       if (io.sockets.connected[socketId]) {
//         io.sockets.connected[socketId].emit('message', message);
//       }
//     }
//   }

//   // method isn't allowed so return 405
//   else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${method} Not Allowed`);
//     return;
//   }
// };

/**
 * Uncomment for slack even verification
 */

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
