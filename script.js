const tabs = document.querySelectorAll('.tab');
const title = document.getElementById('title');
const desc = document.getElementById('desc');
const extra = document.getElementById('extra');
const loginForm = document.getElementById('loginForm');

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
