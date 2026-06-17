import os
import asyncio
import discord
from discord.ext import commands
from discord import app_commands, ui

# ==========================================
# 1. WIDOKI I LOGIKA DLA SYSTEMU TICKETÓW I REKRUTACJI
# ==========================================

# --- SYSTEM TICKETÓW ---
class TicketButton(ui.View):
    def __init__(self):
        super().__init__(timeout=None) # Przycisk działa zawsze, nawet po restarcie bota

    @ui.button(label="Stwórz Ticket", style=discord.ButtonStyle.green, custom_id="create_ticket_btn", emoji="📩")
    async def create_ticket(self, interaction: discord.Interaction, button: ui.Button):
        KATEGORIA_ID = 1516847056210366645
        guild = interaction.guild
        category = discord.utils.get(guild.categories, id=KATEGORIA_ID)
        
        if not category:
            await interaction.response.send_message("Błąd: Nie znaleziono podanej kategorii ticketów.", ephemeral=True)
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
            description=f"Witaj {interaction.user.mention}!\nNapisz w czym możemy Ci pomóc. Administracja zajmie się Twoim zgłoszeniem tak szybko, jak to możliwe.",
            color=discord.Color.blue()
        )
        await ticket_channel.send(embed=embed)
        await interaction.response.send_message(f"Pomyślnie utworzono Twój ticket: {ticket_channel.mention}", ephemeral=True)


# --- SYSTEM REKRUTACJI (APLIKUJ) ---
class ApplyButton(ui.View):
    def __init__(self):
        super().__init__(timeout=None)

    @ui.button(label="Złóż Podanie do SOP", style=discord.ButtonStyle.blurple, custom_id="apply_sop_btn", emoji="📝")
    async def create_application(self, interaction: discord.Interaction, button: ui.Button):
        KATEGORIA_ID = 1516847056210366645
        guild = interaction.guild
        category = discord.utils.get(guild.categories, id=KATEGORIA_ID)
        
        if not category:
            await interaction.response.send_message("Błąd: Nie znaleziono kategorii rekrutacyjnej na serwerze.", ephemeral=True)
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
                "Odpowiedz na poniższe pytania starannie i w jednej wiadomości (lub punkt po punkcie):\n\n"
                "**1.** Jak masz na imię (nick IG)?\n"
                "**2.** Ile masz lat?\n"
                "**3.** Dlaczego chcesz dołączyć właśnie do SOP?\n"
                "**4.** Czy grałeś już na Venus RP? Jak długo?\n"
                "**5.** Czy miałeś wcześniej doświadczenie w mundurówce / frakcjach ochronnych? (jeśli tak – jakie)\n"
                "**6.** Jak rozumiesz rolę SOP na serwerze?\n"
                "**7.** Czy posiadasz mikrofon i jesteś w stanie używać go podczas służby?\n"
                "**8.** Ile czasu w tygodniu jesteś w stanie poświęcić na służbę?\n"
                "**9.** Czy zapoznałeś się z regulaminem serwera Venus RP oraz regulaminem SOP?\n"
                "**10.** Czy jesteś w stanie przestrzegać zasad i podporządkować się dowództwu?"
            ),
            color=discord.Color.gold()
        )
        embed.set_footer(text="Po uzupełnieniu pytań, wyczekuj na werdykt Zarządu SOP.")
        
        await app_channel.send(embed=embed)
        await interaction.response.send_message(f"Pomyślnie utworzono Twój kanał rekrutacyjny: {app_channel.mention}", ephemeral=True)


# ==========================================
# 2. KONFIGURACJA I URUCHOMIENIE BOTA
# ==========================================
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f'Zalogowano pomyślnie jako: {bot.user.name}')
    
    # Rejestracja widoków przycisków w pamięci podręcznej bota
    bot.add_view(TicketButton())
    bot.add_view(ApplyButton())
    
    # Błyskawiczna synchronizacja komend slash na serwerach
    try:
        for guild in bot.guilds:
            bot.tree.copy_global_to(guild=guild)
            await bot.tree.sync(guild=guild)
        await bot.tree.sync()
        print("Pomyślnie zsynchronizowano komendy /ticket oraz /aplikuj!")
    except Exception as e:
        print(f"Błąd synchronizacji komend: {e}")

# Komenda tekstowa !ping
@bot.command()
async def ping(ctx):
    WYMAGANA_ROLA_ID = 1516825582002765894
    ma_role = any(role.id == WYMAGANA_ROLA_ID for role in ctx.author.roles)
    
    if ma_role:
        await ctx.send('yoo jestem tu')
    else:
        await ctx.send('Nie masz odpowiedniej roli, aby użyć tej komendy.', delete_after=5)

# Komenda slash /ticket
@bot.tree.command(name="ticket", description="Wysyła panel do tworzenia ticketów")
async def ticket_command(interaction: discord.Interaction):
    embed = discord.Embed(
        title="🤖 System Zgłoszeń (SOP)",
        description="Potrzebujesz pomocy administracji? Chcesz zgłosić problem?\nKliknij poniższy przycisk, aby otworzyć prywatny kanał kontaktu.",
        color=discord.Color.green()
    )
    await interaction.response.send_message(embed=embed, view=TicketButton())

# Komenda slash /aplikuj
@bot.tree.command(name="aplikuj", description="Wysyła panel rekrutacyjny do frakcji SOP")
async def apply_command(interaction: discord.Interaction):
    embed = discord.Embed(
        title="🦅 Rekrutacja do System Operational Protocols (SOP)",
        description="Chcesz zasilić szeregi naszej frakcji na serwerze Venus RP?\nKliknij niebieski przycisk poniżej, aby otworzyć swój osobisty kwestionariusz rekrutacyjny.",
        color=discord.Color.blurple()
    )
    await interaction.response.send_message(embed=embed, view=ApplyButton())

# Uruchomienie bota
if __name__ == "__main__":
    TOKEN = os.environ.get("TOKEN")
    if not TOKEN:
        print("BŁĄD: Brak zmiennej TOKEN w środowisku!")
    else:
        bot.run(TOKEN)
