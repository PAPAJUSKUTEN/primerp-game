// Funkcja otwierająca/zamykająca okno logowania
function toggleModal(isVisible) {
    const modal = document.getElementById('login-modal');
    modal.style.display = isVisible ? 'flex' : 'none';
}

// Obsługa procesu logowania
function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    // "Twarde" dane do testów
    if (user === "admin" && pass === "123") {
        // Schowaj powitanie i modal
        document.getElementById('welcome-screen').classList.add('hidden');
        toggleModal(false);
        
        // Pokaż profil
        document.getElementById('profile-screen').classList.remove('hidden');
        
        // Ustaw dane w profilu
        document.getElementById('display-name').innerText = user;
        document.getElementById('user-initial').innerText = user.charAt(0).toUpperCase();
    } else {
        errorMsg.style.display = 'block';
    }
}

// Wylogowanie
function handleLogout() {
    // Odświeżenie strony przywraca stan początkowy
    window.location.reload();
}
