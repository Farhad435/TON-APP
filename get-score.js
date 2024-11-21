import { Blob } from '@vercel/blob';

export default async function handler(req, res) {
    const { userId } = req.query;

    // Blob Database-dən istifadəçinin xallarını oxumaq
    const blob = new Blob('your-blob-namespace'); // Əslində burada Blob-dan istifadə etməlisiniz
    const score = await blob.get(`user_${userId}_score`);

    res.status(200).json({ score: score || 0 });
}