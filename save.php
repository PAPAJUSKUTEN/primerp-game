<?php
// Pobieranie surowych danych JSON wysłanych z JavaScriptu
$json_data = file_get_contents('php://input');

if ($json_data) {
    // Zapisujemy całą listę kont do pliku konta.json (nadpisujemy go)
    file_put_contents('konta.json', $json_data);
    echo "Sukces: Dane zapisane.";
} else {
    echo "Błąd: Brak danych do zapisu.";
}
?>
