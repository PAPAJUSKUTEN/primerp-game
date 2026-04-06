function startApp() {
    alert("Inicjalizacja systemu... Zapraszamy wkrótce!");
    console.log("System RP został uruchomiony.");
}

// Efekt poświaty kursora
document.addEventListener('mousemove', (e) => {
    const overlay = document.querySelector('.overlay');
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    overlay.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0,85,255,0.2) 0%, rgba(0,0,0,0.9) 100%)`;
});
