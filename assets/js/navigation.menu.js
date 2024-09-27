const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

// Funktion zum Ein- und Ausblenden des Menüs
function toggleMenu() {
    menu.classList.toggle('active');
}

// Event-Listener für den Hamburger-Button
hamburger.addEventListener('click', toggleMenu);

// Event-Listener für alle Links im Menü
document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
        // Menü einklappen, wenn ein Link angeklickt wird
        menu.classList.remove('active');
    });
});

// Event-Listener für Klicks außerhalb des Menüs
document.addEventListener('click', function(event) {
    // Prüfen, ob der Klick außerhalb des Menüs und des Hamburger-Buttons war
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove('active');  // Menü einklappen
    }
});
