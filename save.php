<?php
// Pobieranie danych z JS
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    // Zapis do pliku konta.json
    file_put_contents('konta.json', json_encode($data, JSON_PRETTY_PRINT));
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
