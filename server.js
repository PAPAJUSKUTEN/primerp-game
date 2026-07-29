// server.js — prosty backend logowania przez Discord OAuth2
// Serwuje też statyczną stronę (index.html) z tego samego katalogu /public

const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// ---- KONFIGURACJA (z zmiennych środowiskowych – ustaw je w Railway/Render) ----
const {
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI, // np. https://twoja-aplikacja.up.railway.app/auth/discord/callback
    SESSION_SECRET,
    PORT = 3000,
} = process.env;

if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !DISCORD_REDIRECT_URI || !SESSION_SECRET) {
    console.warn(
        '⚠️  Brakuje jednej ze zmiennych środowiskowych: DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI, SESSION_SECRET.\n' +
        '    Uzupełnij je w panelu Railway/Render (Variables) albo w pliku .env lokalnie.'
    );
}

// ---- SESJE (przechowują info "kto jest zalogowany") ----
app.use(session({
    secret: SESSION_SECRET || 'zmien-to-na-cokolwiek-losowego',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // wymaga https w produkcji
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dni
    },
}));

// ---- Serwowanie statycznej strony (index.html, css, obrazki itd.) ----
app.use(express.static(path.join(__dirname, 'public')));

// ---- KROK 1: przekierowanie gracza do Discorda, żeby się zalogował ----
app.get('/auth/discord', (req, res) => {
    const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        redirect_uri: DISCORD_REDIRECT_URI,
        response_type: 'code',
        scope: 'identify', // 'identify' wystarczy do pobrania nicku i avatara
    });
    res.redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`);
});

// ---- KROK 2: Discord odsyła gracza tutaj z kodem autoryzacji ----
app.get('/auth/discord/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.redirect('/?login=error');
    }

    try {
        // Wymieniamy kod na access token
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: DISCORD_CLIENT_ID,
                client_secret: DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code,
                redirect_uri: DISCORD_REDIRECT_URI,
            }),
        });

        if (!tokenResponse.ok) {
            const errText = await tokenResponse.text();
            console.error('Błąd wymiany kodu na token:', errText);
            return res.redirect('/?login=error');
        }

        const tokenData = await tokenResponse.json();

        // Pobieramy dane użytkownika (nick, avatar) z Discorda
        const userResponse = await fetch('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        if (!userResponse.ok) {
            const errText = await userResponse.text();
            console.error('Błąd pobierania danych użytkownika:', errText);
            return res.redirect('/?login=error');
        }

        const discordUser = await userResponse.json();

        // Budujemy URL do avatara (Discord CDN)
        const avatarUrl = discordUser.avatar
            ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`
            : `https://cdn.discordapp.com/embed/avatars/${Number(discordUser.discriminator || 0) % 5}.png`;

        // Zapisujemy w sesji tylko to, co potrzebne (nie zapisujemy access tokenu bez potrzeby)
        req.session.user = {
            id: discordUser.id,
            username: discordUser.username,
            globalName: discordUser.global_name || discordUser.username,
            avatarUrl,
        };

        res.redirect('/?login=success');
    } catch (err) {
        console.error('Nieoczekiwany błąd OAuth:', err);
        res.redirect('/?login=error');
    }
});

// ---- API: sprawdzenie kto jest zalogowany (wywoływane przez frontend) ----
app.get('/api/me', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ loggedIn: false });
    }
    res.json({ loggedIn: true, user: req.session.user });
});

// ---- Wylogowanie ----
app.get('/auth/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
