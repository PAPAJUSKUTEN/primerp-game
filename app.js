document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
        document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
        this.classList.add('active');
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

function copyCode() {
    const code = document.getElementById('promoCode').innerText;
    navigator.clipboard.writeText(code).then(() => {
        // Profesjonalny alert wbudowany w przeglądarkę
        const btn = document.querySelector('.promo-box button');
        btn.innerHTML = '<i class="fas fa-check" style="color: #00ff88"></i>';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    });
}
