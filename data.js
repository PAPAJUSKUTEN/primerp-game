// ============================================================
//  FIFH CLAN — DANE CZŁONKÓW (75 kont)
//  Każde konto ma: username, password, avatar (link), role,
//  dcRole, dcName, contact, bio, stats
// ============================================================

const ACCOUNTS = [
  { username: "FuryKing",     password: "fifh001", id: 1  },
  { username: "NovaStar",     password: "fifh002", id: 2  },
  { username: "BlazePaw",     password: "fifh003", id: 3  },
  { username: "CrystalGem",   password: "fifh004", id: 4  },
  { username: "DarkPhoenix",  password: "fifh005", id: 5  },
  { username: "EchoWolf",     password: "fifh006", id: 6  },
  { username: "FrostBite",    password: "fifh007", id: 7  },
  { username: "GoldenRush",   password: "fifh008", id: 8  },
  { username: "HyperDash",    password: "fifh009", id: 9  },
  { username: "IceQueen",     password: "fifh010", id: 10 },
  { username: "JetStream",    password: "fifh011", id: 11 },
  { username: "KryptoNite",   password: "fifh012", id: 12 },
  { username: "LightBlade",   password: "fifh013", id: 13 },
  { username: "MoonWalker",   password: "fifh014", id: 14 },
  { username: "NightOwl",     password: "fifh015", id: 15 },
  { username: "OmegaForce",   password: "fifh016", id: 16 },
  { username: "PlasmaBolt",   password: "fifh017", id: 17 },
  { username: "QuantumLeap",  password: "fifh018", id: 18 },
  { username: "RocketFuel",   password: "fifh019", id: 19 },
  { username: "ShadowStrike", password: "fifh020", id: 20 },
  { username: "TurboBlast",   password: "fifh021", id: 21 },
  { username: "UltraViolet",  password: "fifh022", id: 22 },
  { username: "VenomClaw",    password: "fifh023", id: 23 },
  { username: "WhirlWind",    password: "fifh024", id: 24 },
  { username: "XenonFlare",   password: "fifh025", id: 25 },
  { username: "YellowTail",   password: "fifh026", id: 26 },
  { username: "ZephyrFly",    password: "fifh027", id: 27 },
  { username: "AquaShark",    password: "fifh028", id: 28 },
  { username: "BlazeRider",   password: "fifh029", id: 29 },
  { username: "CosmicDust",   password: "fifh030", id: 30 },
  { username: "DragonFang",   password: "fifh031", id: 31 },
  { username: "ElectroFox",   password: "fifh032", id: 32 },
  { username: "FlameHawk",    password: "fifh033", id: 33 },
  { username: "GhostRider",   password: "fifh034", id: 34 },
  { username: "HyperNova",    password: "fifh035", id: 35 },
  { username: "InfernoKid",   password: "fifh036", id: 36 },
  { username: "JaguarPaw",    password: "fifh037", id: 37 },
  { username: "KiloStorm",    password: "fifh038", id: 38 },
  { username: "LunarFang",    password: "fifh039", id: 39 },
  { username: "MetalClaw",    password: "fifh040", id: 40 },
  { username: "NebulaKid",    password: "fifh041", id: 41 },
  { username: "OrionBeast",   password: "fifh042", id: 42 },
  { username: "PhantomBlaze", password: "fifh043", id: 43 },
  { username: "QuasarFire",   password: "fifh044", id: 44 },
  { username: "RavenStrike",  password: "fifh045", id: 45 },
  { username: "StellarBolt",  password: "fifh046", id: 46 },
  { username: "ThunderPaws",  password: "fifh047", id: 47 },
  { username: "UrchinBlade",  password: "fifh048", id: 48 },
  { username: "VortexKing",   password: "fifh049", id: 49 },
  { username: "WarpSpeed",    password: "fifh050", id: 50 },
  { username: "XtremeFang",   password: "fifh051", id: 51 },
  { username: "YetiHunter",   password: "fifh052", id: 52 },
  { username: "ZeusLegacy",   password: "fifh053", id: 53 },
  { username: "AlphaWolf",    password: "fifh054", id: 54 },
  { username: "BlazeNova",    password: "fifh055", id: 55 },
  { username: "CyberPaws",    password: "fifh056", id: 56 },
  { username: "DeltaForce",   password: "fifh057", id: 57 },
  { username: "EpicRoar",     password: "fifh058", id: 58 },
  { username: "FireFalcon",   password: "fifh059", id: 59 },
  { username: "GigaSmash",    password: "fifh060", id: 60 },
  { username: "HeliosBlade",  password: "fifh061", id: 61 },
  { username: "IronWolf",     password: "fifh062", id: 62 },
  { username: "JollyPanda",   password: "fifh063", id: 63 },
  { username: "KaijuKing",    password: "fifh064", id: 64 },
  { username: "LavaFlow",     password: "fifh065", id: 65 },
  { username: "MegaForce",    password: "fifh066", id: 66 },
  { username: "NinjaFox",     password: "fifh067", id: 67 },
  { username: "OceanWave",    password: "fifh068", id: 68 },
  { username: "PrismLight",   password: "fifh069", id: 69 },
  { username: "QuickStrike",  password: "fifh070", id: 70 },
  { username: "RedTornado",   password: "fifh071", id: 71 },
  { username: "StormBreaker", password: "fifh072", id: 72 },
  { username: "TigerClaw",    password: "fifh073", id: 73 },
  { username: "UltraSmash",   password: "fifh074", id: 74 },
  { username: "ViperrFang",   password: "fifh075", id: 75 },
];

// ============================================================
//  PROFILE KAŻDEGO CZŁONKA (dane wyświetlane publicznie)
// ============================================================

const MEMBERS = [
  {
    id: 1, name: "FuryKing", role: "Leader",
    dcRole: "Owner", dcName: "furyking#0001",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=FuryKing&backgroundColor=ffdfbf",
    bio: "Założyciel i lider klanu FIFH. Gram w PS99 od dnia premiery!",
    contact: "Discord: furyking#0001",
    ps99Level: 1250, pets: 420, gems: "15.2B",
    joined: "01.01.2024"
  },
  {
    id: 2, name: "NovaStar", role: "Co-Leader",
    dcRole: "Admin", dcName: "novastar#0002",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=NovaStar&backgroundColor=c0aede",
    bio: "Co-lider klanu, odpowiadam za rekrutację nowych członków.",
    contact: "Discord: novastar#0002",
    ps99Level: 1100, pets: 380, gems: "12.5B",
    joined: "02.01.2024"
  },
  {
    id: 3, name: "BlazePaw", role: "Co-Leader",
    dcRole: "Admin", dcName: "blazepaw#0003",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=BlazePaw&backgroundColor=ffb3b3",
    bio: "Weteran PS99. Zawsze pomogę z farm strategy!",
    contact: "Discord: blazepaw#0003",
    ps99Level: 1080, pets: 360, gems: "11.8B",
    joined: "03.01.2024"
  },
  {
    id: 4, name: "CrystalGem", role: "Officer",
    dcRole: "Moderator", dcName: "crystalgem#0004",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=CrystalGem&backgroundColor=b9e3c6",
    bio: "Uwielbiam zbierać rzadkie gemy i tradować.",
    contact: "Discord: crystalgem#0004",
    ps99Level: 920, pets: 310, gems: "9.1B",
    joined: "05.01.2024"
  },
  {
    id: 5, name: "DarkPhoenix", role: "Officer",
    dcRole: "Moderator", dcName: "darkphoenix#0005",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=DarkPhoenix&backgroundColor=5c5c5c",
    bio: "Specjalista od clan wars i event coordination.",
    contact: "Discord: darkphoenix#0005",
    ps99Level: 890, pets: 295, gems: "8.7B",
    joined: "06.01.2024"
  },
  {
    id: 6, name: "EchoWolf", role: "Officer",
    dcRole: "Moderator", dcName: "echowolf#0006",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=EchoWolf&backgroundColor=d4edda",
    bio: "Wolf pack mentality - razem jesteśmy silniejsi!",
    contact: "Discord: echowolf#0006",
    ps99Level: 870, pets: 280, gems: "8.2B",
    joined: "07.01.2024"
  },
  {
    id: 7, name: "FrostBite", role: "Officer",
    dcRole: "Moderator", dcName: "frostbite#0007",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=FrostBite&backgroundColor=cce5ff",
    bio: "Zimny jak lód, skuteczny jak laser. Top trader!",
    contact: "Discord: frostbite#0007",
    ps99Level: 850, pets: 270, gems: "7.9B",
    joined: "08.01.2024"
  },
  {
    id: 8, name: "GoldenRush", role: "Member",
    dcRole: "Member+", dcName: "goldenrush#0008",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=GoldenRush&backgroundColor=fff3cd",
    bio: "Zawsze aktywny podczas clan events!",
    contact: "Discord: goldenrush#0008",
    ps99Level: 720, pets: 220, gems: "5.4B",
    joined: "10.01.2024"
  },
  {
    id: 9, name: "HyperDash", role: "Member",
    dcRole: "Member+", dcName: "hyperdash#0009",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=HyperDash&backgroundColor=f8d7da",
    bio: "Speed runner PS99 - najszybszy gracz w klanie!",
    contact: "Discord: hyperdash#0009",
    ps99Level: 700, pets: 215, gems: "5.1B",
    joined: "11.01.2024"
  },
  {
    id: 10, name: "IceQueen", role: "Member",
    dcRole: "Member", dcName: "icequeen#0010",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=IceQueen&backgroundColor=e8f4fd",
    bio: "Nie pytaj o moją kolekcję petów, bo ci zajmie cały dzień!",
    contact: "Discord: icequeen#0010",
    ps99Level: 680, pets: 210, gems: "4.8B",
    joined: "12.01.2024"
  },
  {
    id: 11, name: "JetStream", role: "Member",
    dcRole: "Member", dcName: "jetstream#0011",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=JetStream&backgroundColor=e2d9f3",
    bio: "Fly high, grind hard. Codziennie online!",
    contact: "Discord: jetstream#0011",
    ps99Level: 660, pets: 200, gems: "4.5B",
    joined: "13.01.2024"
  },
  {
    id: 12, name: "KryptoNite", role: "Member",
    dcRole: "Member", dcName: "kryptonite#0012",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=KryptoNite&backgroundColor=c3e6cb",
    bio: "Kryptonit dla wrogów klanu, sojusznik dla przyjaciół!",
    contact: "Discord: kryptonite#0012",
    ps99Level: 640, pets: 195, gems: "4.3B",
    joined: "14.01.2024"
  },
  {
    id: 13, name: "LightBlade", role: "Member",
    dcRole: "Member", dcName: "lightblade#0013",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=LightBlade&backgroundColor=ffeaa7",
    bio: "Szybki jak światło, ostry jak ostrze!",
    contact: "Discord: lightblade#0013",
    ps99Level: 620, pets: 188, gems: "4.0B",
    joined: "15.01.2024"
  },
  {
    id: 14, name: "MoonWalker", role: "Member",
    dcRole: "Member", dcName: "moonwalker#0014",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=MoonWalker&backgroundColor=dfe6f5",
    bio: "Chodzę po księżycu i zbieram gemy po drodze.",
    contact: "Discord: moonwalker#0014",
    ps99Level: 600, pets: 182, gems: "3.8B",
    joined: "16.01.2024"
  },
  {
    id: 15, name: "NightOwl", role: "Member",
    dcRole: "Member", dcName: "nightowl#0015",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=NightOwl&backgroundColor=2d3436",
    bio: "Gram głównie nocami - nocna zmiana FIFH!",
    contact: "Discord: nightowl#0015",
    ps99Level: 580, pets: 175, gems: "3.6B",
    joined: "17.01.2024"
  },
  {
    id: 16, name: "OmegaForce", role: "Member",
    dcRole: "Member", dcName: "omegaforce#0016",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=OmegaForce&backgroundColor=fdcb6e",
    bio: "Omega level player, zawsze gotowy na wyzwanie!",
    contact: "Discord: omegaforce#0016",
    ps99Level: 560, pets: 170, gems: "3.4B",
    joined: "18.01.2024"
  },
  {
    id: 17, name: "PlasmaBolt", role: "Member",
    dcRole: "Member", dcName: "plasmabolt#0017",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=PlasmaBolt&backgroundColor=a29bfe",
    bio: "Plazmowe uderzenie w każdym evencie!",
    contact: "Discord: plasmabolt#0017",
    ps99Level: 540, pets: 165, gems: "3.2B",
    joined: "19.01.2024"
  },
  {
    id: 18, name: "QuantumLeap", role: "Member",
    dcRole: "Member", dcName: "quantumleap#0018",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=QuantumLeap&backgroundColor=55efc4",
    bio: "Każdy skok to nowy rekord farmowania!",
    contact: "Discord: quantumleap#0018",
    ps99Level: 520, pets: 160, gems: "3.0B",
    joined: "20.01.2024"
  },
  {
    id: 19, name: "RocketFuel", role: "Member",
    dcRole: "Member", dcName: "rocketfuel#0019",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=RocketFuel&backgroundColor=ff7675",
    bio: "Zasilam klan energią i determinacją!",
    contact: "Discord: rocketfuel#0019",
    ps99Level: 500, pets: 155, gems: "2.8B",
    joined: "21.01.2024"
  },
  {
    id: 20, name: "ShadowStrike", role: "Member",
    dcRole: "Member", dcName: "shadowstrike#0020",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=ShadowStrike&backgroundColor=636e72",
    bio: "Z cienia uderzam, zanim się zorientujesz!",
    contact: "Discord: shadowstrike#0020",
    ps99Level: 490, pets: 150, gems: "2.7B",
    joined: "22.01.2024"
  },
  {
    id: 21, name: "TurboBlast", role: "Member",
    dcRole: "Member", dcName: "turboblast#0021",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=TurboBlast&backgroundColor=fab1a0",
    bio: "Turbo mode zawsze włączony!",
    contact: "Discord: turboblast#0021",
    ps99Level: 480, pets: 145, gems: "2.6B",
    joined: "23.01.2024"
  },
  {
    id: 22, name: "UltraViolet", role: "Member",
    dcRole: "Member", dcName: "ultraviolet#0022",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=UltraViolet&backgroundColor=dda0dd",
    bio: "Fioletowa energia w każdej sesji farmowania!",
    contact: "Discord: ultraviolet#0022",
    ps99Level: 470, pets: 142, gems: "2.5B",
    joined: "24.01.2024"
  },
  {
    id: 23, name: "VenomClaw", role: "Member",
    dcRole: "Member", dcName: "venomclaw#0023",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=VenomClaw&backgroundColor=00b894",
    bio: "Jadowity w tradingu, przyjazny dla klanowiczów!",
    contact: "Discord: venomclaw#0023",
    ps99Level: 460, pets: 138, gems: "2.4B",
    joined: "25.01.2024"
  },
  {
    id: 24, name: "WhirlWind", role: "Member",
    dcRole: "Member", dcName: "whirlwind#0024",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=WhirlWind&backgroundColor=74b9ff",
    bio: "Obracam sytuację zawsze na naszą korzyść!",
    contact: "Discord: whirlwind#0024",
    ps99Level: 450, pets: 135, gems: "2.3B",
    joined: "26.01.2024"
  },
  {
    id: 25, name: "XenonFlare", role: "Member",
    dcRole: "Member", dcName: "xenonflare#0025",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=XenonFlare&backgroundColor=ffeaa7",
    bio: "Ksenon świeci jasno, ja też!",
    contact: "Discord: xenonflare#0025",
    ps99Level: 440, pets: 132, gems: "2.2B",
    joined: "27.01.2024"
  },
  {
    id: 26, name: "YellowTail", role: "Member",
    dcRole: "Member", dcName: "yellowtail#0026",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=YellowTail&backgroundColor=ffe082",
    bio: "Żółty jak słońce, szybki jak błyskawica!",
    contact: "Discord: yellowtail#0026",
    ps99Level: 430, pets: 128, gems: "2.1B",
    joined: "28.01.2024"
  },
  {
    id: 27, name: "ZephyrFly", role: "Member",
    dcRole: "Member", dcName: "zephyrfly#0027",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=ZephyrFly&backgroundColor=b2dfdb",
    bio: "Lekki jak wiatr, zwinny jak kot!",
    contact: "Discord: zephyrfly#0027",
    ps99Level: 420, pets: 125, gems: "2.0B",
    joined: "29.01.2024"
  },
  {
    id: 28, name: "AquaShark", role: "Member",
    dcRole: "Member", dcName: "aquashark#0028",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=AquaShark&backgroundColor=87ceeb",
    bio: "Rekin wodnych farmowisk!",
    contact: "Discord: aquashark#0028",
    ps99Level: 410, pets: 122, gems: "1.9B",
    joined: "30.01.2024"
  },
  {
    id: 29, name: "BlazeRider", role: "Member",
    dcRole: "Member", dcName: "blazerider#0029",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=BlazeRider&backgroundColor=ffab40",
    bio: "Jeżdżę na płomieniach do zwycięstwa!",
    contact: "Discord: blazerider#0029",
    ps99Level: 400, pets: 120, gems: "1.8B",
    joined: "01.02.2024"
  },
  {
    id: 30, name: "CosmicDust", role: "Member",
    dcRole: "Member", dcName: "cosmicdust#0030",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=CosmicDust&backgroundColor=ce93d8",
    bio: "Kurz kosmiczny zostawiam za sobą podczas farmowania!",
    contact: "Discord: cosmicdust#0030",
    ps99Level: 390, pets: 117, gems: "1.75B",
    joined: "02.02.2024"
  },
  {
    id: 31, name: "DragonFang", role: "Member",
    dcRole: "Member", dcName: "dragonfang#0031",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=DragonFang&backgroundColor=ef9a9a",
    bio: "Kieł smoka to mój styl gry!",
    contact: "Discord: dragonfang#0031",
    ps99Level: 380, pets: 114, gems: "1.7B",
    joined: "03.02.2024"
  },
  {
    id: 32, name: "ElectroFox", role: "Member",
    dcRole: "Member", dcName: "electrofox#0032",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=ElectroFox&backgroundColor=ffe57f",
    bio: "Elektryczny lis na farmach!",
    contact: "Discord: electrofox#0032",
    ps99Level: 370, pets: 111, gems: "1.65B",
    joined: "04.02.2024"
  },
  {
    id: 33, name: "FlameHawk", role: "Member",
    dcRole: "Member", dcName: "flamehawk#0033",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=FlameHawk&backgroundColor=ff8a65",
    bio: "Jastrzębim okiem widzę okazje tradingowe!",
    contact: "Discord: flamehawk#0033",
    ps99Level: 360, pets: 108, gems: "1.6B",
    joined: "05.02.2024"
  },
  {
    id: 34, name: "GhostRider", role: "Member",
    dcRole: "Member", dcName: "ghostrider#0034",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=GhostRider&backgroundColor=b0bec5",
    bio: "Jeżdżę cicho, ale efektywnie!",
    contact: "Discord: ghostrider#0034",
    ps99Level: 355, pets: 106, gems: "1.55B",
    joined: "06.02.2024"
  },
  {
    id: 35, name: "HyperNova", role: "Member",
    dcRole: "Member", dcName: "hypernova#0035",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=HyperNova&backgroundColor=e1bee7",
    bio: "Eksploduje ze szczęścia przy każdym nowym pecie!",
    contact: "Discord: hypernova#0035",
    ps99Level: 350, pets: 105, gems: "1.5B",
    joined: "07.02.2024"
  },
  {
    id: 36, name: "InfernoKid", role: "Member",
    dcRole: "Member", dcName: "infernokid#0036",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=InfernoKid&backgroundColor=ffccbc",
    bio: "Piekielnie dobry gracz!",
    contact: "Discord: infernokid#0036",
    ps99Level: 345, pets: 103, gems: "1.45B",
    joined: "08.02.2024"
  },
  {
    id: 37, name: "JaguarPaw", role: "Member",
    dcRole: "Member", dcName: "jaguarpaw#0037",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=JaguarPaw&backgroundColor=f9a825",
    bio: "Łapa jaguara na każdej okazji!",
    contact: "Discord: jaguarpaw#0037",
    ps99Level: 340, pets: 102, gems: "1.4B",
    joined: "09.02.2024"
  },
  {
    id: 38, name: "KiloStorm", role: "Member",
    dcRole: "Member", dcName: "kilostorm#0038",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=KiloStorm&backgroundColor=90caf9",
    bio: "Burza tysiąca gemów!",
    contact: "Discord: kilostorm#0038",
    ps99Level: 335, pets: 100, gems: "1.35B",
    joined: "10.02.2024"
  },
  {
    id: 39, name: "LunarFang", role: "Member",
    dcRole: "Member", dcName: "lunarfang#0039",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=LunarFang&backgroundColor=e3f2fd",
    bio: "Księżycowy wilk PS99!",
    contact: "Discord: lunarfang#0039",
    ps99Level: 330, pets: 99, gems: "1.3B",
    joined: "11.02.2024"
  },
  {
    id: 40, name: "MetalClaw", role: "Member",
    dcRole: "Member", dcName: "metalclaw#0040",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=MetalClaw&backgroundColor=cfd8dc",
    bio: "Metalowe pazury zostawiam na każdym evencie!",
    contact: "Discord: metalclaw#0040",
    ps99Level: 325, pets: 98, gems: "1.25B",
    joined: "12.02.2024"
  },
  {
    id: 41, name: "NebulaKid", role: "Member",
    dcRole: "Member", dcName: "nebulakid#0041",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=NebulaKid&backgroundColor=b39ddb",
    bio: "Zrodzony z mgławicy, skazany na sukces!",
    contact: "Discord: nebulakid#0041",
    ps99Level: 320, pets: 96, gems: "1.2B",
    joined: "13.02.2024"
  },
  {
    id: 42, name: "OrionBeast", role: "Member",
    dcRole: "Member", dcName: "orionbeast#0042",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=OrionBeast&backgroundColor=80cbc4",
    bio: "Bestia z konstelacji Oriona!",
    contact: "Discord: orionbeast#0042",
    ps99Level: 315, pets: 95, gems: "1.15B",
    joined: "14.02.2024"
  },
  {
    id: 43, name: "PhantomBlaze", role: "Member",
    dcRole: "Member", dcName: "phantomblaze#0043",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=PhantomBlaze&backgroundColor=f48fb1",
    bio: "Płomienny duch na farmach!",
    contact: "Discord: phantomblaze#0043",
    ps99Level: 310, pets: 93, gems: "1.1B",
    joined: "15.02.2024"
  },
  {
    id: 44, name: "QuasarFire", role: "Member",
    dcRole: "Member", dcName: "quasarfire#0044",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=QuasarFire&backgroundColor=ffb74d",
    bio: "Moc kwazara w każdej walce!",
    contact: "Discord: quasarfire#0044",
    ps99Level: 305, pets: 92, gems: "1.08B",
    joined: "16.02.2024"
  },
  {
    id: 45, name: "RavenStrike", role: "Member",
    dcRole: "Member", dcName: "ravenstrike#0045",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=RavenStrike&backgroundColor=546e7a",
    bio: "Uderzam jak kruk - cicho i celnie!",
    contact: "Discord: ravenstrike#0045",
    ps99Level: 300, pets: 90, gems: "1.05B",
    joined: "17.02.2024"
  },
  {
    id: 46, name: "StellarBolt", role: "Member",
    dcRole: "Member", dcName: "stellarbolt#0046",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=StellarBolt&backgroundColor=81d4fa",
    bio: "Gwiezdna błyskawica PS99!",
    contact: "Discord: stellarbolt#0046",
    ps99Level: 295, pets: 88, gems: "1.0B",
    joined: "18.02.2024"
  },
  {
    id: 47, name: "ThunderPaws", role: "Member",
    dcRole: "Member", dcName: "thunderpaws#0047",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=ThunderPaws&backgroundColor=fff59d",
    bio: "Łapy grzmotu na każdej farmie!",
    contact: "Discord: thunderpaws#0047",
    ps99Level: 290, pets: 87, gems: "980M",
    joined: "19.02.2024"
  },
  {
    id: 48, name: "UrchinBlade", role: "Member",
    dcRole: "Member", dcName: "urchinblade#0048",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=UrchinBlade&backgroundColor=a5d6a7",
    bio: "Ostrze jeżowca - zawsze gotowe!",
    contact: "Discord: urchinblade#0048",
    ps99Level: 285, pets: 85, gems: "950M",
    joined: "20.02.2024"
  },
  {
    id: 49, name: "VortexKing", role: "Member",
    dcRole: "Member", dcName: "vortexking#0049",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=VortexKing&backgroundColor=7986cb",
    bio: "Król wiru farmowego!",
    contact: "Discord: vortexking#0049",
    ps99Level: 280, pets: 84, gems: "920M",
    joined: "21.02.2024"
  },
  {
    id: 50, name: "WarpSpeed", role: "Member",
    dcRole: "Member", dcName: "warpspeed#0050",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=WarpSpeed&backgroundColor=ffcc02",
    bio: "Prędkość warp to mój standard!",
    contact: "Discord: warpspeed#0050",
    ps99Level: 275, pets: 82, gems: "900M",
    joined: "22.02.2024"
  },
  {
    id: 51, name: "XtremeFang", role: "Member",
    dcRole: "Member", dcName: "xtremefang#0051",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=XtremeFang&backgroundColor=ef5350",
    bio: "Ekstremalny kieł na każdym turnieju!",
    contact: "Discord: xtremefang#0051",
    ps99Level: 270, pets: 81, gems: "880M",
    joined: "23.02.2024"
  },
  {
    id: 52, name: "YetiHunter", role: "Member",
    dcRole: "Member", dcName: "yetihunter#0052",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=YetiHunter&backgroundColor=e0f7fa",
    bio: "Poluje na rzadkie pety jak na yeti!",
    contact: "Discord: yetihunter#0052",
    ps99Level: 265, pets: 79, gems: "860M",
    joined: "24.02.2024"
  },
  {
    id: 53, name: "ZeusLegacy", role: "Member",
    dcRole: "Member", dcName: "zeuslegacy#0053",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=ZeusLegacy&backgroundColor=fce4ec",
    bio: "Dziedzictwo Zeusa w każdym uderzeniu!",
    contact: "Discord: zeuslegacy#0053",
    ps99Level: 260, pets: 78, gems: "840M",
    joined: "25.02.2024"
  },
  {
    id: 54, name: "AlphaWolf", role: "Member",
    dcRole: "Member", dcName: "alphawolf#0054",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=AlphaWolf&backgroundColor=424242",
    bio: "Alfa watahy FIFH!",
    contact: "Discord: alphawolf#0054",
    ps99Level: 255, pets: 76, gems: "820M",
    joined: "26.02.2024"
  },
  {
    id: 55, name: "BlazeNova", role: "Member",
    dcRole: "Member", dcName: "blazenova#0055",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=BlazeNova&backgroundColor=ff8f00",
    bio: "Płomienna nova farmowania!",
    contact: "Discord: blazenova#0055",
    ps99Level: 250, pets: 75, gems: "800M",
    joined: "27.02.2024"
  },
  {
    id: 56, name: "CyberPaws", role: "Member",
    dcRole: "Member", dcName: "cyberpaws#0056",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=CyberPaws&backgroundColor=00e5ff",
    bio: "Cyber łapy w cyber świecie PS99!",
    contact: "Discord: cyberpaws#0056",
    ps99Level: 245, pets: 73, gems: "780M",
    joined: "28.02.2024"
  },
  {
    id: 57, name: "DeltaForce", role: "Member",
    dcRole: "Member", dcName: "deltaforce#0057",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=DeltaForce&backgroundColor=76ff03",
    bio: "Siły specjalne klanu FIFH!",
    contact: "Discord: deltaforce#0057",
    ps99Level: 240, pets: 72, gems: "760M",
    joined: "01.03.2024"
  },
  {
    id: 58, name: "EpicRoar", role: "Member",
    dcRole: "Member", dcName: "epicroar#0058",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=EpicRoar&backgroundColor=ffd54f",
    bio: "Epicki ryk na całą arenę!",
    contact: "Discord: epicroar#0058",
    ps99Level: 235, pets: 70, gems: "740M",
    joined: "02.03.2024"
  },
  {
    id: 59, name: "FireFalcon", role: "Member",
    dcRole: "Member", dcName: "firefalcon#0059",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=FireFalcon&backgroundColor=ff6e40",
    bio: "Sokoł ognia szybuje po gemsach!",
    contact: "Discord: firefalcon#0059",
    ps99Level: 230, pets: 69, gems: "720M",
    joined: "03.03.2024"
  },
  {
    id: 60, name: "GigaSmash", role: "Member",
    dcRole: "Member", dcName: "gigasmash#0060",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=GigaSmash&backgroundColor=ea80fc",
    bio: "Giga uderzenie w każdej walce!",
    contact: "Discord: gigasmash#0060",
    ps99Level: 225, pets: 67, gems: "700M",
    joined: "04.03.2024"
  },
  {
    id: 61, name: "HeliosBlade", role: "Member",
    dcRole: "Member", dcName: "heliosblade#0061",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=HeliosBlade&backgroundColor=fffde7",
    bio: "Ostrze boga słońca!",
    contact: "Discord: heliosblade#0061",
    ps99Level: 220, pets: 66, gems: "680M",
    joined: "05.03.2024"
  },
  {
    id: 62, name: "IronWolf", role: "Member",
    dcRole: "Member", dcName: "ironwolf#0062",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=IronWolf&backgroundColor=90a4ae",
    bio: "Żelazny wilk nie odpuszcza!",
    contact: "Discord: ironwolf#0062",
    ps99Level: 215, pets: 64, gems: "660M",
    joined: "06.03.2024"
  },
  {
    id: 63, name: "JollyPanda", role: "Member",
    dcRole: "Member", dcName: "jollypanda#0063",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=JollyPanda&backgroundColor=f5f5f5",
    bio: "Wesoła panda farmi bambus i gemsas!",
    contact: "Discord: jollypanda#0063",
    ps99Level: 210, pets: 63, gems: "640M",
    joined: "07.03.2024"
  },
  {
    id: 64, name: "KaijuKing", role: "Member",
    dcRole: "Member", dcName: "kaijuking#0064",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=KaijuKing&backgroundColor=c5e1a5",
    bio: "Król potworów PS99!",
    contact: "Discord: kaijuking#0064",
    ps99Level: 205, pets: 61, gems: "620M",
    joined: "08.03.2024"
  },
  {
    id: 65, name: "LavaFlow", role: "Member",
    dcRole: "Member", dcName: "lavaflow#0065",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=LavaFlow&backgroundColor=ff5722",
    bio: "Płynę jak lawa, niszczę wszystko na drodze!",
    contact: "Discord: lavaflow#0065",
    ps99Level: 200, pets: 60, gems: "600M",
    joined: "09.03.2024"
  },
  {
    id: 66, name: "MegaForce", role: "Member",
    dcRole: "Member", dcName: "megaforce#0066",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=MegaForce&backgroundColor=3f51b5",
    bio: "Mega siła FIFH!",
    contact: "Discord: megaforce#0066",
    ps99Level: 195, pets: 58, gems: "580M",
    joined: "10.03.2024"
  },
  {
    id: 67, name: "NinjaFox", role: "Member",
    dcRole: "Member", dcName: "ninjafox#0067",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=NinjaFox&backgroundColor=ff8a80",
    bio: "Lis ninja - mistrzem ciszy i szybkości!",
    contact: "Discord: ninjafox#0067",
    ps99Level: 190, pets: 57, gems: "560M",
    joined: "11.03.2024"
  },
  {
    id: 68, name: "OceanWave", role: "Member",
    dcRole: "Member", dcName: "oceanwave#0068",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=OceanWave&backgroundColor=80deea",
    bio: "Oceaniczna fala gemów!",
    contact: "Discord: oceanwave#0068",
    ps99Level: 185, pets: 55, gems: "540M",
    joined: "12.03.2024"
  },
  {
    id: 69, name: "PrismLight", role: "Member",
    dcRole: "Member", dcName: "prismlight#0069",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=PrismLight&backgroundColor=e8eaf6",
    bio: "Rozszczepiam światło na tysiąc kolorów!",
    contact: "Discord: prismlight#0069",
    ps99Level: 180, pets: 54, gems: "520M",
    joined: "13.03.2024"
  },
  {
    id: 70, name: "QuickStrike", role: "Member",
    dcRole: "Member", dcName: "quickstrike#0070",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=QuickStrike&backgroundColor=f9fbe7",
    bio: "Szybkie uderzenie, pewny wynik!",
    contact: "Discord: quickstrike#0070",
    ps99Level: 175, pets: 52, gems: "500M",
    joined: "14.03.2024"
  },
  {
    id: 71, name: "RedTornado", role: "Member",
    dcRole: "Member", dcName: "redtornado#0071",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=RedTornado&backgroundColor=ffcdd2",
    bio: "Czerwone tornado farmowania!",
    contact: "Discord: redtornado#0071",
    ps99Level: 170, pets: 51, gems: "480M",
    joined: "15.03.2024"
  },
  {
    id: 72, name: "StormBreaker", role: "Member",
    dcRole: "Member", dcName: "stormbreaker#0072",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=StormBreaker&backgroundColor=b3e5fc",
    bio: "Łamię każdą burzę!",
    contact: "Discord: stormbreaker#0072",
    ps99Level: 165, pets: 49, gems: "460M",
    joined: "16.03.2024"
  },
  {
    id: 73, name: "TigerClaw", role: "Member",
    dcRole: "Member", dcName: "tigerclaw#0073",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=TigerClaw&backgroundColor=ffe0b2",
    bio: "Tygrysie pazury na każdym farmie!",
    contact: "Discord: tigerclaw#0073",
    ps99Level: 160, pets: 48, gems: "440M",
    joined: "17.03.2024"
  },
  {
    id: 74, name: "UltraSmash", role: "Member",
    dcRole: "Member", dcName: "ultrasmash#0074",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=UltraSmash&backgroundColor=e8f5e9",
    bio: "Ultra uderzenie - nie do zatrzymania!",
    contact: "Discord: ultrasmash#0074",
    ps99Level: 155, pets: 47, gems: "420M",
    joined: "18.03.2024"
  },
  {
    id: 75, name: "ViperrFang", role: "Member",
    dcRole: "Member", dcName: "viperrfang#0075",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=ViperrFang&backgroundColor=dcedc8",
    bio: "Żmijowy kieł - ostatni, ale nie mniej groźny!",
    contact: "Discord: viperrfang#0075",
    ps99Level: 150, pets: 45, gems: "400M",
    joined: "19.03.2024"
  }
];

// ============================================================
//  NEWSY KLANU
// ============================================================

const NEWS = [
  {
    emoji: "🏆", color: "linear-gradient(135deg,#ffd700,#ff8c00)",
    tag: "event", tagLabel: "Event",
    title: "FIFH wygrywa Clan Battle Tygodnia!",
    desc: "Nasz klan zajął 1. miejsce w cotygodniowym turnieju klanów. Gratulacje dla wszystkich członków za niesamowitą pracę!",
    date: "10 maja 2025"
  },
  {
    emoji: "🐉", color: "linear-gradient(135deg,#667eea,#764ba2)",
    tag: "update", tagLabel: "Aktualizacja",
    title: "Nowy pet: Dragon Emperor dostępny!",
    desc: "Pet Simulator 99 dodało Dragon Emperor do gry. Kilku członków FIFH już go zdobyło! Sprawdźcie zakładkę Handel na Discordzie.",
    date: "8 maja 2025"
  },
  {
    emoji: "🎉", color: "linear-gradient(135deg,#ff6b35,#ff9a56)",
    tag: "clan", tagLabel: "Klan",
    title: "Osiągnęliśmy 75 członków!",
    desc: "Klan FIFH osiągnął maksymalny limit 75 aktywnych członków. Dziękujemy wszystkim za dołączenie i aktywność!",
    date: "5 maja 2025"
  },
  {
    emoji: "📜", color: "linear-gradient(135deg,#06ffa5,#0072ff)",
    tag: "update", tagLabel: "Nowe zasady",
    title: "Zaktualizowane zasady klanu",
    desc: "Liderzy FIFH zaktualizowali regulamin klanu. Prosimy wszystkich o przeczytanie nowych zasad na Discordzie!",
    date: "1 maja 2025"
  },
  {
    emoji: "🌟", color: "linear-gradient(135deg,#f093fb,#f5576c)",
    tag: "event", tagLabel: "Event",
    title: "Clan Event: Gem Race w ten weekend!",
    desc: "Zbierz jak najwięcej gemów w ciągu weekendu! Top 3 graczy otrzyma specjalne odznaki na Discordzie i nagrody w grze.",
    date: "28 kwietnia 2025"
  },
  {
    emoji: "🎮", color: "linear-gradient(135deg,#4facfe,#00f2fe)",
    tag: "clan", tagLabel: "Klan",
    title: "Nowe czasy farm sessions!",
    desc: "Ustaliliśmy nowe godziny wspólnych sesji farmowania: codziennie o 18:00 i 21:00 czasu polskiego. Zapraszamy!",
    date: "25 kwietnia 2025"
  }
];
