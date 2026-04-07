const staffData = [
    { name: "! KUBA", role: "Owner / Lead Dev", desc: "Twórca systemów PrimeRP.", img: "https://i.postimg.cc/KjvhBywK/image-14.jpg" },
    { name: "KAMIL", role: "Co-Owner", desc: "Zarządzanie projektem.", img: "https://i.postimg.cc/KjvhBywK/image-14.jpg" },
    { name: "VIPER", role: "Dev Support", desc: "Wsparcie bazy danych.", img: "https://i.postimg.cc/KjvhBywK/image-14.jpg" }
];

let usersInDatabase = {};

// 1. Słuchacz Bazy
db.ref('users').on('value', (snapshot) => {
    usersInDatabase = snapshot.val() || {};
    renderDBUsers();
});

// 2. Renderowanie kont
function renderDBUsers() {
    const list = document.getElementById('dbUserList');
    if(!list) return;
    list.innerHTML = Object.keys(usersInDatabase).map(id => `
        <div class="flex justify-between items-center bg-zinc-900 p-3 rounded-lg border border-zinc-800">
            <span class="font-bold text-yellow-500">${usersInDatabase[id].user}</span>
            <button onclick="dbDeleteUser('${id}')" class="text-red-500 text-xs font-bold">USUŃ</button>
        </div>
    `).join('');
}

// 3. Zarządzanie bazą
function dbAddUser() {
    const u = document.getElementById('dbUser').value;
    const p = document.getElementById('dbPass').value;
    if(!u || !p) return alert("Pola nie mogą być puste!");
    db.ref('users').push({ user: u, pass: p });
    document.getElementById('dbUser').value = "";
    document.getElementById('dbPass').value = "";
}

function dbDeleteUser(id) {
    if(confirm("Usunąć konto?")) db.ref('users/' + id).remove();
}

// 4. Logowanie
function handleLogin() {
    const l = document.getElementById('authLogin').value;
    const p = document.getElementById('authPass').value;
    
    if(l === 'admin' && p === '1234') return loginSuccess("ADMINISTRATOR", true);
    
    const usersArray = Object.values(usersInDatabase);
    const found = usersArray.find(u => u.user === l && u.pass === p);
    
    if(found) loginSuccess(found.user, false);
    else alert("Błędne dane!");
}

function loginSuccess(name, isAdmin) {
    document.getElementById('userNameDisplay').innerText = name;
    document.getElementById('loginNav').classList.add('hidden');
    document.getElementById('logoutNav').classList.remove('hidden');
    if(isAdmin) document.getElementById('adminPanelLink').classList.remove('hidden');
    switchTab('home', document.querySelector('.nav-item'));
}

// 5. Nawigacja
function switchTab(id, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(el) el.classList.add('active');
}

// 6. Staff & Modal
function renderStaff() {
    const container = document.getElementById('staffContainer');
    if(!container) return;
    container.innerHTML = staffData.map(s => `
        <div class="admin-card" onclick="openModal('${s.name}', '${s.role}', '${s.img}', '${s.desc}')">
            <div class="avatar-box"><img src="${s.img}"></div>
            <div class="font-bold uppercase italic">${s.name}</div>
            <div class="text-[10px] text-yellow-500 font-bold">${s.role}</div>
        </div>
    `).join('');
}

function openModal(n, r, i, d) {
    document.getElementById('mName').innerText = n;
    document.getElementById('mRole').innerText = r;
    document.getElementById('mImg').src = i;
    document.getElementById('mDesc').innerText = d;
    document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() { document.getElementById('modalOverlay').style.display = 'none'; }

// 7. Discord Webhook
async function submitReport() {
    const t = document.getElementById('reportTitle').value;
    const c = document.getElementById('reportContent').value;
    if(!t || !c) return alert("Uzupełnij zgłoszenie!");
    const url = "https://discord.com/api/webhooks/1490516856711155815/Chia9TI7kopiEG7Vnbm2l77iWIEA38lG6zcFmB-IBSl0KXlo3uBIoW6FtkmgLX3BFzzx";
    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ content: `🚨 **NOWE ZGŁOSZENIE**\n**Od:** ${document.getElementById('userNameDisplay').innerText}\n**Temat:** ${t}\n**Opis:** ${c}` })
    });
    alert("Zgłoszenie wysłane!");
}

function userLogout() { window.location.reload(); }

window.onload = () => {
    renderStaff();
    setInterval(() => {
        document.getElementById('liveDate').innerText = new Date().toLocaleString();
    }, 1000);
};
