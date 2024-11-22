import { set } from '@vercel/edge-config';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, score } = req.body;

    if (!userId || score == null) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    try {
      await set(userId, score); // Xalı istifadəçinin ID-si ilə saxla
      res.status(200).json({ message: 'Score updated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update score' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
