// Otwieranie i zamykanie sidebaru
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Przełączanie zakładek
function showTab(tabId, event) {
    // Ukryj wszystkie zakładki
    const tabs = document.getElementsByClassName('tab-content');
    for (let tab of tabs) {
        tab.classList.remove('active');
    }

    // Usuń aktywną klasę z przycisków
    const navItems = document.getElementsByClassName('nav-item');
    for (let item of navItems) {
        item.classList.remove('active');
    }

    // Pokaż wybraną zakładkę
    document.getElementById(tabId).classList.add('active');

    // Dodaj aktywną klasę do klikniętego elementu
    event.currentTarget.classList.add('active');

    // Zamknij sidebar po kliknięciu
    toggleSidebar();
}

// Logowanie
function checkPass() {
    const password = document.getElementById('pass').value;
    if (password === "fifh99") {
        alert("Witaj w FIFH! Dostęp przyznany.");
    } else {
        alert("Błędne hasło klanowe!");
    }
}
