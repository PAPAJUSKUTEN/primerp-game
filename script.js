// Globalne Inicjalizacje
let localAccounts = JSON.parse(localStorage.getItem('prime_sys_accounts_v29')) || [];
let activeStaffTarget = "";

window.onload = () => {
    renderStaffList();
    renderDBList();
    startDigitalClock();
};

// Mechanizm Zegara
function startDigitalClock() {
    const clock = document.getElementById('digital-clock');
    setInterval(() => {
        const now = new Date();
        clock.innerText = now.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }, 1000);
}

// Nawigacja
function navigateTo(tabId, element) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    if (element) element.classList.add('active');
}

// Obsługa Mapy
function openMapData(title, desc, img) {
    const m = document.getElementById('modal-map');
    document.getElementById('m-info-title').innerText = title;
    document.getElementById('m-info-desc').innerText = desc;
    document.getElementById('m-info-img').src = img;
    m.style.display = 'flex';
}

// Renderowanie Staff
function renderStaffList() {
    const list = document.getElementById('staff-render-list');
    list.innerHTML = staffDatabase.map(s => `
        <div class="glass-card text-center cursor-pointer hover:border-yellow-400 transition" onclick="openStaffProfile('${s.name}', '${s.role}', '${s.img}', '${s.desc}')">
            <img src="${s.img}" class="staff-avatar">
            <h4 class="font-black text-sm uppercase italic">${s.name}</h4>
            <p class="text-yellow-400 text-[10px] font-bold mt-1 uppercase tracking-widest">${s.role}</p>
        </div>
    `).join('');
}

function openStaffProfile(name, role, img, desc) {
    activeStaffTarget = name;
    document.getElementById('s-info-name').innerText = name;
    document.getElementById('modal-staff').style.display = 'flex';
}

function sendStaffMessage() {
    const content = document.getElementById('s-msg-content').value;
    if(!content) return alert("Wpisz wiadomość!");
    alert("Wiadomość do " + activeStaffTarget + " została wysłana!");
    document.getElementById('modal-staff').style.display = 'none';
    document.getElementById('s-msg-content').value = "";
}

// Logowanie i Autoryzacja
function tryLogin() {
    const u = document.getElementById('auth-user').value;
    const p = document.getElementById('auth-pass').value;

    // Login Admina
    if (u === 'admin' && p === '1234') {
        loginAs("ADMINISTRATOR", true, null);
        return;
    }

    // Login Obywatela
    const citizen = citizenDatabase.find(c => c.user === u && c.pass === p);
    if (citizen) {
        loginAs(citizen.user, false, citizen.profile);
        return;
    }

    // Login z Bazy Lokalnej
    const local = localAccounts.find(c => c.user === u && c.pass === p);
    if (local) {
        loginAs(local.user, false, {
            fullName: local.user,
            avatar: "https://i.postimg.cc/g0cRLPHz/a4324af6-1492-4782-b7b6-db9eeb0833bf-2-removebg-preview.png",
            job: "Mieszkaniec",
            balance: "0$",
            bankAcc: "NIEAKTYWNE"
        });
        return;
    }

    alert("BŁĄD AUTORYZACJI: Nieprawidłowe dane dostępu.");
}

function loginAs(name, isAdmin, profile) {
    document.getElementById('user-header').innerText = name;
    document.getElementById('nav-login').classList.add('hidden');
    document.getElementById('nav-logout').classList.remove('hidden');

    if (isAdmin) document.getElementById('nav-admin-panel').classList.remove('hidden');

    if (profile) {
        document.getElementById('btn-profile').classList.remove('hidden');
        document.getElementById('p-avatar').src = profile.avatar;
        document.getElementById('p-name').innerText = profile.fullName;
        document.getElementById('p-job').innerText = profile.job;
        document.getElementById('p-balance').innerText = profile.balance;
        document.getElementById('p-bankAcc').innerText = profile.bankAcc;
        navigateTo('profile');
    } else {
        navigateTo('home');
    }
}

// Zarządzanie Lokalną Bazą
function renderDBList() {
    const list = document.getElementById('db-user-list');
    if(!list) return;
    list.innerHTML = localAccounts.map((acc, idx) => `
        <div class="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5">
            <div>
                <p class="text-white font-bold text-sm uppercase italic">${acc.user}</p>
                <p class="text-dim text-[10px] tracking-widest font-mono">HASŁO: ${acc.pass}</p>
            </div>
            <button onclick="removeUser(${idx})" class="text-red-500 hover:text-white transition font-black text-xs">USUŃ</button>
        </div>
    `).join('');
}

function addUserToDB() {
    const u = document.getElementById('db-new-user').value;
    const p = document.getElementById('db-new-pass').value;
    if(!u || !p) return alert("Uzupełnij wszystkie pola!");
    
    localAccounts.push({user: u, pass: p});
    localStorage.setItem('prime_sys_accounts_v29', JSON.stringify(localAccounts));
    renderDBList();
    
    document.getElementById('db-new-user').value = "";
    document.getElementById('db-new-pass').value = "";
    alert("DODANO: Nowy profil został zarejestrowany w systemie.");
}

function removeUser(idx) {
    localAccounts.splice(idx, 1);
    localStorage.setItem('prime_sys_accounts_v29', JSON.stringify(localAccounts));
    renderDBList();
}

function submitReport() {
    const s = document.getElementById('rep-subject').value;
    const b = document.getElementById('rep-body').value;
    if(!s || !b) return alert("Zgłoszenie musi posiadać temat i treść!");
    alert("TICKET PRZYJĘTY: Otrzymasz powiadomienie po rozpatrzeniu zgłoszenia.");
    document.getElementById('rep-subject').value = "";
    document.getElementById('rep-body').value = "";
}
