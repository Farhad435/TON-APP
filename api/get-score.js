import { getEdgeConfig } from '@vercel/edge-config';

export default async function handler(req, res) {
  const { telegramId } = req.query;

  try {
    const edgeConfig = await getEdgeConfig();
    const score = await edgeConfig.get(`score-${telegramId}`);
    res.status(200).json({ score: score || 0 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve score' });
  }
}
