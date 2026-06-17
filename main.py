import os
import asyncio
from flask import Flask, request, jsonify
import discord
from discord.ext import commands

# ==========================================
# 1. KONFIGURACJA STRONY WWW (Flask)
# ==========================================
app = Flask(__name__)

# Przykładowe ID kanału, na który bot ma wysyłać wiadomości ze strony www
CHANNEL_ID = 123456789012345678  # Zmień na ID swojego kanału z Discorda

@app.route('/')
def home():
    return "<h1>Bot wirtualnysystemrp.pl działa!</h1>"

@app.route('/wyslij-wiadomosc', methods=['POST'])
def send_from_web():
    data = request.json
    tekst = data.get("wiadomosc")
    if tekst:
        # Bezpieczne przekazywanie zadania do asynchronicznej pętli bota
        bot.loop.create_task(ogloszenie_na_dc(tekst))
        return jsonify({"status": "sukces", "info": "Wysłano na Discorda!"}), 200
    return jsonify({"status": "error", "info": "Brak tekstu"}), 400

async def ogloszenie_na_dc(tekst):
    channel = bot.get_channel(CHANNEL_ID)
    if channel:
        await channel.send(f"📢 **Komunikat ze strony:** {tekst}")

# ==========================================
# 2. KONFIGURACJA BOTA DISCORDA
# ==========================================
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f'Zalogowano jako: {bot.user.name}')

# ==========================================
# 3. URUCHOMIENIE (BEZ THREADINGU)
# ==========================================
async def main():
    # Pobieranie portu przypisanego przez Render
    port = int(os.environ.get("PORT", 5000))
    
    # Uruchomienie serwera Flask asynchronicznie w tle bota
    # Dzięki temu Render widzi aktywną stronę internetową
    import werkzeug.serving
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, lambda: werkzeug.serving.run_simple('0.0.0.0', port, app, use_debugger=False, use_reloader=False))
    
    # Pobieranie tokenu ze zmiennych środowiskowych Rendera
    TOKEN = os.environ.get("TOKEN")
    if not TOKEN:
        print("BŁĄD: Brak zmiennej TOKEN w ustawieniach Rendera!")
        return

    async with bot:
        await bot.start(TOKEN)

if __name__ == "__main__":
    asyncio.run(main())
