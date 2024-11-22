import { get } from '@vercel/edge-config';

export default async function handler(req, res) {
  const { telegramId } = req.query;

  try {
    const score = await get(`score-${telegramId}`);
    res.status(200).json({ score: score || 0 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve score' });
  }
}
