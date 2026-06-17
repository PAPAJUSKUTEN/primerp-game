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
    await asyncio.sleep(30)
    while True:
        try:
            url = os.environ.get("RENDER_EXTERNAL_URL", "http://localhost:10000")
            req = urllib.request.Request(url, headers={'User-Agent': 'SOP-KeepAlive-Bot'})
            with urllib.request.urlopen(req) as response:
                response.read()
            print("[Keep-Alive] Pomyslnie wyslano ping do samego siebie.")
        except Exception as e:
            print(f"[Keep-Alive] Nie udalo sie wyslac pingu: {e}")
        await asyncio.sleep(600)

# ==========================================
# 3. WIDOKI I LOGIKA DLA SYSTEMU TICKETÓW I REKRUTACJI
# ==========================================

# --- SYSTEM TICKETÓW ---
class TicketButton(ui.View):
    def __init__(self):
        super().__init__(timeout=None)

    @ui.button(label="Stworz Ticket", style=discord.ButtonStyle.green, custom_id="create_ticket_btn", emoji="📩")
    async def create_ticket(self, interaction: discord.Interaction, button: ui.Button):
        KATEGORIA_ID = 1516847056210366645
        guild = interaction.guild
        category = discord.utils.get(guild.categories, id=KATEGORIA_ID)
        
        if not category:
            await interaction.response.send_message("Blad: Nie znaleziono podanej kategorii ticketow.", ephemeral=True)
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
        await interaction.response.send_message(f"Pomyslnie utworzono Twój ticket: {ticket_channel.mention}", ephemeral=True)


# --- SYSTEM REKRUTACJI (APLIKUJ) ---
class ApplyButton(ui.View):
    def __init__(self):
        super().__init__(timeout=None)

    @ui.button(label="Zloz Podanie do SOP", style=discord.ButtonStyle.blurple, custom_id="apply_sop_btn", emoji="📝")
    async def create_application(self, interaction: discord.Interaction, button: ui.Button):
        KATEGORIA_ID = 1516847056210366645
        guild = interaction.guild
        category = discord.utils.get(guild.categories, id=KATEGORIA_ID)
        
        if not category:
            await interaction.response.send_message("Blad: Nie znaleziono kategorii rekrutacyjnej na serwerze.", ephemeral=True)
            return

        channel_name = f"podanie-{interaction.user.name}"
        overwrites = {
            guild.default_role: discord.PermissionOverwrite(read_messages=False),
            interaction.user: discord.PermissionOverwrite(read_messages=True, send_messages=True, embed_links=True, attach_files=True),
            guild.me: discord.PermissionOverwrite(read_messages=True, send_messages=True)
        }

        app_channel = await guild.create_text_channel(name=channel_name, category=category, overwrites=overwrites)
        
        embed = discord.Embed(
            title="📋 Formularz Rekrutacyjny do SOP",
            description=(
                f"Witaj {interaction.user.mention} w swoim kanale rekrutacyjnym!\n"
                "Odpowiedz na ponizsze pytania starannie i w jednej wiadomosci (lub punkt po punkcie):\n\n"
                "**1.** Jak masz na imie (nick IG)?\n"
                "**2.** Ile masz lat?\n"
                "**3.** Dlaczego chcesz dolaczyc wlasnie do SOP?\n"
                "**4.** Czy grales juz na Venus RP? Jak dlugo?\n"
                "**5.** Czy miales wczesniej doswiadczenie w mundurowce / frakcjach ochronnych? (jesli tak – jakie)\n"
                "**6.** Jak rozumiesz role SOP na serwerze?\n"
                "**7.** Czy posiadasz mikrofon i jestes w stanie uzywac go podczas sluzby?\n"
                "**8.** Ile czasu w tygodniu jestes w stanie poswiecic na sluzbe?\n"
                "**9.** Czy zapoznales sie z regulaminem serwera Venus RP oraz regulaminem SOP?\n"
                "**10.** Czy jestes w stanie przestrzegac zasad i podporzadkowac sie dowodztwu?"
            ),
            color=discord.Color.gold()
        )
        embed.set_footer(text="Po uzupelnieniu pytan, wyczekuj na werdykt Zarzadu SOP.")
        
        await app_channel.send(embed=embed)
        await interaction.response.send_message(f"Pomyslnie utworzono Twój kanal rekrutacyjny: {app_channel.mention}", ephemeral=True)


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
    bot.add_view(ApplyButton())
    
    try:
        print("Usuwanie podwojnych komend i czyszczenie drzewa globalnego...")
        
        # 1. Czyszczenie starych komend globalnych, żeby usunąć dublowanie
        bot.tree.clear(guild=None)
        await bot.tree.sync(guild=None)
        
        # 2. Rejestracja komend WYŁĄCZNIE lokalnie na Twoich serwerach
        for guild in bot.guilds:
            bot.tree.clear_commands(guild=guild)
            bot.tree.copy_global_to(guild=guild)
            await bot.tree.sync(guild=guild)
            
        print("Koniec! Od teraz na liscie pojawi sie dokladnie 1x /ticket oraz 1x /aplikuj.")
    except Exception as e:
        print(f"Blad podczas czyszczenia dubli: {e}")
        
    bot.loop.create_task(self_ping())

# Komenda tekstowa !ping
@bot.command()
async def ping(ctx):
    WYMAGANA_ROLA_ID = 1516825582002765894
    ma_role = any(role.id == WYMAGANA_ROLA_ID for role in ctx.author.roles)
    
    if ma_role:
        await ctx.send('yoo jestem tu')
    else:
        await ctx.send('Nie masz odpowiedniej roli, aby uzyc tej komendy.', delete_after=5)

# 1. Komenda /ticket (Tylko dla roli SOP)
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

# 2. Komenda /aplikuj (Dla każdego)
@bot.tree.command(name="aplikuj", description="Wysyla panel rekrutacyjny do frakcji SOP")
async def apply_command(interaction: discord.Interaction):
    embed = discord.Embed(
        title="🦅 Rekrutacja do System Operational Protocols (SOP)",
        description="Chcesz zasilic szeregi naszej frakcji na serwerze Venus RP?\nKliknij niebieski przycisk ponizzej, aby otworzyc swoj osobisty kwestionariusz rekrutacyjny.",
        color=discord.Color.blurple()
    )
    await interaction.response.send_message(embed=embed, view=ApplyButton())

# ==========================================
# 5. ASYNCHRONICZNE URUCHOMIENIE CAŁOŚCI
# ==========================================
async def main():
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
