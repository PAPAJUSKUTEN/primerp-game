/**
 * Główny skrypt obsługujący logikę platformy PRIME RP
 * Skupiony na informacyjnych profilach administracji i systemie autoryzacji.
 */

const staffDatabase = [
    { name: "IⱽI₭Ɇ₱₳₦₵₳₭Ɇ₴", role: "Owner", desc: "Najwyższy ranga w projekcie. Założyciel i główny deweloper PrimeRP.", img: "https://i.postimg.cc/KjvhBywK/image-14.jpg" },
    { name: "! KUBA", role: "CO-Owner", desc: "Zarządzanie sprawami technicznymi oraz koordynacja działań zarządu.", img: "https://i.postimg.cc/KjvhBywK/image-14.jpg" },
    { name: "Czesio", role: "2ND CO-Owner", desc: "Nadzór nad frakcjami państwowymi oraz dbanie o porządek w strukturach LSPD/EMS.", img: "https://i.postimg.cc/mrxG4kRy/55c4629fb275e-o-large.webp" },
    { name: "Posel", role: "Prezes", desc: "Opiekun administracji, odpowiedzialny za rekrutację i dyscyplinę wewnątrz ekipy.", img: "https://i.postimg.cc/8519krYf/270aac72-dcb0-4b08-bca6-44c6da70ee5f-profile-image-300x300.webp" },
    { name: "klaudiaa<3", role: "Trial Admin", desc: "Wsparcie techniczne i opieka nad zgłoszeniami graczy (Tickety).", img: "https://i.postimg.cc/0Nz4jwXJ/Zrzut-ekranu-2024-03-08-195813.webp" },
    { name: "_X4Miki", role: "Trial Admin", desc: "Kontrola realizmu rozgrywki oraz nadzór nad akcjami RP.", img: "https://i.postimg.cc/sDfw1Wvs/1991785604-tojabetter-jpg-0d3cc87805663cc513833a3e9d19796c.webp" },
    { name: "Itzz_Stysiu", role: "Senior Mod", desc: "Doświadczony moderator polowy, specjalista od spornych sytuacji.", img: "https://i.postimg.cc/Cx1Pr8g4/IMG-2398.webp" },
    { name: "VGSxVexu💛", role: "Support", desc: "Pomoc nowym graczom w stawianiu pierwszych kroków na serwerze.", img: "https://i.postimg.cc/VvK9X75Z/IMG-3268.webp" },
    { name: "Kokos", role: "Support", desc: "Nadzór nad porządkiem na Discordzie oraz forum serwerowym.", img: "https://i.postimg.cc/jdCPG4DT/1496b848796a7f6e8928a841500df90c.webp" },
    { name: "! laczekk", role: "Support", desc: "Specjalista od map i skryptów wspomagający deweloperów.", img: "https://i.postimg.cc/TPxMMrb8/0b921f0878a6e549b4c31efc29383d1b.webp" },
    { name: "tymi1_3", role: "Support", desc: "Zarządzanie eventami serwerowymi i wsparcie techniczne.", img: "https://i.postimg.cc/prb1zvBx/Playboi-Carti-604x900.webp" },
    { name: "Artur", role: "Technik", desc: "Opieka nad nowymi graczami oraz procesami WhiteList.", img: "https://i.postimg.cc/V6c2hN4P/c6f621103d57b4573bb765c7b42ebb03.webp" }
];

let localAccounts = JSON.parse(localStorage.getItem('prime_sys_accounts_v29')) || [];
let activeStaffTarget = "";

window.onload = function() {
    renderStaffList();
    renderDBList();
    startDigitalClock();
};

/**
 * Zegar cyfrowy w nagłówku
 */
function startDigitalClock() {
    setInterval(() => {
        const now = new Date();
        const clockEl = document.getElementById('digital-clock');
        if(clockEl) clockEl.innerText = now.toLocaleString('pl-PL');
    }, 1000);
}

/**
 * Nawigacja między zakładkami
 */
function navigateTo(tabId, element) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    const targetTab = document.getElementById(tabId);
    if(targetTab) targetTab.classList.add('active');
    
    if(element) {
        element.classList.add('active');
    } else {
        const btn = document.getElementById('btn-' + tabId);
        if(btn) btn.classList.add('active');
    }
}

/**
 * Renderowanie listy administracji w zakładce "Administracja"
 */
function renderStaffList() {
    const list = document.getElementById('staff-render-list');
    if(!list) return;
    list.innerHTML = staffDatabase.map(s => `
        <div class="glass-card text-center cursor-pointer transform hover:scale-105 transition-all" onclick="openStaffProfile('${s.name}', '${s.role}', '${s.img}', '${s.desc}')">
            <img src="${s.img}" class="staff-avatar mb-4">
            <h4 class="font-black text-sm uppercase italic">${s.name}</h4>
            <p class="text-yellow-400 text-[10px] font-bold tracking-widest mt-1 uppercase">${s.role}</p>
        </div>
    `).join('');
}

/**
 * Otwieranie modalnego "Profilu Informacyjnego" członka ekipy
 */
function openStaffProfile(n, r, i, d) {
    activeStaffTarget = n;
    document.getElementById('s-info-name').innerText = n;
    document.getElementById('s-info-role').innerText = r;
    document.getElementById('s-info-img').src = i;
    document.getElementById('s-info-desc').innerText = d;
    document.getElementById('modal-staff').style.display = 'flex';
}

/**
 * Wysyłanie wiadomości do członka administracji przez Discord Webhook
 */
async function sendStaffMessage() {
    const text = document.getElementById('s-msg-content').value;
    if(!text) return alert("Pusta wiadomość!");
    const sender = document.getElementById('user-header').innerText;
    
    const payload = { 
        content: `📩 **NOWA WIADOMOŚĆ DO EKIPY**\n**Do:** ${activeStaffTarget}\n**Od:** ${sender}\n**Treść:** ${text}` 
    };
    
    try {
        await fetch("https://discord.com/api/webhooks/1490902802837274664/OmoHB4CdSWIR4xhVowSCB-ZOakiUI83_ofFk8oJOl0R9iy5JAjrBGGcy8zNg4zWwz-x8", {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(payload)
        });
        alert("Wiadomość została przesłana!");
        document.getElementById('modal-staff').style.display = 'none';
        document.getElementById('s-msg-content').value = "";
    } catch(e) {
        alert("Wystąpił błąd przy wysyłaniu wiadomości.");
    }
}

/**
 * Logika Systemu Autoryzacji
 */
function tryLogin() {
    const u = document.getElementById('auth-user').value;
    const p = document.getElementById('auth-pass').value;

    // Specjalne konto Admina
    if(u === "admin" && p === "1234") { 
        loginAs("Administrator Systemu", true); 
        return;
    }

    // Sprawdzanie citizenDatabase (jeśli istnieje w users.js)
    if (typeof citizenDatabase !== 'undefined') {
        const citizen = citizenDatabase.find(c => c.user === u && c.pass === p);
        if(citizen) {
            loginAs(citizen.profile.fullName, false);
            return;
        }
    }

    // Sprawdzanie bazy lokalnej
    const account = localAccounts.find(acc => acc.user === u && acc.pass === p);
    if(account) { 
        loginAs(u, false); 
    } else { 
        alert("Niepoprawny identyfikator lub klucz dostępu!"); 
    }
}

function loginAs(name, isAdmin) {
    document.getElementById('user-header').innerText = name;
    document.getElementById('nav-login').classList.add('hidden');
    document.getElementById('nav-logout').classList.remove('hidden');

    if(isAdmin) {
        document.getElementById('nav-admin-panel').classList.remove('hidden');
    }
    
    // Po zalogowaniu zostajemy na stronie głównej (Home)
    navigateTo('home');
    alert("Zalogowano pomyślnie jako: " + name);
}

/**
 * Panel Zarządzania Bazą (Lokalną)
 */
function renderDBList() {
    const list = document.getElementById('db-user-list');
    if(!list) return;
    list.innerHTML = localAccounts.map((acc, idx) => `
        <div class="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5">
            <div>
                <p class="text-white font-bold text-sm">${acc.user}</p>
                <p class="text-dim text-[10px] tracking-widest">${acc.pass}</p>
            </div>
            <button onclick="removeUser(${idx})" class="text-red-500 hover:text-white transition text-xs font-black uppercase">Usuń</button>
        </div>
    `).join('');
}

function addUserToDB() {
    const u = document.getElementById('db-new-user').value;
    const p = document.getElementById('db-new-pass').value;
    if(!u || !p) return alert("Uzupełnij pola logowania!");
    localAccounts.push({user: u, pass: p});
    localStorage.setItem('prime_sys_accounts_v29', JSON.stringify(localAccounts));
    renderDBList();
    document.getElementById('db-new-user').value = "";
    document.getElementById('db-new-pass').value = "";
}

function removeUser(idx) {
    localAccounts.splice(idx, 1);
    localStorage.setItem('prime_sys_accounts_v29', JSON.stringify(localAccounts));
    renderDBList();
}
