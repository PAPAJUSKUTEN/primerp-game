const tabs = document.querySelectorAll('.tab');
const title = document.getElementById('title');
const desc = document.getElementById('desc');
const extra = document.getElementById('extra');
const loginForm = document.getElementById('loginForm');
const statusEl = document.getElementById('status');

const accounts = [
  { user: 'test1', pass: 'test1' },
  { user: 'test2', pass: 'test2' }
];

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    title.textContent = tab.dataset.title;
    desc.textContent = tab.dataset.desc;
    extra.textContent = tab.dataset.extra;
    statusEl.textContent = '';
    statusEl.className = 'status';

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
    statusEl.textContent = `Zalogowano jako ${found.user}`;
    statusEl.className = 'status ok';
  } else {
    statusEl.textContent = 'Błędny login lub hasło';
    statusEl.className = 'status bad';
  }
});
