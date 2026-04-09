// Zegar
setInterval(() => {
    document.getElementById('digital-clock').innerText = new Date().toLocaleString('pl-PL');
}, 1000);

// Nawigacja
function navigateTo(tabId, element) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    if(element) element.classList.add('active');
}

// Mapa
function openMapData(title, desc, img) {
    document.getElementById('m-info-title').innerText = title;
    document.getElementById('m-info-desc').innerText = desc;
    document.getElementById('m-info-img').src = img;
    document.getElementById('modal-map').style.display = 'flex';
}

// Logowanie
function tryLogin() {
    const u = document.getElementById('auth-user').value;
    const p = document.getElementById('auth-pass').value;

    if(u === 'admin' && p === '1234') {
        loginAs("ADMIN", true, null);
    } else {
        const citizen = citizenDatabase.find(c => c.user === u && c.pass === p);
        if(citizen) loginAs(citizen.user, false, citizen.profile);
        else alert("Błąd logowania!");
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
    } else {
        navigateTo('home', document.getElementById('btn-home'));
    }
}
