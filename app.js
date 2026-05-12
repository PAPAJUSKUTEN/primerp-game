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
function renderPanel() {
  if (!currentUser) return;
  const member = MEMBERS.find(m => m.id === currentUser.id);
  if (!member) {
    document.getElementById('panelContent').innerHTML = `<div class="panel-locked"><div class="lock-icon">🐾</div><h2>Witaj, ${currentUser.username}!</h2><p>Twój profil jest w trakcie konfiguracji.</p></div>`;
    return;
  }

  document.getElementById('panelContent').innerHTML = `
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
      <div class="panel-stat">
        <div class="panel-stat-icon">⚡</div>
        <div class="panel-stat-val">${member.ps99Level}</div>
        <div class="panel-stat-lbl">Poziom PS99</div>
      </div>
      <div class="panel-stat">
        <div class="panel-stat-icon">🐾</div>
        <div class="panel-stat-val">${member.pets}</div>
        <div class="panel-stat-lbl">Liczba Petów</div>
      </div>
      <div class="panel-stat">
        <div class="panel-stat-icon">💎</div>
        <div class="panel-stat-val">${member.gems}</div>
        <div class="panel-stat-lbl">Gemsas</div>
      </div>
    </div>

    <div class="panel-clan-info">
      <h3>🏰 Informacje o Klanie FIFH</h3>
      <div class="clan-info-list">
        <div class="clan-info-item"><label>🏆 Nazwa Klanu</label><span>FIFH</span></div>
        <div class="clan-info-item"><label>👥 Liczba Członków</label><span>75 / 75</span></div>
        <div class="clan-info-item"><label>⭐ Ranga Klanu</label><span>Elite</span></div>
        <div class="clan-info-item"><label>🎮 Gra</label><span>Pet Simulator 99</span></div>
        <div class="clan-info-item"><label>💬 Discord</label><span>discord.gg/fifh (podmień)</span></div>
        <div class="clan-info-item"><label>📅 Data Założenia</label><span>01.01.2024</span></div>
        <div class="clan-info-item"><label>🌍 Region</label><span>Europa / Global</span></div>
        <div class="clan-info-item"><label>📊 Twoja Rola DC</label><span>${member.dcRole}</span></div>
      </div>
    </div>
  `;
}

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

// ============ RECRUITMENT ============
const WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1503873692151713823/aiA8n5Bdg2khRRG_ujPjF3DwRx1H-At6aidtNmXJlSnAJQdJ__htz2IF8JSOvXzFXJ8p';

let recruitFile = null;

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) {
    showRecruitStatus('❌ Plik jest za duży! Maksymalny rozmiar to 8MB.', 'error');
    return;
  }
  recruitFile = file;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('filePreviewImg').src = ev.target.result;
    document.getElementById('filePreview').classList.remove('hidden');
    document.getElementById('fileDropArea').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

// Drag & drop support
window.addEventListener('DOMContentLoaded', () => {
  const area = document.getElementById('fileDropArea');
  if (!area) return;
  area.addEventListener('dragover', e => { e.preventDefault(); area.style.background = 'rgba(255,107,53,0.15)'; });
  area.addEventListener('dragleave', () => { area.style.background = ''; });
  area.addEventListener('drop', e => {
    e.preventDefault();
    area.style.background = '';
    const file = e.dataTransfer.files[0];
    if (file) {
      document.getElementById('rScreenshot').files; // trigger
      const dt = new DataTransfer();
      dt.items.add(file);
      document.getElementById('rScreenshot').files = dt.files;
      handleFileSelect({ target: { files: [file] } });
    }
  });
}, { once: false });

function removeFile() {
  recruitFile = null;
  document.getElementById('rScreenshot').value = '';
  document.getElementById('filePreview').classList.add('hidden');
  document.getElementById('fileDropArea').style.display = '';
}

function showRecruitStatus(msg, type) {
  const el = document.getElementById('recruitStatus');
  el.textContent = msg;
  el.className = 'recruit-status ' + type;
  el.classList.remove('hidden');
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

async function submitRecruitment(e) {
  e.preventDefault();

  const btn = document.getElementById('recruitSubmitBtn');
  const btnText = document.getElementById('recruitBtnText');
  btn.disabled = true;
  btnText.textContent = '⏳ Wysyłanie...';

  const rulesEl = document.querySelector('input[name="rRules"]:checked');
  if (!rulesEl) {
    showRecruitStatus('❌ Musisz odpowiedzieć na pytanie o zasady klanu!', 'error');
    btn.disabled = false;
    btnText.textContent = '🚀 Wyślij Aplikację';
    return;
  }

  const data = {
    nick:      document.getElementById('rNick').value.trim(),
    discord:   document.getElementById('rDiscord').value.trim(),
    age:       document.getElementById('rAge').value,
    source:    document.getElementById('rSource').value,
    level:     document.getElementById('rLevel').value,
    pets:      document.getElementById('rPets').value || 'Nie podano',
    gems:      document.getElementById('rGems').value || 'Nie podano',
    rarePet:   document.getElementById('rRarePet').value || 'Nie podano',
    hours:     document.getElementById('rHours').value,
    prevClan:  document.getElementById('rPrevClan').value.trim() || 'Nie podano',
    why:       document.getElementById('rWhy').value.trim(),
    offer:     document.getElementById('rOffer').value.trim(),
    rules:     rulesEl.value,
    timestamp: new Date().toLocaleString('pl-PL'),
  };

  // Build Discord embed
  const embed = {
    title: '🐾 Nowa Aplikacja Rekrutacyjna — FIFH Clan',
    color: 0xff6b35,
    thumbnail: { url: 'https://i.postimg.cc/wM00FXFB/Gemini-Generated-Image-rbsejmrbsejmrbse.png' },
    fields: [
      { name: '👤 Nick Roblox',        value: data.nick,      inline: true },
      { name: '💬 Discord',             value: data.discord,   inline: true },
      { name: '🎂 Wiek',               value: data.age,       inline: true },
      { name: '⚡ Poziom PS99',         value: data.level,     inline: true },
      { name: '🐾 Liczba Petów',        value: data.pets,      inline: true },
      { name: '💎 Gemsas',             value: data.gems,      inline: true },
      { name: '🌟 Najrzadszy Pet',      value: data.rarePet,   inline: true },
      { name: '⏱️ Godziny dziennie',   value: data.hours,     inline: true },
      { name: '📡 Skąd o nas wie',      value: data.source,    inline: true },
      { name: '🏰 Poprzednie Klany',    value: data.prevClan,  inline: false },
      { name: '❓ Dlaczego FIFH?',      value: data.why,       inline: false },
      { name: '🎁 Co wniesie?',         value: data.offer,     inline: false },
      { name: '📜 Zgoda na zasady',     value: data.rules === 'Tak' ? '✅ Tak' : '❌ Nie', inline: true },
    ],
    footer: { text: `Aplikacja złożona: ${data.timestamp} • FIFH Clan Website` },
  };

  try {
    if (recruitFile) {
      // Send with image attachment
      const formData = new FormData();
      formData.append('files[0]', recruitFile, recruitFile.name);
      formData.append('payload_json', JSON.stringify({
        content: `📋 **Nowa aplikacja od ${data.nick}** | Discord: ${data.discord}`,
        embeds: [embed]
      }));
      const res = await fetch(WEBHOOK_URL, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('HTTP ' + res.status);
    } else {
      // Text only
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📋 **Nowa aplikacja od ${data.nick}** | Discord: ${data.discord}`,
          embeds: [embed]
        })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
    }

    // Success
    document.getElementById('recruitFormWrap').classList.add('hidden');
    document.getElementById('recruitSuccess').classList.remove('hidden');
    document.getElementById('recruitStatus').classList.add('hidden');
    window.scrollTo(0, 0);

  } catch (err) {
    showRecruitStatus('❌ Błąd wysyłania! Sprawdź połączenie i spróbuj ponownie. (' + err.message + ')', 'error');
    btn.disabled = false;
    btnText.textContent = '🚀 Wyślij Aplikację';
  }
}

function resetRecruitForm() {
  document.getElementById('recruitForm').reset();
  removeFile();
  document.getElementById('recruitFormWrap').classList.remove('hidden');
  document.getElementById('recruitSuccess').classList.add('hidden');
  document.getElementById('recruitStatus').classList.add('hidden');
}
