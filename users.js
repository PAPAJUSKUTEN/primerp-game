/**
 * PRIME RP - Baza Danych Obywateli
 * Tutaj przechowuj dane wszystkich graczy, którzy mają mieć dostęp do profilu.
 */

const citizenDatabase = [
    {
        user: "citizen1",
        pass: "start123",
        profile: {
            fullName: "John Doe",
            avatar: "https://i.postimg.cc/KjvhBywK/image-14.jpg", // Przykładowy avatar
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
    }
];
