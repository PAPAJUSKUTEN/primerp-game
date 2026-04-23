const users = [
    { u: "admin", p: "123" }, // Uprościłem dla testu
    { u: "test", p: "test" }
];

function checkLogin() {
    const userIn = document.getElementById('username').value;
    const passIn = document.getElementById('password').value;
    
    // Szukanie użytkownika
    const valid = users.find(user => user.u === userIn && user.p === passIn);

    if (valid) {
        // To jest najważniejsza część:
        sessionStorage.setItem("isLogged", "true");
        window.location.href = "strona.html"; // Sprawdź czy plik tak się nazywa!
    } else {
        alert("Błędny login lub hasło!");
    }
}
