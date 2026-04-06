document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = document.getElementById('username').value;
    const btn = document.querySelector('.glow-button');
    
    // Prosta animacja ładowania
    btn.innerText = "ŁĄCZENIE...";
    btn.style.opacity = "0.7";
    
    setTimeout(() => {
        alert("Witaj " + user + "! System autoryzacji Sezonu 2 zostanie włączony w dniu premiery.");
        btn.innerText = "ZALOGUJ SIĘ";
        btn.style.opacity = "1";
    }, 1500);
});
