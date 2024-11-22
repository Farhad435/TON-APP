import { getEdgeConfig } from '@vercel/edge-config';

export default async function handler(req, res) {
  const { telegramId, score } = req.body;

  try {
    const edgeConfig = await getEdgeConfig();
    await edgeConfig.set(`score-${telegramId}`, score);
    res.status(200).json({ message: 'Score updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update score' });
  }
}
