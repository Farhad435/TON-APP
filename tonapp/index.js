const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

require("dotenv").config(); // To load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Telegram Bot Token
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

const path = require("path");

// Serve the web app
app.use(express.static(path.join(__dirname, "public")));


// Endpoint to handle Telegram updates
app.post(`/webhook/${TELEGRAM_TOKEN}`, async (req, res) => {
  const { message } = req.body;

  if (message) {
    const chatId = message.chat.id;

    // Send a welcome message
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: "Welcome to My Web App! Click below to open the app.",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Open Web App",
              web_app: {
                url: "https://your-web-app-url.com", // Replace with your hosted app's URL
              },
            },
          ],
        ],
      },
    });
  }

  res.sendStatus(200);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

