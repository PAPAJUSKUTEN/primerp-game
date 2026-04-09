/**
 * Główny skrypt obsługujący logikę platformy PRIME RP
 * Zawiera system nawigacji, autoryzacji oraz integrację z Discord Webhook.
 */

const staffDatabase = [
    { name: "IⱽI₭Ɇ₱₳₦₵₳₭Ɇ₴", role: "Owner", desc: "Najwyższy ranga w projekcie. Założyciel.", img: "https://i.postimg.cc/KjvhBywK/image-14.jpg" },
    { name: "! KUBA", role: "CO-Owner", desc: "Zarządzanie sprawami technicznymi.", img: "https://i.postimg.cc/KjvhBywK/image-14.jpg" },
    { name: "Czesio", role: "2ND CO-Owner", desc: "Nadzór nad frakcjami państwowymi.", img: "https://i.postimg.cc/mrxG4kRy/55c4629fb275e-o-large.webp" },
    { name: "Posel", role: "Prezes", desc: "Opiekun administracji.", img: "https://i.postimg.cc/8519krYf/270aac72-dcb0-4b08-bca6-44c6da70ee5f-profile-image-300x300.webp" },
    { name: "klaudiaa<3", role: "Trial Admin", desc: "Wsparcie techniczne i opieka nad zgłoszeniami.", img: "https://i.postimg.cc/0Nz4jwXJ/Zrzut-ekranu-2024-03-08-195813.webp" },
    { name: "_X4Miki", role: "Trial Admin", desc: "Kontrola realizmu rozgrywki.", img: "https://i.postimg.cc/sDfw1Wvs/1991785604-tojabetter-jpg-0d3cc87805663cc513833a3e9d19796c.webp" },
    { name: "Itzz_Stysiu", role: "Senior Mod", desc: "Doświadczony moderator polowy.", img: "https://i.postimg.cc/Cx1Pr8g4/IMG-2398.webp" },
    { name: "VGSxVexu💛", role: "Support", desc: "Pomoc graczom w sprawach technicznych.", img: "https://i.postimg.cc/VvK9X75Z/IMG-3268.webp" },
    { name: "Kokos", role: "Support", desc: "Nadzór nad porządkiem na Discordzie.", img: "https://i.postimg.cc/jdCPG4DT/1496b848796a7f6e8928a841500df90c.webp" },
    { name: "! laczekk", role: "Support", desc: "Specjalista od map i skryptów.", img: "https://i.postimg.cc/TPxMMrb8/0b921f0878a6e549b4c31efc29383d1b.webp" },
    { name: "tymi1_3", role: "Support", desc: "Zarządzanie eventami i wsparcie deweloperskie.", img: "https://i.postimg.cc/prb1zvBx/Playboi-Carti-604x900.webp" },
    { name: "Artur", role: "Technik", desc: "Opieka nad nowymi graczami i WhiteList.", img: "https://i.postimg.cc/V6c2hN4P/c6f621103d57b4573bb765c7b42ebb03.webp" }
];

let localAccounts = JSON.parse(localStorage.getItem('prime_sys_accounts_v29')) || [];
let activeStaffTarget = "";

window.onload = () => {
    renderStaffList();
    renderDBList();
    startDigitalClock();
};

function startDigitalClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('digital-clock').innerText = now.toLocaleString('pl-PL');
    }, 1000);
}

function navigateTo(tabId, element) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    
    // Podświetlenie odpowiedniego przycisku w menu
    if(element) {
        element.classList.add('active');
    } else {
        const btn = document.getElementById('btn-' + tabId);
        if(btn) btn.classList.add('active');
    }
}

function openMapData(title, desc, img) {
    document.getElementById('m-info-title').innerText = title;
    document.getElementById('m-info-desc').innerText = desc;
    document.getElementById('m-info-img').src = img;
    document.getElementById('modal-map').style.display = 'flex';
}

function renderStaffList() {
    const list = document.getElementById('staff-render-list');
    list.innerHTML = staffDatabase.map(s => `
        <div class="glass-card text-center cursor-pointer" onclick="openStaffProfile('${s.name}', '${s.role}', '${s.img}', '${s.desc}')">
            <img src="${s.img}" class="staff-avatar">
            <h4 class="font-black text-sm uppercase italic">${s.name}</h4>
            <p class="text-yellow-400 text-[10px] font-bold tracking-widest mt-1 uppercase">${s.role}</p>
        </div>
    `).join('');
}

function openStaffProfile(n, r, i, d) {
    activeStaffTarget = n;
    document.getElementById('s-info-name').innerText = n;
    document.getElementById('s-info-role').innerText = r;
    document.getElementById('s-info-img').src = i;
    document.getElementById('s-info-desc').innerText = d;
    document.getElementById('modal-staff').style.display = 'flex';
}

async function sendStaffMessage() {
    const text = document.getElementById('s-msg-content').value;
    if(!text) return alert("Pusta wiadomość!");
    const payload = { content: `📩 **WIADOMOŚĆ**\n**Do:** ${activeStaffTarget}\n**Od:** ${document.getElementById('user-header').innerText}\n**Treść:** ${text}` };
    await fetch("https://discord.com/api/webhooks/1490902802837274664/OmoHB4CdSWIR4xhVowSCB-ZOakiUI83_ofFk8oJOl0R9iy5JAjrBGGcy8zNg4zWwz-x8", {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)
    });
    alert("Wysłano wiadomość!");
    document.getElementById('modal-staff').style.display = 'none';
}

async function submitReport() {
    const s = document.getElementById('rep-subject').value;
    const b = document.getElementById('rep-body').value;
    if(!s || !b) return alert("Uzupełnij pola!");
    const payload = { content: `🚨 **NOWE ZGŁOSZENIE**\n**Temat:** ${s}\n**Zgłaszający:** ${document.getElementById('user-header').innerText}\n**Opis:** ${b}` };
    await fetch("https://discord.com/api/webhooks/1490516856711155815/Chia9TI7kopiEG7Vnbm2l77iWIEA38lG6zcFmB-IBSl0KXlo3uBIoW6FtkmgLX3BFzzx", {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)
    });
    alert("Zgłoszenie wysłane!");
    document.getElementById('rep-subject').value = "";
    document.getElementById('rep-body').value = "";
}

// --- LOGIKA LOGOWANIA ---
function tryLogin() {
    const u = document.getElementById('auth-user').value;
    const p = document.getElementById('auth-pass').value;

    // 1. Sprawdź czy to Admin
    if(u === 'admin' && p === '1234') { 
        loginAs("ADMINISTRATOR", true, null); 
        return;
    }

    // 2. Sprawdź w zewnętrznej bazie Obywateli (z pliku users.js)
    if (typeof citizenDatabase !== 'undefined') {
        const citizen = citizenDatabase.find(c => c.user === u && c.pass === p);
        if(citizen) {
            loginAs(citizen.user, false, citizen.profile);
            return;
        }
    }

    // 3. Sprawdź w lokalnej bazie (localStorage)
    const account = localAccounts.find(acc => acc.user === u && acc.pass === p);
    if(account) { 
        loginAs(u, false, null); 
    } else { 
        alert("Identyfikacja nieudana. Sprawdź dane!"); 
    }
}

function loginAs(name, isAdmin, profile) {
    document.getElementById('user-header').innerText = name;
    document.getElementById('nav-login').classList.add('hidden');
    document.getElementById('nav-logout').classList.remove('hidden');

    if(isAdmin) {
        document.getElementById('nav-admin-panel').classList.remove('hidden');
    }

    // Jeśli zalogowano jako Obywatel z profilem
    if(profile) {
        document.getElementById('btn-profile').classList.remove('hidden');
        document.getElementById('p-avatar').src = profile.avatar;
        document.getElementById('p-name').innerText = profile.fullName;
        document.getElementById('p-job').innerText = profile.job;
        document.getElementById('p-status').innerText = profile.status;
        document.getElementById('p-balance').innerText = profile.balance;
        document.getElementById('p-bankAcc').innerText = profile.bankAcc;
        
        navigateTo('profile');
    } else {
        navigateTo('home');
    }
}

// Administracja lokalną bazą
function renderDBList() {
    const list = document.getElementById('db-user-list');
    if(!list) return;
    list.innerHTML = localAccounts.map((acc, idx) => `
        <div class="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5">
            <div>
                <p class="text-white font-bold text-sm">${acc.user}</p>
                <p class="text-dim text-[10px] tracking-widest">${acc.pass}</p>
            </div>
            <button onclick="removeUser(${idx})" class="text-red-500 hover:text-white transition">USUŃ</button>
        </div>
    `).join('');
}

function addUserToDB() {
    const u = document.getElementById('db-new-user').value;
    const p = document.getElementById('db-new-pass').value;
    if(!u || !p) return alert("Uzupełnij dane!");
    localAccounts.push({user: u, pass: p});
    localStorage.setItem('prime_sys_accounts_v29', JSON.stringify(localAccounts));
    renderDBList();
    alert("Konto dodane do bazy lokalnej!");
}

function removeUser(idx) {
    localAccounts.splice(idx, 1);
    localStorage.setItem('prime_sys_accounts_v29', JSON.stringify(localAccounts));
    renderDBList();
}
