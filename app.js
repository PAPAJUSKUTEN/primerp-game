document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        // Usuń klasę active ze wszystkich przycisków
        document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
        
        // Ukryj wszystkie zakładki
        document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));

        // Aktywuj ten konkretny przycisk
        this.classList.add('active');

        // Pokaż cel (Dashboard lub Coming Soon)
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

function copyCode() {
    const code = "10cap1up";
    navigator.clipboard.writeText(code).then(() => {
        alert("Skopiowano kod PrimeRP: " + code);
    });
}
