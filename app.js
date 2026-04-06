// Główny system przełączania stron
document.querySelectorAll('.nav-item').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        // 1. Zmień aktywny przycisk w menu
        document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // 2. Schowaj wszystkie sekcje treści
        document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));

        // 3. Pokaż sekcję na podstawie data-target
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Funkcja kopiowania kodu promocyjnego
function copyCode() {
    const code = document.getElementById('promoCode').innerText;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.copy-box button');
        const icon = btn.innerHTML;
        
        // Zmiana ikony na check po skopiowaniu
        btn.innerHTML = '<i class="fas fa-check" style="color: #00ff88"></i>';
        
        setTimeout(() => {
            btn.innerHTML = icon;
        }, 2000);
    });
}
