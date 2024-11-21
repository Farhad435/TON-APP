const TelegramBot = require('node-telegram-bot-api');

// Çevrə dəyişənlərindən bot tokenini götür
const token = process.env.BOT_TOKEN;

// Botu yaradın
const bot = new TelegramBot(token, { polling: true });

// İstifadəçi /start mesajı göndərəndə
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Salam! TON APP oyununa xoş gəldiniz!");
});