from fastapi import FastAPI, Request
from telegram import Update, Bot
import os  # Mühit dəyişənləri üçün

app = FastAPI()

# Tokeni mühit dəyişənindən al
TOKEN = os.getenv("BOT_TOKEN")
if not TOKEN:
    raise ValueError("BOT_TOKEN mühit dəyişəni təyin edilməyib!")

bot = Bot(token=TOKEN)

@app.post("/")
async def webhook(request: Request):
    data = await request.json()
    update = Update.de_json(data, bot)
    if update.message and update.message.text == "/start":
        await update.message.reply_text("Salam! Botumuza xoş gəldiniz. 😊")
    return {"ok": True}
