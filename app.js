// Przełączanie zakładek po lewej stronie
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        // 1. Usuń aktywną klasę z linków
        document.querySelectorAll('.nav-item').forEach(link => {
            link.classList.remove('active');
        });

        // 2. Ukryj wszystkie sekcje treści
        document.querySelectorAll('.tab-page').forEach(page => {
            page.classList.remove('active');
        });

        // 3. Aktywuj kliknięty link i odpowiednią sekcję
        this.classList.add('active');
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Funkcja kopiowania kodu
function copyCode() {
    const code = "10cap1up";
    navigator.clipboard.writeText(code).then(() => {
        alert("Kod skopiowany: " + code);
    });
}
