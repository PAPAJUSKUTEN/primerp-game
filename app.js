function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Ukryj wszystkie zakładki
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // Usuń klasę active z przycisków
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Pokaż obecną zakładkę i dodaj klasę active do przycisku
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}
