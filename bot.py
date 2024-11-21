import os
from flask import Flask, request, jsonify
import requests

# Flask tətbiqi yarat
app = Flask(__name__)

# Bot token-i mühit dəyişənindən götür
BOT_TOKEN = os.getenv("BOT_TOKEN")

if not BOT_TOKEN:
    raise ValueError("BOT_TOKEN mühit dəyişəni təyin edilməyib!")

# Telegram API bazası
TELEGRAM_API_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

# Webhook üçün endpoint
@app.route("/", methods=["POST"])
def webhook():
    # Telegram-dan gələn sorğunu al
    update = request.json
    
    # Mesaj olub-olmadığını yoxla
    if "message" in update:
        chat_id = update["message"]["chat"]["id"]
        text = update["message"].get("text", "")
        
        # Mesaj cavablandırma loqikası
        if text.lower() == "/start":
            reply = "Salam! Bu mənim Telegram botumdur. Necə kömək edə bilərəm?"
        else:
            reply = "Siz dediniz: " + text
        
        # Mesaj göndər
        send_message(chat_id, reply)
    
    return jsonify({"ok": True})

def send_message(chat_id, text):
    """Telegram-da mesaj göndərmək üçün funksiya"""
    url = f"{TELEGRAM_API_URL}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": text
    }
    requests.post(url, json=payload)

# Server işə salınır
if __name__ == "__main__":
    # Yerli test üçün port seçin
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
