import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient("clicker-scores");

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { telegramId } = req.query;

    if (!telegramId) {
      return res.status(400).json({ error: "Telegram ID is required" });
    }

    const blobClient = containerClient.getBlockBlobClient(telegramId);

    try {
      // Xalı al
      const existingBlob = await blobClient.downloadToBuffer();
      let score = existingBlob.length ? parseInt(existingBlob.toString()) : 0;
      return res.status(200).json({ score });
    } catch (error) {
      return res.status(500).json({ error: "Failed to retrieve score" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
