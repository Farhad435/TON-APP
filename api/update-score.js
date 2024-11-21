import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient("clicker-scores");

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { telegramId } = req.body;

    if (!telegramId) {
      return res.status(400).json({ error: "Telegram ID is required" });
    }

    const blobClient = containerClient.getBlockBlobClient(telegramId);
    
    try {
      // İstifadəçinin mövcud xalına yenisini əlavə et
      const existingBlob = await blobClient.downloadToBuffer();
      let score = existingBlob.length ? parseInt(existingBlob.toString()) : 0;
      score += 1; // Xalı bir vahid artır

      // Yeni xal ilə yenilə
      await blobClient.upload(Buffer.from(score.toString()), score.toString().length);

      return res.status(200).json({ score });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update score" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
