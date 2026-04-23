const tabs = document.querySelectorAll('.tab');
const title = document.getElementById('title');
const desc = document.getElementById('desc');
const extra = document.getElementById('extra');
const loginForm = document.getElementById('loginForm');
const profileScreen = document.getElementById('profileScreen');
const profileName = document.getElementById('profileName');
const logoutBtn = document.getElementById('logoutBtn');

const accounts = [
  { user: 'test1', pass: 'test1' },
  { user: 'test2', pass: 'test2' }
];

function showApp() {
  document.getElementById('app').style.display = 'block';
  profileScreen.classList.remove('active');
}

function showProfile(username) {
  document.getElementById('app').style.display = 'none';
  profileScreen.classList.add('active');
  profileName.textContent = username;
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    title.textContent = tab.dataset.title;
    desc.textContent = tab.dataset.desc;
    extra.textContent = tab.dataset.extra;

    if (tab.dataset.login === 'true') {
      loginForm.classList.add('active');
    } else {
      loginForm.classList.remove('active');
    }
  });
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  const found = accounts.find(acc => acc.user === user && acc.pass === pass);

  if (found) {
    localStorage.setItem('currentUser', found.user);
    showProfile(found.user);
  } else {
    alert('Błędny login lub hasło');
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  showApp();
});

window.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) showProfile(currentUser);
});
