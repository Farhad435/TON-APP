const { Telegraf } = require('telegraf');
const express = require('express');
require('dotenv').config();

// Mühit dəyişənindən BOT_TOKEN götür
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN mühit dəyişəni təyin edilməyib!');
}

// Telegraf botu yarat
const bot = new Telegraf(BOT_TOKEN);

// Mesajlara cavab
bot.start((ctx) => ctx.reply('Salam! Bu mənim Telegram botumdur. Necə kömək edə bilərəm?'));
bot.on('text', (ctx) => {
  const text = ctx.message.text;
  ctx.reply(`Siz dediniz: ${text}`);
});

// Webhook üçün Express serveri
const app = express();

// Webhook endpoint-i
app.use(bot.webhookCallback('/'));

const PORT = process.env.PORT || 3000;

// Botun Webhook URL-ini qur
const WEBHOOK_URL = process.env.WEBHOOK_URL || `https://your-vercel-project.vercel.app`;

bot.telegram.setWebhook(`${WEBHOOK_URL}/`);

// Server işə sal
app.listen(PORT, () => {
  console.log(`Bot server ${PORT} portunda işləyir!`);
});
