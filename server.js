// Importujemy niezbędne biblioteki
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware do obsługi danych JSON oraz plików statycznych (HTML, CSS, JS)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Zaawansowana, dopracowana baza danych produktów (w pamięci serwera)
const products = [
    {
        id: 1,
        name: "Zaawansowany System Zarządzania",
        category: "Oprogramowanie",
        price: 299.99,
        description: "Pełna automatyzacja procesów biznesowych Twojej firmy. Licencja wieczysta.",
        image: "https://via.placeholder.com/300x200?text=System+ERP"
    },
    {
        id: 2,
        name: "Moduł Integracji API",
        category: "Dodatki",
        price: 149.50,
        description: "Pozwala na szybkie łączenie sklepu z zewnętrznymi systemami płatności i kurierami.",
        image: "https://via.placeholder.com/300x200?text=Integracja+API"
    },
    {
        id: 3,
        name: "Wsparcie Techniczne Premium (1 rok)",
        category: "Usługi",
        price: 499.00,
        description: "Dostęp do dedykowanego programisty 24/7 oraz gwarancja naprawy błędów do 2 godzin.",
        image: "https://via.placeholder.com/300x200?text=Wsparcie+Premium"
    }
];

// --- PUNKTY KOŃCOWE API (ENDPOINTS) ---

// 1. Pobieranie wszystkich produktów (z opcjonalnym filtrowaniem po kategorii)
app.get('/api/products', (req, res) => {
    const { category } = req.query;
    if (category) {
        const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        return res.json(filtered);
    }
    res.json(products);
});

// 2. Pobieranie pojedynczego produktu po ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Produkt nie został znaleziony." });
    res.json(product);
});

// 3. Procesowanie zamówienia (Koszyk)
app.post('/api/checkout', (req, res) => {
    const { items, customer } = req.body;

    // Walidacja danych wejściowych
    if (!items || items.length === 0 || !customer.email || !customer.name) {
        return res.status(400).json({ success: false, message: "Brakujące dane zamówienia lub koszyk jest pusty." });
    }

    let totalSum = 0;
    const orderDetails = [];

    // Zaawansowana weryfikacja cen po stronie serwera (ochrona przed manipulacją cenami przez klienta)
    for (const item of items) {
        const realProduct = products.find(p => p.id === item.id);
        if (!realProduct) {
            return res.status(400).json({ success: false, message: `Produkt o ID ${item.id} nie istnieje.` });
        }
        totalSum += realProduct.price * item.quantity;
        orderDetails.push({
            name: realProduct.name,
            quantity: item.quantity,
            subtotal: realProduct.price * item.quantity
        });
    }

    // Generowanie unikalnego numeru zamówienia
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    // Sukces - zwracamy podsumowanie zamówienia
    res.json({
        success: true,
        orderId: orderId,
        total: totalSum.toFixed(2),
        message: `Dziękujemy ${customer.name}! Zamówienie zostało złożone pomyślnie.`,
        details: orderDetails
    });
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer sklepu działa na porcie: http://localhost:${PORT}`);
});
