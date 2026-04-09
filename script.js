function startDigitalClock() {
    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('pl-PL');
        const clockElement = document.getElementById('digital-clock');
        if(clockElement) clockElement.innerText = timeString;
    }, 1000);
}

function navigateTo(tabId, element) {
    // Ukryj wszystkie panele
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    // Odznacz wszystkie linki
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    // Pokaż wybrany
    const target = document.getElementById(tabId);
    if(target) target.classList.add('active');
    if(element) element.classList.add('active');
}

function renderStaff() {
    const list = document.getElementById('staff-render-list');
    if(!list) return;
    
    list.innerHTML = staffDatabase.map(s => `
        <div class="glass-card text-center">
            <img src="${s.img}" class="staff-avatar" alt="${s.name}">
            <h4 class="font-black uppercase italic">${s.name}</h4>
            <p class="text-yellow-400 text-xs font-bold uppercase tracking-widest">${s.role}</p>
        </div>
    `).join('');
}

window.onload = () => {
    startDigitalClock();
    renderStaff();
};
