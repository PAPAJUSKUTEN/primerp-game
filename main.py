import os
import asyncio
import urllib.request
from flask import Flask, request, jsonify
import discord
from discord.ext import commands
from discord import app_commands, ui

# ==========================================
# 1. KONFIGURACJA STRONY WWW (Flask)
# ==========================================
app = Flask(__name__)
CHANNEL_ID = 123456789012345678  

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
    await asyncio.sleep(30)
    while True:
        try:
            url = os.environ.get("RENDER_EXTERNAL_URL", "http://localhost:5000")
            req = urllib.request.Request(url, headers={'User-Agent': 'SOP-KeepAlive-Bot'})
            with urllib.request.urlopen(req) as response:
                response.read()
            print("[Keep-Alive] Pomyślnie wysłano ping do samego siebie.")
        except Exception as e:
            print(f"[Keep-Alive] Nie udało się wysłać pingu: {e}")
        await asyncio.sleep(600)

# ==========================================
# 3. WIDOK I LOGIKA DIALOGU TICKETÓW (UI)
# ==========================================
class TicketButton(ui.View):
    def __init__(self):
        super().__init__(timeout=None) # timeout=None sprawia, że przycisk działa zawsze, nawet po restarcie bota

    @ui.button(label="Stwórz Ticket", style=discord.ButtonStyle.green, custom_id="create_ticket_btn", emoji="📩")
    async def create_ticket(self, interaction: discord.Interaction, button: ui.Button):
        # ID kategorii, w której mają tworzyć się tickety
        KATEGORIA_ID = 1516847056210366645
        
        guild = interaction.guild
        category = discord.utils.get(guild.categories, id=KATEGORIA_ID)
        
        if not category:
            await interaction.response.send_message("Błąd: Nie znaleziono podanej kategorii ticketów na serwerze.", ephemeral=True)
            return

        # Nazwa nowego kanału (np. ticket-janek)
        channel_name = f"ticket-{interaction.user.name}"
        
        # Ustawienia uprawnień: tylko autor i administracja widzą kanał
        overwrites = {
            guild.default_role: discord.PermissionOverwrite(read_messages=False),
            interaction.user: discord.PermissionOverwrite(read_messages=True, send_messages=True, embed_links=True, attach_files=True),
            guild.me: discord.PermissionOverwrite(read_messages=True, send_messages=True)
        }

        # Tworzenie kanału w wybranej kategorii
        ticket_channel = await guild.create_text_channel(name=channel_name, category=category, overwrites=overwrites)
        
        # Wysłanie powitania w nowym tickecie
        embed = discord.Embed(
            title="🎫 Nowy Ticket",
            description=f"Witaj {interaction.user.mention}!\nNapisz w czym możemy Ci pomóc. Administracja zajmie się Twoim zgłoszeniem tak szybko, jak to możliwe.",
            color=discord.Color.blue()
        )
        await ticket_channel.send(embed=embed)
        
        # Ukryta odpowiedź dla klikającego, że kanał został utworzony
        await interaction.response.send_message(f"Pomyślnie utworzono Twój ticket: {ticket_channel.mention}", ephemeral=True)

# ==========================================
# 4. KONFIGURACJA BOTA DISCORDA
# ==========================================
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f'Zalogowano pomyślnie jako: {bot.user.name}')
    
    # Rejestrujemy przycisk w bocie, aby działał po restarcie bota (Persistent View)
    bot.add_view(TicketButton())
    
    # Synchronizacja komend Slash z Discordem
    try:
        synced = await bot.tree.sync()
        print(f"Zsynchronizowano {len(synced)} komend slash.")
    except Exception as e:
        print(f"Błąd synchronizacji komend: {e}")
        
    bot.loop.create_task(self_ping())

# Tradycyjna komenda tekstowa !ping (z blokadą roli)
@bot.command()
async def ping(ctx):
    WYMAGANA_ROLA_ID = 1516825582002765894
    ma_role = any(role.id == WYMAGANA_ROLA_ID for role in ctx.author.roles)
    
    if ma_role:
        await ctx.send('yoo jestem tu')
    else:
        await ctx.send('Nie masz odpowiedniej roli, aby użyć tej komendy.', delete_after=5)

# Nowoczesna komenda ukośnika /ticket do wysyłania wiadomości z przyciskiem
@bot.tree.command(name="ticket", description="Wysyła panel do tworzenia ticketów")
async def ticket_command(interaction: discord.Interaction):
    # Możesz dostosować wygląd tej głównej wiadomości z przyciskiem
    embed = discord.Embed(
        title="🤖 System Zgłoszeń (SOP)",
        description="Potrzebujesz pomocy administracji? Chcesz zgłosić problem lub złożyć podanie?\nKliknij poniższy przycisk, aby otworzyć prywatny kanał kontaktu.",
        color=discord.Color.green()
    )
    
    # Wysyłamy embed razem z naszym przyciskiem na kanał, gdzie wpisano komendę
    await interaction.response.send_message(embed=embed, view=TicketButton())

# ==========================================
# 5. ASYNCHRONICZNE URUCHOMIENIE CAŁOŚCI
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
