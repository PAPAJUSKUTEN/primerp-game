function loginAction(type) {
    console.log("Wybrano dostęp: " + type);
    
    // Efekt przejścia
    document.body.style.opacity = "0.4";
    
    setTimeout(() => {
        alert("System PrimeRP Sezon 2: Autoryzacja dla " + type);
        document.body.style.opacity = "1";
    }, 400);
}
