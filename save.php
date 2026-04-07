<?php
// Pobieramy dane wysłane ze strony
$json = file_get_contents('php://input');
if ($json) {
    // Zapisujemy je do pliku konta.json (nadpisujemy stary plik nową listą)
    file_put_contents('konta.json', $json);
    echo "Zapisano";
}
?>
