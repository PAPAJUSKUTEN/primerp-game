/**
 * BAZA DANYCH OBYWATELI PRIME RP
 * Tutaj możesz dodawać nieskończoną liczbę kont.
 * Każdy obiekt musi mieć: user, pass oraz profile.
 */
const citizenDatabase = [
    {
        user: "kowalski",
        pass: "prime123",
        profile: {
            fullName: "Janusz Kowalski",
            avatar: "https://i.postimg.cc/8519krYf/270aac72-dcb0-4b08-bca6-44c6da70ee5f-profile-image-300x300.webp",
            job: "Kierowca Taxi",
            status: "OBYWATEL",
            balance: "12,450 $",
            bankAcc: "PL 40 2000 1001"
        }
    },
    {
        user: "nowak",
        pass: "haslo",
        profile: {
            fullName: "Adam Nowak",
            avatar: "https://i.postimg.cc/mrxG4kRy/55c4629fb275e-o-large.webp",
            job: "Mechanik LSC",
            status: "ZAUFANY OBYWATEL",
            balance: "85,000 $",
            bankAcc: "PL 11 9999 0002"
        }
    },
    {
        user: "medyk1",
        pass: "pomoc",
        profile: {
            fullName: "Katarzyna Leczy",
            avatar: "https://i.postimg.cc/0Nz4jwXJ/Zrzut-ekranu-2024-03-08-195813.webp",
            job: "Lekarz Dyżurny",
            status: "SŁUŻBY MEDYCZNE",
            balance: "4,200 $",
            bankAcc: "PL 05 3333 4444"
        }
    }
];
