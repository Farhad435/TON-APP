import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN); // BOT_TOKEN mühit dəyişənindən alınır

bot.start((ctx) => {
    ctx.reply('Salam! TON APP Clicker oyununa xoş gəldiniz! Xalınızı yığmağa başlayın!');
});

bot.launch();