let localAccounts = JSON.parse(localStorage.getItem('prime_sys_accounts_v29')) || [];
let activeStaffTarget = "";

// Zegar cyfrowy
setInterval(() => {
    document.getElementById('digital-clock').innerText = new Date().toLocaleString('pl-PL');
}, 1000);

// Inicjalizacja listy administracji
window.onload = () => {
    const list = document.getElementById('staff-render-list');
    list.innerHTML = staffDatabase.map(s => `
        <div class="glass-card text-center cursor-pointer hover:scale-105 transition" onclick="openStaffModal('${s.name}', '${s.role}', '${s.img}')">
            <img src="${s.img}" class="staff-avatar">
            <h4 class="font-bold text-sm uppercase">${s.name}</h4>
            <p class="text-yellow-400 text-[10px] font-bold uppercase">${s.role}</p>
        </div>
    `).join('');
    renderDBList();
};

function navigateTo(tabId, element) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    if(element) element.classList.add('active');
}

function openMapData(t, d, i) {
    document.getElementById('m-info-title').innerText = t;
    document.getElementById('m-info-desc').innerText = d;
    document.getElementById('m-info-img').src = i;
    document.getElementById('modal-map').style.display = 'flex';
}

function openStaffModal(n, r, i) {
    activeStaffTarget = n;
    document.getElementById('s-info-name').innerText = n;
    document.getElementById('s-info-role').innerText = r;
    document.getElementById('s-info-img').src = i;
    document.getElementById('modal-staff').style.display = 'flex';
}

// Logowanie
function tryLogin() {
    const u = document.getElementById('auth-user').value;
    const p = document.getElementById('auth-pass').value;

    if(u === 'admin' && p === '1234') {
        loginAs("ADMINISTRATOR", true, null);
    } else {
        const cit = citizenDatabase.find(c => c.user === u && c.pass === p);
        if(cit) loginAs(cit.user, false, cit.profile);
        else {
            const loc = localAccounts.find(a => a.user === u && a.pass === p);
            if(loc) loginAs(u, false, null);
            else alert("Błędne dane!");
        }
    }
}

function loginAs(name, isAdmin, profile) {
    document.getElementById('user-header').innerText = name;
    document.getElementById('nav-login').classList.add('hidden');
    document.getElementById('nav-logout').classList.remove('hidden');
    if(isAdmin) document.getElementById('nav-admin-panel').classList.remove('hidden');
    
    if(profile) {
        document.getElementById('btn-profile').classList.remove('hidden');
        document.getElementById('p-avatar').src = profile.avatar;
        document.getElementById('p-name').innerText = profile.fullName;
        document.getElementById('p-job').innerText = profile.job;
        document.getElementById('p-balance').innerText = profile.balance;
        document.getElementById('p-bankAcc').innerText = profile.bankAcc;
        navigateTo('profile', document.getElementById('btn-profile'));
    } else navigateTo('home', document.getElementById('btn-home'));
}

// Webhooki
async function sendStaffMessage() {
    const msg = document.getElementById('s-msg-content').value;
    const url = "https://discord.com/api/webhooks/1490902802837274664/OmoHB4CdSWIR4xhVowSCB-ZOakiUI83_ofFk8oJOl0R9iy5JAjrBGGcy8zNg4zWwz-x8";
    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: `📩 Wiadomość do ${activeStaffTarget}: ${msg}`})
    });
    alert("Wysłano!");
    document.getElementById('modal-staff').style.display = 'none';
}

async function submitReport() {
    const s = document.getElementById('rep-subject').value;
    const b = document.getElementById('rep-body').value;
    const url = "https://discord.com/api/webhooks/1490516856711155815/Chia9TI7kopiEG7Vnbm2l77iWIEA38lG6zcFmB-IBSl0KXlo3uBIoW6FtkmgLX3BFzzx";
    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: `🚨 RAPORT: ${s}\nOpis: ${b}`})
    });
    alert("Zgłoszono!");
}

// Zarządzanie bazą
function renderDBList() {
    const list = document.getElementById('db-user-list');
    list.innerHTML = localAccounts.map((acc, idx) => `
        <div class="glass-card flex justify-between mb-2">
            <span>${acc.user}</span>
            <button onclick="removeUser(${idx})" class="text-red-500 font-bold">USUŃ</button>
        </div>
    `).join('');
}

function addUserToDB() {
    const u = document.getElementById('db-new-user').value;
    const p = document.getElementById('db-new-pass').value;
    if(!u || !p) return;
    localAccounts.push({user: u, pass: p});
    localStorage.setItem('prime_sys_accounts_v29', JSON.stringify(localAccounts));
    renderDBList();
}

function removeUser(idx) {
    localAccounts.splice(idx, 1);
    localStorage.setItem('prime_sys_accounts_v29', JSON.stringify(localAccounts));
    renderDBList();
}
