from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# /start komandası işləyəndə bu funksiya çağırılacaq
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Salam! Botumuza xoş gəldiniz. 😊")

# Botu işə salmaq
if __name__ == '__main__':
    # Botun tokenini buraya yaz
    TOKEN = "7655492976:AAH1O60OWWea_nOn6460jsBHdVxaD6aGC28"
    
    # Bot üçün tətbiq yaradılır
    app = ApplicationBuilder().token(TOKEN).build()
    
    # /start komandası üçün handler əlavə olunur
    app.add_handler(CommandHandler("start", start))
    
    print("Bot işə düşdü...")
    # Botu işə sal
    app.run_polling()

