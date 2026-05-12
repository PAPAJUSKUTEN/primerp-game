// ============================================================
//  FIFH CLAN — APLIKACJA JS
// ============================================================

let currentUser = null;
let memberFilter = 'all';

// ============ INIT ============
window.addEventListener('DOMContentLoaded', () => {
  createParticles();
  renderNews();
  renderMembers();
  renderLeaders();
  checkScroll();
  window.addEventListener('scroll', checkScroll);
});

// ============ SCROLL ============
function checkScroll() {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}

// ============ NAVIGATION ============
function showSection(id) {
  // Panel wymaga logowania
  if (id === 'panel' && !currentUser) {
    openLogin();
    return;
  }
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const link = document.querySelector(`.nav-link[onclick*="'${id}'"]`);
  if (link) link.classList.add('active');
  window.scrollTo(0, 0);
  // Zamknij menu mobile
  document.getElementById('navbar').querySelector('.nav-links').classList.remove('open');

  if (id === 'panel' && currentUser) renderPanel();
}

function requireLogin(section) {
  if (!currentUser) { openLogin(); return; }
  showSection(section);
}

function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// ============ LOGIN ============
function openLogin() {
  document.getElementById('loginOverlay').classList.remove('hidden');
  document.getElementById('loginError').classList.add('hidden');
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

function closeLogin() {
  document.getElementById('loginOverlay').classList.add('hidden');
}

function doLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  const account = ACCOUNTS.find(a => a.username === user && a.password === pass);
  if (account) {
    currentUser = account;
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('btnLogin').classList.add('hidden');
    const badge = document.getElementById('userBadge');
    badge.classList.remove('hidden');
    document.getElementById('userBadgeName').textContent = '🐾 ' + account.username;
    showSection('panel');
  } else {
    document.getElementById('loginError').classList.remove('hidden');
  }
}

function doLogout() {
  currentUser = null;
  document.getElementById('btnLogin').classList.remove('hidden');
  document.getElementById('userBadge').classList.add('hidden');
  showSection('home');
}

// Enter to login
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !document.getElementById('loginOverlay').classList.contains('hidden')) doLogin();
});

// ============ PARTICLES ============
function createParticles() {
  const container = document.getElementById('particles');
  const emojis = ['🐱','🦊','🐼','🦄','⭐','💎','🔮','✨','🌟','🐉'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 20 + 10;
    p.style.cssText = `
      left: ${Math.random()*100}%;
      width: ${size}px; height: ${size}px;
      animation-duration: ${Math.random()*15+8}s;
      animation-delay: ${Math.random()*10}s;
      font-size: ${size}px;
      background: transparent;
    `;
    p.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    container.appendChild(p);
  }
}

// ============ NEWS ============
function renderNews() {
  const grid = document.getElementById('newsGrid');
  grid.innerHTML = NEWS.map(n => `
    <div class="news-card">
      <div class="news-img" style="background:${n.color}">${n.emoji}</div>
      <div class="news-body">
        <span class="news-tag ${n.tag}">${n.tagLabel}</span>
        <div class="news-title">${n.title}</div>
        <div class="news-desc">${n.desc}</div>
        <div class="news-date">📅 ${n.date}</div>
      </div>
    </div>
  `).join('');
}

// ============ MEMBERS ============
function renderMembers(list) {
  const grid = document.getElementById('membersGrid');
  const data = list || MEMBERS;
  grid.innerHTML = data.map(m => `
    <div class="member-card" onclick="openMemberModal(${m.id})" data-role="${m.role}">
      <img class="member-avatar" src="${m.avatar}" alt="${m.name}" onerror="this.src='https://api.dicebear.com/9.x/adventurer/svg?seed=${m.name}'">
      <div class="member-info">
        <div class="member-name">${m.name}</div>
        <span class="member-role-badge role-${m.role.replace(' ','-')}">${roleIcon(m.role)} ${m.role}</span>
        <div class="member-dc">💬 ${m.dcName}</div>
        <button class="member-dc-btn" onclick="event.stopPropagation();copyDC('${m.dcName}')">📋 Kopiuj Discord</button>
      </div>
    </div>
  `).join('');
}

function filterMembers() {
  const q = document.getElementById('memberSearch').value.toLowerCase();
  let list = MEMBERS.filter(m => m.name.toLowerCase().includes(q) || m.dcName.toLowerCase().includes(q));
  if (memberFilter !== 'all') list = list.filter(m => m.role === memberFilter);
  renderMembers(list);
}

function filterByRole(role, btn) {
  memberFilter = role;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  filterMembers();
}

// ============ LEADERS ROW ============
function renderLeaders() {
  const leaders = MEMBERS.filter(m => m.role === 'Leader' || m.role === 'Co-Leader');
  document.getElementById('leadersRow').innerHTML = leaders.map(m => `
    <div class="leader-card" onclick="showSection('members');setTimeout(()=>openMemberModal(${m.id}),300)">
      <img class="leader-avatar" src="${m.avatar}" alt="${m.name}" onerror="this.src='https://api.dicebear.com/9.x/adventurer/svg?seed=${m.name}'">
      <div class="leader-name">${m.name}</div>
      <div class="leader-role">${roleIcon(m.role)} ${m.role}</div>
    </div>
  `).join('');
}

// ============ MEMBER MODAL ============
function openMemberModal(id) {
  const m = MEMBERS.find(x => x.id === id);
  if (!m) return;
  document.getElementById('modalContent').innerHTML = `
    <img class="modal-avatar" src="${m.avatar}" alt="${m.name}" onerror="this.src='https://api.dicebear.com/9.x/adventurer/svg?seed=${m.name}'">
    <div class="modal-name">${m.name}</div>
    <div class="modal-roles">
      <span class="member-role-badge role-${m.role.replace(' ','-')}">${roleIcon(m.role)} PS99: ${m.role}</span>
      <span class="member-role-badge" style="background:linear-gradient(135deg,#5865f2,#7289da);color:white;">💬 DC: ${m.dcRole}</span>
    </div>
    <div class="modal-info-grid">
      <div class="modal-info-row">
        <label>💬 Discord</label>
        <span>${m.dcName}</span>
      </div>
      <div class="modal-info-row">
        <label>📅 W klanie od</label>
        <span>${m.joined}</span>
      </div>
      <div class="modal-info-row">
        <label>⚡ Poziom PS99</label>
        <span>${m.ps99Level}</span>
      </div>
      <div class="modal-info-row">
        <label>🐾 Liczba Petów</label>
        <span>${m.pets}</span>
      </div>
      <div class="modal-info-row">
        <label>💎 Gemsas</label>
        <span>${m.gems}</span>
      </div>
      <div class="modal-info-row">
        <label>📝 Bio</label>
        <span>${m.bio}</span>
      </div>
    </div>
    <button class="modal-dc-btn" onclick="copyDC('${m.dcName}')">💬 Kopiuj Discord: ${m.dcName}</button>
  `;
  document.getElementById('memberModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('memberModal').classList.add('hidden');
  document.body.style.overflow = '';
}

// ============ PANEL ============
let panelTab = 'profile';

function renderPanel() {
  if (!currentUser) return;
  const member = MEMBERS.find(m => m.id === currentUser.id);

  document.getElementById('panelContent').innerHTML = `
    <div class="panel-tabs">
      <button class="panel-tab ${panelTab==='profile'?'active':''}" onclick="switchPanelTab('profile')">🐾 Profil</button>
      <button class="panel-tab ${panelTab==='donations'?'active':''}" onclick="switchPanelTab('donations')">💎 Darowizny</button>
      <button class="panel-tab ${panelTab==='missions'?'active':''}" onclick="switchPanelTab('missions')">🎯 Misje</button>
      <button class="panel-tab ${panelTab==='trade'?'active':''}" onclick="switchPanelTab('trade')">🤝 Handel</button>
      <button class="panel-tab ${panelTab==='board'?'active':''}" onclick="switchPanelTab('board')">📋 Tablica</button>
      <button class="panel-tab ${panelTab==='ranking'?'active':''}" onclick="switchPanelTab('ranking')">🏆 Ranking</button>
    </div>
    <div id="panelTabContent"></div>
  `;

  renderPanelTab(member);
}

function switchPanelTab(tab) {
  panelTab = tab;
  const member = MEMBERS.find(m => m.id === currentUser.id);
  document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel-tab').forEach(t => { if(t.textContent.toLowerCase().includes(tab==='profile'?'profil':tab==='donations'?'darowizny':tab==='missions'?'misje':tab==='trade'?'handel':tab==='board'?'tablica':'ranking')) t.classList.add('active'); });
  renderPanelTab(member);
}

function renderPanelTab(member) {
  const cont = document.getElementById('panelTabContent');
  if (!member) {
    cont.innerHTML = `<div class="panel-locked"><div class="lock-icon">🐾</div><h2>Witaj, ${currentUser.username}!</h2><p>Twój profil jest w trakcie konfiguracji.</p></div>`;
    return;
  }

  if (panelTab === 'profile') {
    cont.innerHTML = `
      <div class="panel-profile">
        <img class="panel-avatar" src="${member.avatar}" alt="${member.name}" onerror="this.src='https://api.dicebear.com/9.x/adventurer/svg?seed=${member.name}'">
        <div class="panel-info">
          <h2>${member.name}</h2>
          <span class="member-role-badge role-${member.role.replace(' ','-')}">${roleIcon(member.role)} ${member.role}</span>
          <p style="color:var(--text2);margin-top:8px;">${member.bio}</p>
          <p style="margin-top:8px;font-size:0.9rem;">📅 Dołączył/a: <strong>${member.joined}</strong> &nbsp;|&nbsp; 💬 <strong>${member.dcName}</strong></p>
        </div>
      </div>
      <div class="panel-stats">
        <div class="panel-stat"><div class="panel-stat-icon">⚡</div><div class="panel-stat-val">${member.ps99Level}</div><div class="panel-stat-lbl">Poziom PS99</div></div>
        <div class="panel-stat"><div class="panel-stat-icon">🐾</div><div class="panel-stat-val">${member.pets}</div><div class="panel-stat-lbl">Liczba Petów</div></div>
        <div class="panel-stat"><div class="panel-stat-icon">💎</div><div class="panel-stat-val">${member.gems}</div><div class="panel-stat-lbl">Gemsas</div></div>
        <div class="panel-stat"><div class="panel-stat-icon">🎁</div><div class="panel-stat-val">${currentUser.donations.gems}</div><div class="panel-stat-lbl">Darowizny (Gems)</div></div>
      </div>
      <div class="panel-clan-info">
        <h3>🏰 Informacje o Klanie FIFH</h3>
        <div class="clan-info-list">
          <div class="clan-info-item"><label>🏆 Nazwa Klanu</label><span>FIFH</span></div>
          <div class="clan-info-item"><label>👥 Liczba Członków</label><span>75 / 75</span></div>
          <div class="clan-info-item"><label>⭐ Ranga Klanu</label><span>Elite</span></div>
          <div class="clan-info-item"><label>🎮 Gra</label><span>Pet Simulator 99</span></div>
          <div class="clan-info-item"><label>💬 Discord</label><span>discord.gg/fifh</span></div>
          <div class="clan-info-item"><label>📅 Data Założenia</label><span>01.01.2024</span></div>
          <div class="clan-info-item"><label>🌍 Region</label><span>Europa / Global</span></div>
          <div class="clan-info-item"><label>📊 Twoja Rola DC</label><span>${member.dcRole}</span></div>
        </div>
      </div>
    `;
  }

  else if (panelTab === 'donations') {
    const don = currentUser.donations;
    const histRows = don.history.map(h => `
      <div class="don-history-row">
        <span class="don-date">📅 ${h.date}</span>
        <span class="don-gems">💎 ${h.gems}</span>
        <span class="don-note">${h.note}</span>
      </div>
    `).join('');
    cont.innerHTML = `
      <div class="panel-donations">
        <div class="don-hero">
          <div class="don-icon">💎</div>
          <div class="don-total-label">Łączne Darowizny Gemów</div>
          <div class="don-total-val">${don.gems}</div>
          <div class="don-rank-badge">${getDonationRank(don.gems)}</div>
        </div>
        <div class="don-stats-row">
          <div class="don-stat"><div class="don-stat-icon">🏅</div><div class="don-stat-val">${don.history.length}</div><div class="don-stat-lbl">Łączne wpłaty</div></div>
          <div class="don-stat"><div class="don-stat-icon">📅</div><div class="don-stat-val">${don.history[0]?.date || '—'}</div><div class="don-stat-lbl">Ostatnia darowizna</div></div>
          <div class="don-stat"><div class="don-stat-icon">⭐</div><div class="don-stat-val">${getDonationRankLabel(don.gems)}</div><div class="don-stat-lbl">Status</div></div>
        </div>
        <div class="don-history">
          <h3>📜 Historia Darowizn</h3>
          ${histRows}
        </div>
        <div class="don-info-box">
          <div class="don-info-icon">ℹ️</div>
          <div>Darowizny to gemsasy przekazane przez Ciebie na rzecz klanu FIFH w czasie eventów, turniejów i farm session. Dziękujemy za wsparcie!</div>
        </div>
      </div>
    `;
  }

  else if (panelTab === 'missions') {
    const lvl = member.ps99Level;
    const missions = [
      { icon:'⭐', name:'Dzienny Login', desc:'Zaloguj się do gry dzisiaj', reward:'500K Gems', done: true },
      { icon:'🐾', name:'Zbierz 100 Petów', desc:`Postęp: ${Math.min(member.pets,100)}/100`, reward:'2M Gems', done: member.pets >= 100 },
      { icon:'💎', name:'Farm Gems Session', desc:'Weź udział w dzisiejszej sesji farmowania', reward:'5M Gems', done: lvl > 500 },
      { icon:'🤝', name:'Pomóż Członkowi', desc:'Pomóż innemu członkowi klanu w farmie', reward:'1M Gems + Odznaka', done: false },
      { icon:'🏆', name:'Top 10 Rankingu', desc:'Znajdź się w Top 10 tygodniowego rankingu', reward:'10M Gems + Tytuł', done: false },
      { icon:'🎯', name:'Ukończ Clan Quest', desc:'Weź udział w tygodniowym Clan Quest', reward:'8M Gems', done: lvl > 800 },
      { icon:'🐉', name:'Zdobądź Rare Peta', desc:'Zdobądź co najmniej 1 rare peta w tym tygodniu', reward:'3M Gems', done: member.pets > 200 },
      { icon:'📣', name:'Zaproś Znajomego', desc:'Zaproś nową osobę na Discord klanu', reward:'Specjalna Odznaka', done: false },
    ];
    const rows = missions.map(m => `
      <div class="mission-card ${m.done?'done':''}">
        <div class="mission-icon">${m.icon}</div>
        <div class="mission-body">
          <div class="mission-name">${m.name}</div>
          <div class="mission-desc">${m.desc}</div>
          <div class="mission-reward">🎁 Nagroda: <strong>${m.reward}</strong></div>
        </div>
        <div class="mission-status">${m.done ? '✅ Ukończono' : '⏳ W toku'}</div>
      </div>
    `).join('');
    const done = missions.filter(m=>m.done).length;
    cont.innerHTML = `
      <div class="panel-missions">
        <div class="missions-header">
          <h2>🎯 Misje Klanu</h2>
          <div class="missions-progress-bar-wrap">
            <div class="missions-progress-bar" style="width:${Math.round(done/missions.length*100)}%"></div>
          </div>
          <div class="missions-progress-text">${done} / ${missions.length} ukończonych</div>
        </div>
        <div class="missions-list">${rows}</div>
      </div>
    `;
  }

  else if (panelTab === 'trade') {
    cont.innerHTML = `
      <div class="panel-trade">
        <h2>🤝 Tablica Handlu</h2>
        <p class="trade-sub">Oferty wymiany gemów i petów między członkami klanu FIFH</p>
        <div class="trade-grid">
          ${TRADE_OFFERS.map(o => `
            <div class="trade-card">
              <div class="trade-header">
                <span class="trade-type type-${o.type}">${o.type === 'sell' ? '🟢 Sprzedaję' : '🔵 Kupuję'}</span>
                <span class="trade-user">👤 ${o.user}</span>
              </div>
              <div class="trade-item">${o.item}</div>
              <div class="trade-price">💎 ${o.price}</div>
              <div class="trade-note">${o.note}</div>
              <button class="trade-contact-btn" onclick="copyDC('${o.dc}')">💬 Skontaktuj się: ${o.dc}</button>
            </div>
          `).join('')}
        </div>
        <div class="trade-add-box">
          <div class="trade-add-icon">➕</div>
          <div>Chcesz dodać ofertę? Napisz na kanale #handel na Discordzie klanu!</div>
        </div>
      </div>
    `;
  }

  else if (panelTab === 'board') {
    cont.innerHTML = `
      <div class="panel-board">
        <h2>📋 Tablica Ogłoszeń</h2>
        <p class="board-sub">Oficjalne komunikaty dla członków klanu FIFH</p>
        <div class="board-list">
          ${ANNOUNCEMENTS.map(a => `
            <div class="board-card prio-${a.priority}">
              <div class="board-card-header">
                <span class="board-emoji">${a.emoji}</span>
                <div>
                  <div class="board-title">${a.title}</div>
                  <div class="board-meta">📅 ${a.date} &nbsp;|&nbsp; ✍️ ${a.author}</div>
                </div>
                <span class="board-prio ${a.priority}">${a.priority === 'high' ? '🔴 Ważne' : a.priority === 'medium' ? '🟡 Średnie' : '🟢 Info'}</span>
              </div>
              <div class="board-body">${a.body}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  else if (panelTab === 'ranking') {
    const sorted = [...MEMBERS].sort((a,b) => b.ps99Level - a.ps99Level).slice(0,10);
    const myRank = [...MEMBERS].sort((a,b) => b.ps99Level - a.ps99Level).findIndex(m=>m.id===member.id)+1;
    cont.innerHTML = `
      <div class="panel-ranking">
        <h2>🏆 Ranking Klanu FIFH</h2>
        <p class="ranking-sub">Top 10 graczy według poziomu PS99</p>
        <div class="ranking-my-badge">Twoja pozycja: <strong>#${myRank}</strong> z 75 członków</div>
        <div class="ranking-list">
          ${sorted.map((m,i) => `
            <div class="ranking-row ${m.id===member.id?'me':''}">
              <div class="rank-pos">${i===0?'🥇':i===1?'🥈':i===2?'🥉':'#'+(i+1)}</div>
              <img class="rank-avatar" src="${m.avatar}" onerror="this.src='https://api.dicebear.com/9.x/adventurer/svg?seed=${m.name}'" alt="${m.name}">
              <div class="rank-info">
                <div class="rank-name">${m.name} ${m.id===member.id?'<span class="rank-you">(Ty)</span>':''}</div>
                <div class="rank-role">${roleIcon(m.role)} ${m.role}</div>
              </div>
              <div class="rank-stats">
                <span>⚡ ${m.ps99Level}</span>
                <span>🐾 ${m.pets}</span>
                <span>💎 ${m.gems}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

function getDonationRank(gems) {
  const n = parseFloat(gems);
  const u = gems.slice(-1).toUpperCase();
  const inB = u==='B' ? n : u==='M' ? n/1000 : n/1000000;
  if (inB >= 3) return '💎 Diamond Donor';
  if (inB >= 1) return '🥇 Gold Donor';
  if (inB >= 0.5) return '🥈 Silver Donor';
  if (inB >= 0.1) return '🥉 Bronze Donor';
  return '🌱 New Donor';
}
function getDonationRankLabel(gems) {
  const n = parseFloat(gems);
  const u = gems.slice(-1).toUpperCase();
  const inB = u==='B' ? n : u==='M' ? n/1000 : n/1000000;
  if (inB >= 3) return 'Diamond';
  if (inB >= 1) return 'Gold';
  if (inB >= 0.5) return 'Silver';
  if (inB >= 0.1) return 'Bronze';
  return 'Nowy';
}

// ============ TRADE OFFERS DATA ============
const TRADE_OFFERS = [
  { type:'sell', user:'FuryKing',    item:'🐉 Dragon Emperor (Shiny)', price:'500M Gems', note:'Negocjacje możliwe, szybka sprzedaż!', dc:'furyking#0001' },
  { type:'buy',  user:'NovaStar',    item:'🦄 Unicorn Rainbow (Huge)', price:'200M Gems', note:'Szukam od dłuższego czasu, zapłacę dobrze.', dc:'novastar#0002' },
  { type:'sell', user:'BlazePaw',    item:'🔮 Mystic Gem Bundle x500', price:'50M Gems',  note:'Pakiet gemów magicznych, idealne na leveling.', dc:'blazepaw#0003' },
  { type:'buy',  user:'CrystalGem',  item:'⭐ Huge Lucky Cat',         price:'300M Gems', note:'Pilnie kupię! Napisz na DC.', dc:'crystalgem#0004' },
  { type:'sell', user:'EchoWolf',    item:'🐱 Golden Cat Pack x10',    price:'80M Gems',  note:'Sprzedaję pakiet, cena do negocjacji.', dc:'echowolf#0006' },
  { type:'buy',  user:'FrostBite',   item:'💎 Exclusive Event Pet',    price:'1B Gems',   note:'Szukam limitowanego peta z eventu majowego.', dc:'frostbite#0007' },
];

// ============ ANNOUNCEMENTS DATA ============
const ANNOUNCEMENTS = [
  { emoji:'🚨', priority:'high', title:'Farm Session — DZISIAJ o 18:00!', date:'12.05.2025', author:'FuryKing', body:'Dziś obowiązkowa clan farm session o 18:00 czasu polskiego. Wszyscy aktywni członkowie proszeni o obecność. Spóźnieni mogą stracić punkty aktywności!' },
  { emoji:'🏆', priority:'high', title:'Clan Battle w ten weekend!', date:'10.05.2025', author:'NovaStar', body:'W sobotę i niedzielę startuje tygodniowy Clan Battle. Potrzebujemy 100% frekwencji! Nagrody dla Top 3 to specjalne tytuły i ogromna pula gemów.' },
  { emoji:'📜', priority:'medium', title:'Nowe zasady aktywności', date:'05.05.2025', author:'BlazePaw', body:'Zaktualizowaliśmy regulamin aktywności klanu. Minimalna aktywność to 3 sesje tygodniowo. Nieaktywni powyżej 2 tygodni mogą zostać usunięci z klanu.' },
  { emoji:'🎉', priority:'medium', title:'Gratulacje dla nowych Officerów!', date:'01.05.2025', author:'FuryKing', body:'Witajcie nowych Officerów: GoldenRush i HyperDash awansowali po znakomitych wynikach w Gem Race! Gratulujemy i życzymy dalszych sukcesów.' },
  { emoji:'💬', priority:'low', title:'Nowy kanał na Discordzie: #strategia', date:'28.04.2025', author:'NovaStar', body:'Otworzyliśmy nowy kanał #strategia na Discordzie. Tam możecie dzielić się poradami dotyczącymi farmowania, budowania petów i trade strategii.' },
  { emoji:'ℹ️', priority:'low', title:'Przypomnienie o głosowaniu na nowego Co-Leadera', date:'25.04.2025', author:'FuryKing', body:'Głosowanie na nowego Co-Leadera trwa do 15 maja. Zagłosuj na kanale #wybory na Discordzie. Każdy głos się liczy!' },
];

// ============ HELPERS ============
function roleIcon(role) {
  const icons = { Leader: '👑', 'Co-Leader': '🥇', Officer: '🛡️', Member: '⭐' };
  return icons[role] || '⭐';
}

function copyDC(dc) {
  navigator.clipboard.writeText(dc).then(() => {
    const btn = event.target;
    const orig = btn.textContent;
    btn.textContent = '✅ Skopiowano!';
    setTimeout(() => btn.textContent = orig, 1500);
  }).catch(() => {
    prompt('Skopiuj ręcznie:', dc);
  });
}
