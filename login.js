// login.js
const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorBox = document.getElementById("loginError");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
    const visible = passwordInput.type === "password";
    passwordInput.type = visible ? "text" : "password";
    togglePassword.textContent = visible ? "Ukryj" : "Pokaż";
});

usernameInput.addEventListener("input", () => {
    errorBox.classList.remove("active");
});

passwordInput.addEventListener("input", () => {
    errorBox.classList.remove("active");
});

form.addEventListener("submit", event => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    const account = OFFICER_ACCOUNTS.find(officer =>
        officer.username === username &&
        officer.password === password
    );

    if (!account) {
        errorBox.textContent = "Nieprawidłowy login lub hasło.";
        errorBox.classList.add("active");
        return;
    }

    sessionStorage.setItem(
        "venus_current_officer",
        JSON.stringify(account)
    );

    window.location.href = "dashboard.html";
});
