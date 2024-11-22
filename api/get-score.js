import { get } from '@vercel/edge-config';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    try {
      const score = await get(userId); // Xalı ID ilə geri al
      res.status(200).json({ score: score || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get score' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
