// --- KONFIGURACJA DYNAMICZNEGO TŁA (particles.js) ---
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00f2ff" }, // Kolor cząsteczek (neon blue)
        "shape": { "type": "circle" },
        "opacity": { "value": 0.2, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#bc13fe", // Kolor linii (neon purple)
            "opacity": 0.15,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" }, // Efekt przy najechaniu myszką
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
        }
    },
    "retina_detect": true
});

// --- LOGIKA APLIKACJI ---

const welcomeScreen = document.getElementById('welcome-screen');
const profileScreen = document.getElementById('profile-screen');
const loginModal = document.getElementById('login-modal');
const errorMsg = document.getElementById('error-msg');

// Otwórz modal logowania
function showLoginModal() {
    loginModal.classList.add('active');
}

// Zamknij modal logowania
function closeLoginModal() {
    loginModal.classList.remove('active');
    errorMsg.style.display = 'none'; // Resetuj błąd
}

// Obsługa logowania
function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // "Twarde" dane do testów (muszą być takie)
    if (user === "admin" && pass === "123") {
        // 1. Schowaj modal
        closeLoginModal();
        
        // 2. Schowaj ekran powitalny
        welcomeScreen.classList.remove('active');
        
        // 3. Pokaż profil po krótkim opóźnieniu
        setTimeout(() => {
            profileScreen.classList.add('active');
            
            // Ustaw dane w profilu
            document.getElementById('display-name').innerText = user;
            document.getElementById('user-initial').innerText = user.charAt(0).toUpperCase();
        }, 300);

    } else {
        // Pokaż komunikat o błędzie w modalu
        errorMsg.style.display = 'block';
    }
}

// Wylogowanie
function handleLogout() {
    // Najprostszy sposób to odświeżenie strony, aby wrócić do startu
    window.location.reload();
}
