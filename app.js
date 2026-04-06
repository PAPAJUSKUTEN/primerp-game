// Obsługa menu bocznego
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('data-target');
        switchTab(target);
    });
});

// Uniwersalna funkcja zmiany zakładek (używana też przez kafelki)
function switchTab(tabId) {
    // Ukryj wszystkie strony
    document.querySelectorAll('.tab-page').forEach(page => {
        page.classList.remove('active');
    });

    // Usuń klasę active z menu
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
        if(nav.getAttribute('data-target') === tabId) {
            nav.classList.add('active');
        }
    });

    // Pokaż wybraną stronę
    const activePage = document.getElementById(tabId);
    if(activePage) {
        activePage.classList.add('active');
    }
}
