import os
import asyncio
import urllib.request
from flask import Flask
import discord
from discord.ext import commands
from discord import app_commands, ui

# ==========================================
# 1. KONFIGURACJA SERWERA FLASK (Keep-Alive)
# ==========================================
app = Flask(__name__)

@app.route('/')
def home():
    return "<h1>Bot SOP dziala i jest utrzymywany przy zyciu 24/7!</h1>"

# ==========================================
# 2. WEWNĘTRZNY SYSTEM SELF-PING (Keep-Alive)
# ==========================================
async def self_ping():
    await asyncio.sleep(30) # Poczekaj na pelne uruchomienie bota i Flaska
    while True:
        try:
            url = os.environ.get("RENDER_EXTERNAL_URL", "http://localhost:10000")
            req = urllib.request.Request(url, headers={'User-Agent': 'SOP-KeepAlive-Bot'})
            with urllib.request.urlopen(req) as response:
                response.read()
            print("[Keep-Alive] Pomyslnie wyslano ping do samego siebie.")
        except Exception as e:
            print(f"[Keep-Alive] Nie udalo sie wyslac pingu: {e}")
        await asyncio.sleep(600) # Pinguj sie co 10 minut

# ==========================================
# 3. WIDOK I LOGIKA PRZYCISKU TICKETÓW
# ==========================================
class TicketButton(ui.View):
    def __init__(self):
        super().__init__(timeout=None) # Przycisk dziala wiecznie

    @ui.button(label="Stworz Ticket", style=discord.ButtonStyle.green, custom_id="create_ticket_btn", emoji="📩")
    async def create_ticket(self, interaction: discord.Interaction, button: ui.Button):
        KATEGORIA_ID = 1516847056210366645
        guild = interaction.guild
        category = discord.utils.get(guild.categories, id=KATEGORIA_ID)
        
        if not category:
            await interaction.response.send_message("Blad: Nie znaleziono podanej kategorii ticketow na serwerze.", ephemeral=True)
            return

        channel_name = f"ticket-{interaction.user.name}"
        
        overwrites = {
            guild.default_role: discord.PermissionOverwrite(read_messages=False),
            interaction.user: discord.PermissionOverwrite(read_messages=True, send_messages=True, embed_links=True, attach_files=True),
            guild.me: discord.PermissionOverwrite(read_messages=True, send_messages=True)
        }

        ticket_channel = await guild.create_text_channel(name=channel_name, category=category, overwrites=overwrites)
        
        embed = discord.Embed(
            title="🎫 Nowy Ticket",
            description=f"Witaj {interaction.user.mention}!\nNapisz w czym mozemy Ci pomoc. Administracja zajmie sie Twoim zgloszeniem tak szybko, jak to mozliwe.",
            color=discord.Color.blue()
        )
        await ticket_channel.send(embed=embed)
        await interaction.response.send_message(f"Pomyslnie utworzono Twoj ticket: {ticket_channel.mention}", ephemeral=True)

# ==========================================
# 4. KONFIGURACJA BOTA DISCORDA
# ==========================================
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f'Zalogowano pomyslnie jako: {bot.user.name}')
    
    bot.add_view(TicketButton())
    
    # Naprawa CommandSignatureMismatch - czyszczenie starego drzewa i pelna synchronizacja lokalna
    try:
        print("Rozpoczynanie czyszczenia i synchronizacji komend...")
        for guild in bot.guilds:
            bot.tree.clear_commands(guild=guild) # Czysci stare, bledne podpisy komend
            bot.tree.copy_global_to(guild=guild)
            await bot.tree.sync(guild=guild)
        await bot.tree.sync()
        print("Pomyslnie rozwiazano konflikty i zsynchronizowano komende /ticket!")
    except Exception as e:
        print(f"Blad synchronizacji komend: {e}")
        
    bot.loop.create_task(self_ping())

# Komenda /ticket zabezpieczona ID roli
@bot.tree.command(name="ticket", description="Wysyla panel do tworzenia ticketow (Wymaga roli SOP)")
async def ticket_command(interaction: discord.Interaction):
    WYMAGANA_ROLA_ID = 1516825582002765894
    ma_role = any(role.id == WYMAGANA_ROLA_ID for role in interaction.user.roles)
    
    if not ma_role:
        await interaction.response.send_message("Nie masz odpowiedniej roli, aby uzyc tej komendy.", ephemeral=True)
        return
        
    embed = discord.Embed(
        title="🤖 System Zgloszen (SOP)",
        description="Potrzebujesz pomocy administracji? Chcesz zglosic problem?\nKliknij ponizszy przycisk, aby otworzyc prywatny kanal kontaktu.",
        color=discord.Color.green()
    )
    await interaction.response.send_message(embed=embed, view=TicketButton())

# ==========================================
# 5. ASYNCHRONICZNE URUCHOMIENIE CAŁOŚCI
# ==========================================
async def main():
    # Render domyslnie oczekuje portu 10000 dla Web Services, jesli zmienna PORT nie jest ustawiona
    port = int(os.environ.get("PORT", 10000))
    
    import werkzeug.serving
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, lambda: werkzeug.serving.run_simple('0.0.0.0', port, app, use_debugger=False, use_reloader=False))
    
    TOKEN = os.environ.get("TOKEN")
    if not TOKEN:
        print("BLAD: Brak zmiennej TOKEN w ustawieniach srodowiskowych!")
        return

    async with bot:
        await bot.start(TOKEN)

if __name__ == "__main__":
    asyncio.run(main())
