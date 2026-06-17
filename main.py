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
# 3. WIDOKI I LOGIKA PRZYCISKÓW (Zgłoszenia, Podania, Regulamin)
# ==========================================

# --- SYSTEM REGULAMINU (DOKŁADNY TWÓJ TEKST) ---
class RulesButton(ui.View):
    def __init__(self):
        super().__init__(timeout=None)

    @ui.button(label="regulamin", style=discord.ButtonStyle.secondary, custom_id="show_rules_btn", emoji="📜")
    async def show_rules(self, interaction: discord.Interaction, button: ui.Button):
        # NATYCHMIASTOWA ODPOWIEDŹ DLA DISCORDA (ZAPOBIEGA BŁĘDOWI INTERAKCJI)
        await interaction.response.defer(ephemeral=True)
        
        rules_text = (
            "⚖️ **REGULAMIN SERWERA**\n"
            "1. Nieznajomość regulaminu nie zwalnia z jego przestrzegania.\n"
            "2. Administracja ma prawo ukarać gracza za czyn, który nie został uwzględniony w regulaminie, jeżeli zostanie uznany za szkodliwy dla serwera.\n"
            "3. Zakaz prowokowania i wyzywania innych graczy na kanałach tekstowych oraz głosowych.\n"
            "4. Zakaz pingowania administracji bez wyraźnego powodu.\n"
            "5. Zakaz wysyłania jakichkolwiek linków (zaproszenia na inne serwery discord, linki do wirusów itp.).\n"
            "6. Wszelkie błędy bota należy zgłaszać administracji.\n"
            "7. Handel przedmiotami/rangami z gry za realne pieniądze jest surowo zakazany.\n"
            "8. Zakaz szerzenia nienawiści, rasizmu, faszyzmu oraz toksycznego zachowania.\n"
            "9. Zakaz udostępniania danych osobowych innych użytkowników serwera bez ich zgody.\n\n"
            "🛡️ **REGULAMIN KOMISJI**\n"
            "1. Każdy członek komisji musi godnie reprezentować serwer.\n"
            "2. Zakaz faworyzacji graczy/znajomych przy rozpatrywaniu skarg lub podań.\n"
            "3. Każda decyzja podjęta przez wyższą rangę komisji jest ostateczna, chyba że zarząd postanowi inaczej.\n"
            "4. Członek komisji ma obowiązek zachować pełną kulturę osobistą podczas wykonywania swoich obowiązków.\n"
            "5. Wynoszenie informacji z kanałów administracyjnych/komisyjnych skutkuje natychmiastowym wydaleniem oraz czarną listą."
        )
        # WYSYŁAMY TWÓJ REGULAMIN JAKO WIADOMOŚĆ UKRYTĄ (EPHEMERAL)
        await interaction.followup.send(rules_text, ephemeral=True)


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
        await interaction.response.send_message(f"Pomyslnie utworzono Twoje zgloszenie: {ticket_channel.mention}", ephemeral=True)


# --- PRZYCISKI ZARZĄDZANIA PODANIEM ---
class ApplicationManageButtons(ui.View):
    def __init__(self, applicant_mention, applicant_name):
        super().__init__(timeout=None)
        self.applicant_mention = applicant_mention
        self.applicant_name = applicant_name

    async def interaction_check(self, interaction: discord.Interaction) -> bool:
        WYMAGANA_ROLA_ID = 1516825582002765894
        ma_role = any(role.id == WYMAGANA_ROLA_ID for role in interaction.user.roles)
        if not ma_role:
            await interaction.response.send_message("Nie masz uprawnien (wymaganej roli SOP) do zarzadzania tym podaniem!", ephemeral=True)
            return False
        return True

    @ui.button(label="Przyjmij", style=discord.ButtonStyle.green, custom_id="app_accept_btn", emoji="🟢")
    async def accept_application(self, interaction: discord.Interaction, button: ui.Button):
        KANAL_SUKCESU_ID = 1516747178020966421
        channel = interaction.guild.get_channel(KANAL_SUKCESU_ID)
        
        embed = discord.Embed(
            title="💚 Podanie Przyjete!",
            description=f"Uzytkownik {self.applicant_mention} (**{self.applicant_name}**) pomyslnie przeszedl etap rekrutacji do SOP!",
            color=discord.Color.green()
        )
        embed.set_footer(text=f"Zaakceptowane przez: {interaction.user.name}")
        
        if channel:
            await channel.send(embed=embed)
        await interaction.response.send_message("Oznaczono podanie jako: **PRZYJĘTE**. Komunikat zostal wyslany.", ephemeral=False)

    @ui.button(label="Odrzuc", style=discord.ButtonStyle.red, custom_id="app_reject_btn", emoji="🔴")
    async def reject_application(self, interaction: discord.Interaction, button: ui.Button):
        KANAL_ODRZUCENIA_ID = 1516747254021754920
        channel = interaction.guild.get_channel(KANAL_ODRZUCENIA_ID)
        
        embed = discord.Embed(
            title="💔 Podanie Odrzucone",
            description=f"Uzytkownik {self.applicant_mention} (**{self.applicant_name}**) nie zostal przyjety do frakcji SOP w obecnej rekrutacji.",
            color=discord.Color.red()
        )
        embed.set_footer(text=f"Rozpatrzone przez: {interaction.user.name}")
        
        if channel:
            await channel.send(embed=embed)
        await interaction.response.send_message("Oznaczono podanie jako: **ODRZUCONE**. Komunikat zostal wyslany.", ephemeral=False)

    @ui.button(label="Zamknij", style=discord.ButtonStyle.secondary, custom_id="app_close_btn", emoji="🔒")
    async def close_application(self, interaction: discord.Interaction, button: ui.Button):
        await interaction.response.send_message("Kanal zostanie zamkniety za 5 sekund...")
        await asyncio.sleep(5)
        await interaction.channel.delete()


# --- SYSTEM STARTOWY REKRUTACJI (APLIKUJ) ---
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
        
        embed_questions = discord.Embed(
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
        embed_questions.set_footer(text="Po uzupelnieniu pytan, wyczekuj na werdykt Zarzadu SOP.")
        await app_channel.send(embed=embed_questions)
        
        embed_manage = discord.Embed(
            title="🛠️ Panel Zarzadzania Rekrutacja",
            description="Sekcja przeznaczona wylacznie dla Zarzadu SOP. Uzyj przyciskow po przeanalizowaniu podania gracza.",
            color=discord.Color.dark_grey()
        )
        await app_channel.send(embed=embed_manage, view=ApplicationManageButtons(interaction.user.mention, interaction.user.name))
        
        await interaction.response.send_message(f"Pomyslnie utworzono Twoj kanal rekrutacyjny: {app_channel.mention}", ephemeral=True)


# ==========================================
# 4. KONFIGURACJA BOTA DISCORDA
# ==========================================
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f'Zalogowano pomyslnie jako: {bot.user.name}')
    
    # Rejestracja widoków dla trwałych przycisków
    bot.add_view(TicketButton())
    bot.add_view(ApplyButton())
    bot.add_view(RulesButton())
    bot.add_view(ApplicationManageButtons(applicant_mention="", applicant_name=""))
    
    try:
        print("Usuwanie zdublowanych komend z pamieci gildii...")
        for guild in bot.guilds:
            bot.tree.clear_commands(guild=guild)
            await bot.tree.sync(guild=guild)
        
        await bot.tree.sync()
        print("Sukces! Zsynchronizowano czyste komendy.")
    except Exception as e:
        print(f"Blad podczas oczyszczania i synchronizacji drzewa komend: {e}")
        
    bot.loop.create_task(self_ping())

# 1. Komenda slash /ping
@bot.tree.command(name="ping", description="Sprawdza czy bot dziala (Wymaga roli SOP)")
async def ping_command(interaction: discord.Interaction):
    WYMAGANA_ROLA_ID = 1516825582002765894
    ma_role = any(role.id == WYMAGANA_ROLA_ID for role in interaction.user.roles)
    
    if ma_role:
        await interaction.response.send_message('yoo jestem tu')
    else:
        await interaction.response.send_message('Nie masz odpowiedniej roli, aby uzyc tej komendy.', ephemeral=True)

# 2. Komenda slash /ticket
@bot.tree.command(name="ticket", description="Wysyla panel do tworzenia ticketow (Wymaga roli SOP)")
async def ticket_command(interaction: discord.Interaction):
    WYMAGANA_ROLA_ID = 1516825582002765894
    ma_role = any(role.id == WYMAGANA_ROLA_ID for role in interaction.user.roles)
    
    if not ma_role:
        await interaction.response.send_message("Nie masz odpowiedniej roli, aby uzyc tej komendy.", ephemeral=True)
        return
        
    embed = discord.Embed(
        title="🤖 System Zgloszen (SOP)",
        description="Potrzebujesz pomocy administracji? Chcesz zglosic problem?\nKliknij ponizszy przycisk, aby otworzyc privatny kanal kontaktu.",
        color=discord.Color.green()
    )
    await interaction.response.send_message(embed=embed, view=TicketButton())

# 3. Komenda slash /aplikuj
@bot.tree.command(name="aplikuj", description="Wysyla panel rekrutacyjny do frakcji SOP")
async def apply_command(interaction: discord.Interaction):
    embed = discord.Embed(
        title="🦅 Rekrutacja do System Operational Protocols (SOP)",
        description="Chcesz zasilic szeregi naszej frakcji na serwerze Venus RP?\nKliknij niebieski przycisk ponizzej, aby otworzyc swoj osobisty kwestionariusz rekrutacyjny.",
        color=discord.Color.blurple()
    )
    await interaction.response.send_message(embed=embed, view=ApplyButton())

# 4. Komenda slash /regulamin
@bot.tree.command(name="regulamin", description="Wysyla panel z oficjalnym regulaminem wewnetrznym SOP (Wymaga roli SOP)")
async def regulamin_command(interaction: discord.Interaction):
    WYMAGANA_ROLA_ID = 1516825582002765894
    ma_role = any(role.id == WYMAGANA_ROLA_ID for role in interaction.user.roles)
    
    if not ma_role:
        await interaction.response.send_message("Nie masz odpowiedniej roli, aby uzyc tej komendy.", ephemeral=True)
        return
        
    embed = discord.Embed(
        title="📜 Regulamin Frakcyjny SOP",
        description="Pobierz oficjalny i obowiazujacy zestaw zasad Służby Ochrony Państwa.\nKliknij ponizszy przycisk, aby wyswietlic pelna tresc regulaminu.",
        color=discord.Color.blue()
    )
    await interaction.response.send_message(embed=embed, view=RulesButton())

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
