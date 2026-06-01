document.getElementById('recruitmentForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Zatrzymujemy domyślne przeładowanie strony

    const webhookUrl = "https://discord.com/api/webhooks/1501014502097813509/SwPATh2xn8-gi5aPGp3LRymj8LxWoF_bOWZx5hjfMPHwx-KhgY2v9OKbN80Mjy1x_8hd";
    
    // Pobieranie danych z pól formularza
    const robloxNick = document.getElementById('robloxNick').value;
    const userAge = document.getElementById('userAge').value;
    const faction = document.getElementById('factionSelect').value;
    const userBio = document.getElementById('userBio').value;

    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');

    // Zmiana stanu przycisku podczas wysyłania
    submitBtn.disabled = true;
    submitBtn.innerText = "Wysyłanie...";

    // Budowanie struktury ładnej wiadomości (Embed) dla Discorda
    const discordPayload = {
        username: "System Rekrutacji Hamburg",
        avatar_url: "https://images.rbxcdn.com/834889c3609340f1a9b2b5ed1eb3602d.png", // Ikona Roblox
        embeds: [{
            title: "📥 Nowa prośba o dołączenie!",
            color: 3447003, // Kolor niebieski w formacie dziesiętnym
            fields: [
                {
                    name: "👤 Nick Roblox",
                    value: `\`${robloxNick}\``,
                    inline: true
                },
                {
                    name: "🎂 Wiek",
                    value: `\`${userAge} lat\``,
                    inline: true
                },
                {
                    name: "🚒 Wybrana Frakcja",
                    value: `**${faction}**`,
                    inline: false
                },
                {
                    name: "📝 Uzasadnienie / Motywacja",
                    value: userBio,
                    inline: false
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: "Emergency Hamburg Web System"
            }
        }]
    };

    // Wysyłanie żądania POST do webhooka Discorda
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(discordPayload)
    })
    .then(response => {
        if (response.ok) {
            // Sukces
            statusMessage.innerText = "Zgłoszenie zostało pomyślnie wysłane na serwer Discord!";
            statusMessage.className = "status-message success";
            document.getElementById('recruitmentForm').reset(); // Czyszczenie formularza
        } else {
            // Błąd odpowiedzi (np. zły webhook)
            statusMessage.innerText = "Wystąpił błąd serwera Discord podczas wysyłania.";
            statusMessage.className = "status-message error";
        }
    })
    .catch(error => {
        // Błąd sieciowy
        console.error('Error:', error);
        statusMessage.innerText = "Nie udało się połączyć z Discordem. Sprawdź połączenie internetowe.";
        statusMessage.className = "status-message error";
    })
    .finally(() => {
        // Przywrócenie przycisku do stanu pierwotnego
        submitBtn.disabled = false;
        submitBtn.innerText = "Wyślij zgłoszenie";
    });
});
