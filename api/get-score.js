import { get } from '@vercel/edge-config';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send('Missing userId');
  }

  const userScore = await get(userId);
  res.status(200).json({ score: userScore || 0 });
}

