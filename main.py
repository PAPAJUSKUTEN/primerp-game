import os
import asyncio
import urllib.request
from flask import Flask, request, jsonify
import discord
from discord.ext import commands

# ==========================================
# 1. KONFIGURACJA STRONY WWW (Flask)
# ==========================================
app = Flask(__name__)
CHANNEL_ID = 123456789012345678  # ID kanału do powiadomień ze strony www

@app.route('/')
def home():
    return "<h1>Bot SOP działa i jest utrzymywany przy życiu!</h1>"

@app.route('/wyslij-wiadomosc', methods=['POST'])
def send_from_web():
    data = request.json
    tekst = data.get("wiadomosc")
    if tekst:
        bot.loop.create_task(ogloszenie_na_dc(tekst))
        return jsonify({"status": "sukces", "info": "Wysłano na Discorda!"}), 200
    return jsonify({"status": "error", "info": "Brak tekstu"}), 400

async def ogloszenie_na_dc(tekst):
    channel = bot.get_channel(CHANNEL_ID)
    if channel:
        await channel.send(f"📢 **Komunikat ze strony:** {tekst}")

# ==========================================
# 2. WEWNĘTRZNY SYSTEM KEEP-ALIVE (Self-Ping)
# ==========================================
async def self_ping():
    """Funkcja, która co 10 minut wchodzi na własny adres URL, zapobiegając uśpieniu na Renderze"""
    await asyncio.sleep(30) # Poczekaj pół minuty na pełne uruchomienie serwera
    while True:
        try:
            # Render automatycznie udostępnia nazwę aplikacji w zmiennej RENDER_EXTERNAL_URL
            url = os.environ.get("RENDER_EXTERNAL_URL", "http://localhost:5000")
            
            # Wykonujemy zapytanie do samego siebie
            req = urllib.request.Request(url, headers={'User-Agent': 'SOP-KeepAlive-Bot'})
            with urllib.request.urlopen(req) as response:
                response.read()
            print("[Keep-Alive] Pomyślnie wysłano ping do samego siebie.")
        except Exception as e:
            print(f"[Keep-Alive] Nie udało się wysłać pingu: {e}")
        
        await asyncio.sleep(600) # Czekaj 10 minut (600 sekund) przed kolejnym puknięciem

# ==========================================
# 3. KONFIGURACJA BOTA DISCORDA
# ==========================================
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f'Zalogowano pomyślnie jako: {bot.user.name}')
    # Uruchomienie pętli self-ping w tle bota zaraz po zalogowaniu
    bot.loop.create_task(self_ping())

@bot.command()
async def ping(ctx):
    WYMAGANA_ROLA_ID = 1516825582002765894
    ma_role = any(role.id == WYMAGANA_ROLA_ID for role in ctx.author.roles)
    
    if ma_role:
        await ctx.send('yoo jestem tu')
    else:
        await ctx.send('Nie masz odpowiedniej roli, aby użyć tej komendy.', delete_after=5)

# ==========================================
# 4. ASYNCHRONICZNE URUCHOMIENIE CAŁOŚCI
# ==========================================
async def main():
    port = int(os.environ.get("PORT", 5000))
    
    import werkzeug.serving
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, lambda: werkzeug.serving.run_simple('0.0.0.0', port, app, use_debugger=False, use_reloader=False))
    
    TOKEN = os.environ.get("TOKEN")
    if not TOKEN:
        print("BŁĄD: Brak zmiennej TOKEN w ustawieniach środowiskowych Rendera!")
        return

    async with bot:
        await bot.start(TOKEN)

if __name__ == "__main__":
    asyncio.run(main())
