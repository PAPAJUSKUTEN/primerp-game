// Baza danych obywateli Prime RP
const citizenDatabase = [
    {
        user: "gracz1", // Login do wpisania w Autoryzacji
        pass: "haslo123", // Hasło do wpisania w Autoryzacji
        profile: {
            fullName: "Janusz Pistolet",
            avatar: "https://i.postimg.cc/8519krYf/270aac72-dcb0-4b08-bca6-44c6da70ee5f-profile-image-300x300.webp",
            job: "Bezrobotny",
            status: "OBYWATEL",
            balance: "1,500 $",
            bankAcc: "PL 00 1234 5678"
        }
    },
    {
        user: "komendant",
        pass: "policja2026",
        profile: {
            fullName: "Andrzej Szeryf",
            avatar: "https://i.postimg.cc/mrxG4kRy/55c4629fb275e-o-large.webp",
            job: "Komendant LSPD",
            status: "FUNKCJONARIUSZ",
            balance: "45,000 $",
            bankAcc: "PL 99 8888 1111"
        }
    },
    {
        user: "medyk",
        pass: "lsms123",
        profile: {
            fullName: "Anna Leczy",
            avatar: "https://i.postimg.cc/0Nz4jwXJ/Zrzut-ekranu-2024-03-08-195813.webp",
            job: "Ordynator LSMS",
            status: "ZAUFANY OBYWATEL",
            balance: "12,300 $",
            bankAcc: "PL 11 2222 3333"
        }
    }
];
