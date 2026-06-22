import os
import asyncio
import threading
import logging

import discord
from discord import app_commands
from discord.ext import commands

from flask import Flask, request, jsonify
import requests
from werkzeug.serving import make_server

# --------------------------------------------------
# KONFIGURACJA
# --------------------------------------------------

GUILD_ID = 1516847056210366645          # ID serwera (Venus RP)
CATEGORY_ID = 1516847056210366645       # ID kategorii dla ticket/podanie
REQUIRED_ROLE_ID = 1516825582002765894  # ID roli wymaganej do !ping oraz /obowiazki

TOKEN = os.getenv("TOKEN")
RENDER_EXTERNAL_URL = os.getenv("RENDER_EXTERNAL_URL")

if not TOKEN:
    raise RuntimeError("Brak zmiennej środowiskowej TOKEN")

# --------------------------------------------------
# LOGOWANIE
# --------------------------------------------------

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("venus-sop-bot")

# --------------------------------------------------
# FLASK – WEB SERWER I ENDPOINT /wyslij-wiadomosc
# --------------------------------------------------

app = Flask(__name__)

@app.route("/")
def index():
    return "Bot Venus SOP działa", 200

@app.route("/wyslij-wiadomosc", methods=["POST"])
def wyslij_wiadomosc():
    data = request.get_json(force=True, silent=True) or {}
    channel_id = data.get("channel_id")
    content = data.get("content")

    if not channel_id or not content:
        return jsonify({"error": "Brak channel_id lub content"}), 400

    channel = bot.get_channel(int(channel_id))
    if channel is None:
        return jsonify({"error": "Nie znaleziono kanału"}), 404

    fut = asyncio.run_coroutine_threadsafe(
        channel.send(content),
        bot.loop
    )
    try:
        fut.result(timeout=10)
    except Exception as e:
        logger.exception("Błąd przy wysyłaniu wiadomości z /wyslij-wiadomosc")
        return jsonify({"error": str(e)}), 500

    return jsonify({"status": "ok"}), 200


class FlaskServerThread(threading.Thread):
    def __init__(self, app, host="0.0.0.0", port=None):
        threading.Thread.__init__(self)
        self.daemon = True
        if port is None:
            port = int(os.environ.get("PORT", 8000))
        self.srv = make_server(host, port, app)
        self.ctx = app.app_context()
        self.ctx.push()

    def run(self):
        logger.info("Startuję serwer Flask")
        self.srv.serve_forever()

    def shutdown(self):
        self.srv.shutdown()

# --------------------------------------------------
# WIDOKI I PRZYCISKI (UI) DLA /obowiazki
# --------------------------------------------------

class ObowiazkiView(discord.ui.View):
    def __init__(self):
        # timeout=None + custom_id sprawiają, że przyciski działają permanentnie (po restarcie bota)
        super().__init__(timeout=None)

    @discord.ui.button(label="Raport", style=discord.ButtonStyle.primary, custom_id="button_raport")
    async def raport_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        await interaction.response.send_message(
            "Wybrano opcję: **Raport**. Tutaj możesz rozbudować akcję (np. wywołać formularz/Modal).", 
            ephemeral=True
        )

    @discord.ui.button(label="Incydent", style=discord.ButtonStyle.danger, custom_id="button_incydent")
    async def incydent_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        await interaction.response.send_message(
            "Wybrano opcję: **Incydent**. Tutaj możesz rozbudować akcję.", 
            ephemeral=True
        )

# --------------------------------------------------
# DISCORD BOT
# --------------------------------------------------

intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True
intents.members = True

class VenusSOPBot(commands.Bot):
    def __init__(self):
        super().__init__(
            command_prefix="!",
            intents=intents,
            application_id=None
        )
        self.flask_thread = None

    async def setup_hook(self):
        # Rejestracja trwałego widoku przed synchronizacją komend
        self.add_view(ObowiazkiView())

        try:
            guild = discord.Object(id=GUILD_ID)
            self.tree.copy_global_to(guild=guild)
            synced = await self.tree.sync(guild=guild)
            logger.info(
                "Zsynchronizowano %s komend (guild) dla GUILD_ID=%s",
                len(synced),
                GUILD_ID
            )
        except Exception:
            logger.exception("Błąd podczas tree.sync()")

        self.loop.create_task(self.self_ping_loop())

    async def on_ready(self):
        logger.info("Zalogowano jako %s (%s)", self.user, self.user.id)

    async def self_ping_loop(self):
        if not RENDER_EXTERNAL_URL:
            logger.warning("Brak RENDER_EXTERNAL_URL – self ping wyłączony")
            return

        await self.wait_until_ready()
        logger.info("Startuję self_ping_loop z URL: %s", RENDER_EXTERNAL_URL)

        while not self.is_closed():
            try:
                url = RENDER_EXTERNAL_URL.rstrip("/")
                r = requests.get(url, timeout=10)
                logger.info("Self-ping %s -> %s", url, r.status_code)
            except Exception as e:
                logger.warning("Błąd podczas self ping: %s", e)
            await asyncio.sleep(600)  # 10 minut

bot = VenusSOPBot()

# --------------------------------------------------
# KOMENDA TEKSTOWA !ping
# --------------------------------------------------

@bot.command(name="ping")
async def ping(ctx: commands.Context):
    role = ctx.guild.get_role(REQUIRED_ROLE_ID)
    if role not in ctx.author.roles:
        await ctx.reply("Nie masz wymaganej roli, aby użyć tej komendy.")
        return

    await ctx.reply("Pong! Bot działa poprawnie.")

# --------------------------------------------------
# SLASH: /obowiazki – panel z przyciskami Raport / Incydent
# --------------------------------------------------

@bot.tree.command(name="obowiazki", description="Wysyła panel zarządzania obowiązkami SOP z przyciskami.")
async def obowiazki(interaction: discord.Interaction):
    role = interaction.guild.get_role(REQUIRED_ROLE_ID)
    if role not in interaction.user.roles:
        await interaction.response.send_message(
            "Nie masz uprawnień (wymaganej roli) do użycia tej komendy.", 
            ephemeral=True
        )
        return

    embed = discord.Embed(
        title="Panel Obowiązków Służbowych – SOP",
        description=(
            "Wybierz odpowiednią opcję poniżej, aby zgłosić swoje działania:\n\n"
            "**📝 Raport** – Kliknij, aby złożyć raport ze służby.\n"
            "**🚨 Incydent** – Kliknij, aby zgłosić nagłe zdarzenie lub naruszenie."
        ),
        color=discord.Color.blue()
    )
    embed.set_footer(text="Venus SOP • System Zarządzania Obowiązkami")

    await interaction.response.send_message(embed=embed, view=ObowiazkiView())

# --------------------------------------------------
# SLASH: /ticket – tworzy kanał ticket-nazwa
# --------------------------------------------------

@bot.tree.command(name="ticket", description="Utwórz kanał ticket dla gracza.")
@app_commands.describe(nazwa="Nick lub identyfikator gracza")
async def ticket(
    interaction: discord.Interaction,
    nazwa: str
):
    await interaction.response.defer(ephemeral=True)

    guild = interaction.guild
    if guild is None:
        await interaction.followup.send("Ta komenda może być używana tylko na serwerze.", ephemeral=True)
        return

    category = guild.get_channel(CATEGORY_ID)
    if category is None or not isinstance(category, discord.CategoryChannel):
        await interaction.followup.send("Nie mogę znaleźć kategorii ticketów. Skontaktuj się z administracją.", ephemeral=True)
        return

    channel_name = f"ticket-{nazwa}".lower().replace(" ", "-")
    overwrites = {
        guild.default_role: discord.PermissionOverwrite(view_channel=False),
        interaction.user: discord.PermissionOverwrite(
            view_channel=True,
            send_messages=True,
            read_message_history=True
        )
    }

    try:
        channel = await guild.create_text_channel(
            name=channel_name,
            category=category,
            overwrites=overwrites,
            reason=f"Ticket utworzony przez {interaction.user} ({interaction.user.id})"
        )
    except Exception as e:
        await interaction.followup.send(f"Wystąpił błąd przy tworzeniu kanału: `{e}`", ephemeral=True)
        return

    await interaction.followup.send(f"Utworzono kanał {channel.mention} dla {nazwa}.", ephemeral=True)
    await channel.send(f"Witaj, {interaction.user.mention}! Opisz swój problem, a administracja wkrótce się tobą zajmie.")

# --------------------------------------------------
# SLASH: /aplikuj – kanał podanie-nazwa + 10 pytań
# --------------------------------------------------

@bot.tree.command(name="aplikuj", description="Złóż podanie do frakcji SOP.")
@app_commands.describe(nazwa="Twój nick / identyfikator na Venus RP")
async def aplikuj(
    interaction: discord.Interaction,
    nazwa: str
):
    await interaction.response.defer(ephemeral=True)

    guild = interaction.guild
    if guild is None:
        await interaction.followup.send("Ta komenda może być używana tylko na serwerze.", ephemeral=True)
        return

    category = guild.get_channel(CATEGORY_ID)
    if category is None or not isinstance(category, discord.CategoryChannel):
        await interaction.followup.send("Nie mogę znaleźć kategorii podań SOP. Skontaktuj się z administracją.", ephemeral=True)
        return

    channel_name = f"podanie-{nazwa}".lower().replace(" ", "-")
    overwrites = {
        guild.default_role: discord.PermissionOverwrite(view_channel=False),
        interaction.user: discord.PermissionOverwrite(
            view_channel=True,
            send_messages=True,
            read_message_history=True
        )
    }

    try:
        channel = await guild.create_text_channel(
            name=channel_name,
            category=category,
            overwrites=overwrites,
            reason=f"Podanie SOP utworzone przez {interaction.user} ({interaction.user.id})"
        )
    except Exception as e:
        await interaction.followup.send(f"Wystąpił błąd przy tworzeniu kanału z podaniem: `{e}`", ephemeral=True)
        return

    pytania = [
        "1. Podaj swój nick na Venus RP oraz wiek.",
        "2. Od jak dawna grasz na Venus RP?",
        "3. Czy miałeś już doświadczenie w frakcjach porządkowych? Jeśli tak – jakich?",
        "4. Dlaczego chcesz dołączyć do frakcji SOP?",
        "5. Jakie są twoje najmocniejsze strony przydatne w SOP?",
        "6. Jakie są twoje słabe strony, nad którymi chcesz pracować?",
        "7. Opisz krótko swoją znajomość regulaminu frakcji SOP.",
        "8. Jak reagujesz na stresujące sytuacje podczas akcji RP?",
        "9. Opisz przykładową akcję RP, w której SOP bierze udział.",
        "10. Czy posiadasz sprawny mikrofon i możliwość częstej gry? W jakich godzinach jesteś zwykle dostępny?"
    ]

    embed = discord.Embed(
        title=f"Podanie do SOP – {nazwa}",
        description=(
            "Odpowiedz na poniższe pytania w osobnych wiadomościach.\n"
            "Administracja SOP przeanalizuje twoje zgłoszenie."
        ),
        color=discord.Color.dark_gold()
    )

    for q in pytania:
        embed.add_field(name="\u200b", value=q, inline=False)

    embed.set_footer(text=f"Wysłane przez: {interaction.user}")

    await interaction.followup.send(f"Utworzono kanał {channel.mention} dla twojego podania do SOP.", ephemeral=True)
    await channel.send(content=interaction.user.mention, embed=embed)

# --------------------------------------------------
# START FLASKA I BOTA
# --------------------------------------------------

def main():
    flask_thread = FlaskServerThread(app=app)
    flask_thread.start()

    try:
        bot.flask_thread = flask_thread
        bot.run(TOKEN)
    finally:
        flask_thread.shutdown()

if __name__ == "__main__":
    main()
