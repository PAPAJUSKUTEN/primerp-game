// Baza użytkowników dostępna dla skryptu
const users = [
    { u: "admin", p: "haslo123" },
    { u: "user1", p: "test01" },
    { u: "biuro", p: "biuro2024" },
    { u: "jan", p: "kowalski99" },
    { u: "projekt", p: "tajne123" },
    { u: "klient", p: "zapraszam" },
    { u: "manager", p: "boss1" },
    { u: "serwis", p: "naprawa" },
    { u: "gosc", p: "gosc2024" },
    { u: "root", p: "toor" }
];

function checkLogin() {
    const userIn = document.getElementById('username').value;
    const passIn = document.getElementById('password').value;
    const error = document.getElementById('error-msg');

    // Szukanie użytkownika w tablicy
    const userFound = users.find(user => user.u === userIn && user.p === passIn);

    if (userFound) {
        // Jeśli dane są poprawne, przenosi do strony z zakładkami
        window.location.href = "strona_z_zakladkami.html";
    } else {
        // Jeśli błędne, pokazuje komunikat
        error.style.display = "block";
    }
}
