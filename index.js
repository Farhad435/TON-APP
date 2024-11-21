import { Router } from 'itty-router';
import fetch from 'node-fetch';

// Vercel Edge Config üçün lazımi kitabxana
import { get, set } from '@vercel/edge-config';

const router = Router();

// BOT_TOKEN ətraf mühit dəyişəni
const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const WEBHOOK_PATH = `/webhook/${BOT_TOKEN}`;
const WEBHOOK_URL = `https://<your-vercel-domain>${WEBHOOK_PATH}`;

// Webhook qurulumu
async function setWebhook() {
  const response = await fetch(`${TELEGRAM_API}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: WEBHOOK_URL }),
  });

  if (!response.ok) {
    console.error('Webhook qurulmadı:', await response.text());
    throw new Error('Webhook setup failed');
  }
}

// Başlanğıc endpoint
router.post(WEBHOOK_PATH, async (request) => {
  const { message } = await request.json();

  if (message) {
    const chatId = message.chat.id;
    const userId = `user_${chatId}`;
    const text = message.text;

    if (text === '/start') {
      // İstifadəçini salamlamaq
      await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: 'Salam! Sizin xallarınız qeydə alınacaq. Başlamaq üçün clicker səhifəsinə keçid edin.',
        }),
      });

      // Xalı sıfırla, əgər mövcud deyilsə
      const existingScore = await get(userId);
      if (existingScore === undefined) {
        await set(userId, 0); // Yeni istifadəçi üçün xal sıfırdır
      }
    }
  }

  return new Response('OK', { status: 200 });
});

// Xal artırmaq API
router.post('/increment-score', async (request) => {
  const { userId } = await request.json();

  const scoreKey = `user_${userId}`;
  const currentScore = (await get(scoreKey)) || 0;

  const newScore = currentScore + 1;
  await set(scoreKey, newScore); // Yeni xal saxlama

  return new Response(JSON.stringify({ score: newScore }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

// Səhifəni yükləyərkən xal göstərmək
router.get('/get-score/:userId', async ({ params }) => {
  const { userId } = params;
  const scoreKey = `user_${userId}`;

  const score = (await get(scoreKey)) || 0;

  return new Response(JSON.stringify({ score }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

// Yönləndirmə
router.all('*', () => new Response('Not Found', { status: 404 }));

export default {
  async fetch(request, env, context) {
    return router.handle(request);
  },
};

// Webhook quraşdır
setWebhook().catch(console.error);