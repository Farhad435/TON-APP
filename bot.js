const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  const telegramId = ctx.from.id;
  const gameUrl = `https://your-vercel-app-url.vercel.app?telegramId=${telegramId}`;
  ctx.reply(`Salam, ${ctx.from.first_name}! Oyuna başlamaq üçün link: ${gameUrl}`);
});

bot.launch();
