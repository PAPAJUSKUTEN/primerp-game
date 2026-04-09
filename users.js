/**
 * PRIME RP - Baza Danych Obywateli (users.js)
 * * INSTRUKCJA:
 * Aby dodać gracza, skopiuj jeden blok { ... } i wklej go po przecinku.
 * 'user' i 'pass' to dane do logowania na stronie.
 */

const citizenDatabase = [
    {
        user: "citizen1",
        pass: "start123",
        profile: {
            fullName: "John Doe",
            avatar: "https://i.postimg.cc/KjvhBywK/image-14.jpg",
            job: "Bezrobotny",
            status: "OBYWATEL",
            balance: "$15,250",
            bankAcc: "PR-9921-0012"
        }
    },
    {
        user: "mechanik_marek",
        pass: "klucz13",
        profile: {
            fullName: "Marek Imadło",
            avatar: "https://i.postimg.cc/TPxMMrb8/0b921f0878a6e549b4c31efc29383d1b.webp",
            job: "Szef LSCM",
            status: "ZAUFANY",
            balance: "$120,000",
            bankAcc: "PR-4412-8892"
        }
    },
    {
        user: "lspd_smith",
        pass: "odznaka55",
        profile: {
            fullName: "Tom Smith",
            avatar: "https://i.postimg.cc/Cx1Pr8g4/IMG-2398.webp",
            job: "Oficer LSPD",
            status: "FUNKCJONARIUSZ",
            balance: "$42,500",
            bankAcc: "PR-1102-5561"
        }
    },
    {
        user: "szef_kartelu",
        pass: "mrok2026",
        profile: {
            fullName: "Pablo Esco",
            avatar: "https://i.postimg.cc/prb1zvBx/Playboi-Carti-604x900.webp",
            job: "Nieznany",
            status: "POSZUKIWANY",
            balance: "$1,500,000",
            bankAcc: "UKRYTE"
        }
    }
];

// Nie usuwaj tej linii, pozwala ona na logowanie przez konsolę w razie problemów
console.log("System PRIME RP: Baza obywateli załadowana poprawnie.");
