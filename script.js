let localAccounts = JSON.parse(localStorage.getItem('prime_sys_accounts_v29')) || [];
let activeStaffTarget = "";

window.onload = () => {
    renderStaffList();
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
    if(element) element.classList.add('active');
}

function renderStaffList() {
    const list = document.getElementById('staff-render-list');
    if(!list) return;
    list.innerHTML = staffDatabase.map(s => `
        <div class="glass-card text-center cursor-pointer" onclick="openStaffProfile('${s.name}', '${s.role}', '${s.img}', '${s.desc}')">
            <img src="${s.img}" class="staff-avatar">
            <h4 class="font-black text-sm uppercase italic">${s.name}</h4>
            <p class="text-yellow-400 text-[10px] font-bold mt-1 uppercase">${s.role}</p>
        </div>
    `).join('');
}

function openStaffProfile(n, r, i, d) {
    activeStaffTarget = n;
    document.getElementById('s-info-name').innerText = n;
    document.getElementById('modal-staff').style.display = 'flex';
}

function tryLogin() {
    const u = document.getElementById('auth-user').value;
    const p = document.getElementById('auth-pass').value;

    if(u === 'admin' && p === '1234') { 
        loginAs("ADMINISTRATOR", true, null); 
        return;
    }

    const citizen = citizenDatabase.find(c => c.user === u && c.pass === p);
    if(citizen) {
        loginAs(citizen.user, false, citizen.profile);
        return;
    }
    alert("Błędne dane!");
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
        navigateTo('profile');
    } else {
        navigateTo('home');
    }
}

async function submitReport() {
    alert("Zgłoszenie wysłane do bazy danych!");
}
