// Lista 10 użytkowników
const users = [
    { u: "admin", p: "haslo123" },
    { u: "user1", p: "test01" },
    { u: "biuro", p: "biuro2026" },
    { u: "jan", p: "kowalski" },
    { u: "szef", p: "mocne123" },
    { u: "serwis", p: "naprawa" },
    { u: "root", p: "toor" },
    { u: "gosc", p: "gosc1" },
    { u: "firma", p: "praca" },
    { u: "klient", p: "zamowienie" }
];

function checkLogin() {
    const userIn = document.getElementById('username').value;
    const passIn = document.getElementById('password').value;
    const error = document.getElementById('error-msg');

    const validUser = users.find(user => user.u === userIn && user.p === passIn);

    if (validUser) {
        // Zapamiętujemy zalogowanie w tej sesji przeglądarki
        sessionStorage.setItem("isLogged", "true");
        // PRZEKIEROWANIE na stronę z zakładkami
        window.location.href = "strona.html";
    } else {
        error.style.display = "block";
    }
}
