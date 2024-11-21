import { createServer } from "http";
import { EdgeConfigClient } from "@vercel/edge-config";
import { Bot } from "grammy";
import * as dotenv from "dotenv";

// Lokal test üçün .env faylını yüklə
dotenv.config();

const edgeConfig = new EdgeConfigClient();
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN); // Bot tokeni Vercel-dən alınır

// İstifadəçi üçün xal əldə et
const getUserScore = async (userId) => {
  const scores = (await edgeConfig.get("scores")) || {};
  return scores[userId] || 0;
};

// İstifadəçinin xallarını yenilə
const updateUserScore = async (userId, score) => {
  const scores = (await edgeConfig.get("scores")) || {};
  scores[userId] = score;
  await edgeConfig.set("scores", scores);
};

// Bot əmrləri
bot.command("start", async (ctx) => {
  const userId = ctx.from.id.toString();
  const score = await getUserScore(userId);
  await ctx.reply(`Salam, ${ctx.from.first_name}! Sizin xallarınız: ${score}`);
});

// HTTP Server
createServer(async (req, res) => {
  // HTML səhifəni qaytarır
  if (req.method === "GET" && req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(`
      <!DOCTYPE html>
      <html>
      <!-- HTML fayl buraya yerləşdiriləcək -->
      </html>
    `);
  }
  // İstifadəçinin xallarını serverdən alır
  else if (req.method === "GET" && req.url === "/get-score") {
    const userId = "STATIC_USER_ID"; // Dinamik olaraq Telegram ID ilə əvəz olunmalıdır
    const score = await getUserScore(userId);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ score }));
  }
  // İstifadəçinin xallarını serverə saxlayır
  else if (req.method === "POST" && req.url === "/update-score") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const { score } = JSON.parse(body);
      const userId = "STATIC_USER_ID"; // Dinamik olaraq Telegram ID ilə əvəz olunmalıdır
      await updateUserScore(userId, score);
      res.end("Score updated");
    });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
}).listen(3000, () => console.log("Server running on port 3000"));

// Botu işə sal
bot.start();