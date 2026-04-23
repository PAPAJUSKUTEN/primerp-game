const tabs = document.querySelectorAll('.tab');
const title = document.getElementById('title');
const desc = document.getElementById('desc');
const extra = document.getElementById('extra');
const loginForm = document.getElementById('loginForm');
const guestView = document.getElementById('guestView');
const profileView = document.getElementById('profileView');
const profileName = document.getElementById('profileName');
const logoutBtn = document.getElementById('logoutBtn');

const accounts = [
  { user: 'test1', pass: 'test1' },
  { user: 'test2', pass: 'test2' }
];

function showGuest() {
  guestView.style.display = 'block';
  profileView.classList.remove('active');
}

function showProfile(username) {
  guestView.style.display = 'none';
  profileView.classList.add('active');
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
      if (!localStorage.getItem('currentUser')) showGuest();
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
  showGuest();
});

window.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) showProfile(currentUser);
});
