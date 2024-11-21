import { Blob } from '@vercel/blob';

export default async function handler(req, res) {
    const { userId, score } = req.query;

    // Blob Database-ə bağlantı qurulması
    const blob = new Blob('your-blob-namespace'); // Əslində burada Blob-dan istifadə etməlisiniz
    await blob.set(`user_${userId}_score`, score); // Xalı saxlamaq

    res.status(200).json({ message: 'Score updated successfully!' });
}
