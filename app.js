function switchTab(tabId) {
    document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[data-target="${tabId}"]`).classList.add('active');
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        switchTab(this.getAttribute('data-target'));
    });
});
