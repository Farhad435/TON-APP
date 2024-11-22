import { set } from '@vercel/edge-config';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { userId, score } = req.body;

  if (!userId || score === undefined) {
    return res.status(400).send('Missing userId or score');
  }

  await set(userId, score);
  res.status(200).send('Score updated');
}

