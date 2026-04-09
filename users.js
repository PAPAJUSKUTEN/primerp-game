/**
 * PRIME RP - CENTRALNA BAZA DANYCH OBYWATELI (V5.0)
 * * Ten plik zawiera predefiniowane konta oraz strukturę obiektów profilowych.
 * Wszystkie dane są synchronizowane z głównym interfejsem Panelu Obywatela.
 */

const citizenDatabase = [
    {
        user: "kowalski",
        pass: "haslo123",
        profile: {
            fullName: "Jan Kowalski",
            avatar: "https://i.postimg.cc/8519krYf/270aac72-dcb0-4b08-bca6-44c6da70ee5f-profile-image-300x300.webp",
            job: "Kierowca Taxi (Downtown)",
            status: "OBYWATEL",
            balance: "12,450 $",
            bankAcc: "MB-2024-8812-9901",
            visaType: "Dożywotnia",
            insurance: "Podstawowa",
            criminalRecord: "Czysta"
        }
    },
    {
        user: "nowak",
        pass: "prime2024",
        profile: {
            fullName: "Adam Nowak",
            avatar: "https://i.postimg.cc/mrxG4kRy/55c4629fb275e-o-large.webp",
            job: "Starszy Mechanik LSC",
            status: "ZAUFANY OBYWATEL",
            balance: "85,600 $",
            bankAcc: "MB-2024-1102-0042",
            visaType: "Dożywotnia",
            insurance: "Rozszerzona",
            criminalRecord: "Czysta"
        }
    },
    {
        user: "puchacz",
        pass: "leto2024",
        profile: {
            fullName: "Wiktor Puchacz",
            avatar: "https://i.postimg.cc/g0cRLPHz/a4324af6-1492-4782-b7b6-db9eeb0833bf-2-removebg-preview.png",
            job: "Prawnik (DOJ)",
            status: "URZĘDNIK",
            balance: "240,000 $",
            bankAcc: "MB-2024-0001-0007",
            visaType: "Dyplomatyczna",
            insurance: "Premium",
            criminalRecord: "Czysta"
        }
    },
    {
        user: "smith",
        pass: "police123",
        profile: {
            fullName: "John Smith",
            avatar: "https://i.postimg.cc/9F40fK17/image.png",
            job: "Sierżant LSPD",
            status: "FUNKCJONARIUSZ",
            balance: "45,000 $",
            bankAcc: "MB-2024-0911-0112",
            visaType: "Dożywotnia",
            insurance: "Państwowa",
            criminalRecord: "Czysta"
        }
    }
];

/**
 * Funkcja pomocnicza do wyszukiwania użytkownika w bazie.
 * Zwraca obiekt profilu lub null w przypadku błędnych danych.
 */
function authenticateCitizen(username, password) {
    const citizen = citizenDatabase.find(
        c => c.user.toLowerCase() === username.toLowerCase() && c.pass === password
    );
    return citizen ? citizen.profile : null;
}

// Eksport bazy (jeśli używasz modułów) lub pozostawienie w zasięgu globalnym
if (typeof module !== 'undefined') {
    module.exports = { citizenDatabase, authenticateCitizen };
}
