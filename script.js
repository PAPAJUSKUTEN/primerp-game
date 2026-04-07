const staffData = [
    { name: "! KUBA", role: "Owner / Lead Dev", desc: "Twórca systemów PrimeRP.", img: "https://i.postimg.cc/KjvhBywK/image-14.jpg" },
    { name: "KAMIL", role: "Co-Owner", desc: "Zarządzanie projektem.", img: "https://i.postimg.cc/KjvhBywK/image-14.jpg" },
    { name: "VIPER", role: "Dev Support", desc: "Wsparcie bazy danych.", img: "https://i.postimg.cc/KjvhBywK/image-14.jpg" }
    // Możesz tu dodać resztę z 15 osób
];

let usersInDatabase = {};

// Ładowanie bazy
db.ref('users').on('value', (snapshot) => {
    usersInDatabase = snapshot.val() || {};
    renderDBUsers();
});

function renderDBUsers() {
    const list = document.getElementById('dbUserList');
    if(!list) return;
    list.innerHTML = Object.keys(usersInDatabase).map(id => `
        <div class="flex justify-between items-center bg-black/50 p-3 rounded-xl border border-gray-800">
            <span class="font-bold text-sm text-yellow-500">${usersInDatabase[id].user}</span>
            <button onclick="dbDeleteUser('${id}')" class="text-red-600 text-[10px] font-black uppercase hover:scale-125 transition">Usuń</button>
        </div>
    `).join('');
}

function dbAddUser() {
    const u = document.getElementById('dbUser').value;
    const p = document.getElementById('dbPass').value;
    if(!u || !p) return alert("Uzupełnij pola!");
    db.ref('users').push({ user: u, pass: p });
    document.getElementById('dbUser').value = "";
    document.getElementById('dbPass').value = "";
}

function dbDeleteUser(id) {
    if(confirm("Usunąć na stałe?")) db.ref('users/' + id).remove();
}

function handleLogin() {
    const l = document.getElementById('authLogin').value;
    const p = document.getElementById('authPass').value;
    if(l === 'admin' && p === '1234') return loginSuccess("ADMINISTRATOR", true);
    const found = Object.values(usersInDatabase).find(u => u.user === l && u.pass === p);
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

function switchTab(id, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(el) el.classList.add('active');
}

function renderStaff() {
    const container = document.getElementById('staffContainer');
    if(!container) return;
    container.innerHTML = staffData.map(s => `
        <div class="admin-card" onclick="openModal('${s.name}', '${s.role}', '${s.img}', '${s.desc}')">
            <div class="avatar-box"><img src="${s.img}"></div>
            <div class="admin-name">${s.name}</div>
            <div class="admin-role">${s.role}</div>
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

async function submitReport() {
    const title = document.getElementById('reportTitle').value;
    const content = document.getElementById('reportContent').value;
    if(!title || !content) return alert("Wypełnij pola!");
    const url = "https://discord.com/api/webhooks/1490516856711155815/Chia9TI7kopiEG7Vnbm2l77iWIEA38lG6zcFmB-IBSl0KXlo3uBIoW6FtkmgLX3BFzzx";
    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ content: `🚨 **ZGŁOSZENIE**\n**Od:** ${document.getElementById('userNameDisplay').innerText}\n**Temat:** ${title}\n**Opis:** ${content}` })
    });
    alert("Wysłano!");
}

function updateDate() { 
    const el = document.getElementById('liveDate');
    if(el) el.innerText = new Date().toLocaleString(); 
}

function userLogout() { window.location.reload(); }

window.onload = () => {
    renderStaff();
    setInterval(updateDate, 1000);
};
