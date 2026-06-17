import os
import asyncio
from flask import Flask, request, jsonify
import discord
from discord.ext import commands

# ==========================================
# 1. KONFIGURACJA STRONY WWW (Flask)
# ==========================================
app = Flask(__name__)

# Jeśli w przyszłości będziesz chciał wysyłać wiadomości ze strony www na konkretny kanał,
# wklej tutaj jego ID (np. kanał z logami).
CHANNEL_ID = 123456789012345678  

@app.route('/')
def home():
    return "<h1>Bot wirtualnysystemrp.pl działa!</h1>"

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
# 2. KONFIGURACJA BOTA DISCORDA
# ==========================================
intents = discord.Intents.default()
intents.message_content = True  # Wymagane, aby bot widział treść wiadomości (!ping)
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f'Zalogowano pomyślnie jako: {bot.user.name}')

@bot.command()
async def ping(ctx):
    # ID roli, która jako jedyna może użyć tej komendy
    WYMAGANA_ROLA_ID = 1516825582002765894
    
    # Sprawdzenie, czy użytkownik piszący komendę posiada rolę o tym ID
    ma_role = any(role.id == WYMAGANA_ROLA_ID for role in ctx.author.roles)
    
    if ma_role:
        # Odpowiedź, gdy użytkownik MA rolę
        await ctx.send('yoo jestem tu')
    else:
        # Odpowiedź (usuwana po 5 sekundach), gdy użytkownik NIE MA roli
        await ctx.send('Nie masz odpowiedniej roli, aby użyć tej komendy.', delete_after=5)

# ==========================================
# 3. ASYNCHRONICZNE URUCHOMIENIE CAŁOŚCI
# ==========================================
async def main():
    # Pobieranie portu dynamicznie przypisanego przez hosting Render
    port = int(os.environ.get("PORT", 5000))
    
    # Uruchomienie serwera www w tle bota (zapobiega crashom na Renderze)
    import werkzeug.serving
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, lambda: werkzeug.serving.run_simple('0.0.0.0', port, app, use_debugger=False, use_reloader=False))
    
    # Pobieranie tokenu bota z ustawień "Environment Variables" na Renderze
    TOKEN = os.environ.get("TOKEN")
    if not TOKEN:
        print("BŁĄD: Brak zmiennej TOKEN w ustawieniach środowiskowych Rendera!")
        return

    async with bot:
        await bot.start(TOKEN)

if __name__ == "__main__":
    asyncio.run(main())
