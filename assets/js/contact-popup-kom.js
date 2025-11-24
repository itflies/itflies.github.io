// assets/js/contact-popup-kom.js

function openContactPopup() {
    document.getElementById('contact-popup').style.display = 'flex';

    // Telefonnummer sicher zusammensetzen (nicht direkt im HTML)
    const p1 = "+41 ";
    const p2 = "(0)76 ";
    const p3 = "463 ";
    const p4 = "11 ";
    const p5 = "80";

    const number = p1 + p2 + p3 + p4 + p5;

    const phoneLink = document.getElementById('phone-link');
    phoneLink.textContent = "📞 Telefon: " + number;
    phoneLink.href = "tel:" + number.replace(/[^+\d]/g, "");
}

function closeContactPopup() {
    document.getElementById('contact-popup').style.display = 'none';
}

// Kurzformular – aktuell nur Bestätigungstext, kein Versand
function submitKurzanfrage(e) {
    e.preventDefault();

    const status = document.getElementById('kufo-status');
    status.style.display = 'block';
    status.textContent = "Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze.";
}
