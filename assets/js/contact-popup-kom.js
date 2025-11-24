// contact-popup-kom.js

function openContactPopup() {
    const popup = document.getElementById('contact-popup');
    if (!popup) return;

    popup.style.display = 'flex';

    // Telefonnummer sicher zusammensetzen (nicht direkt im HTML)
    const p1 = "+41 ";
    const p2 = "(0)76 ";
    const p3 = "463 ";
    const p4 = "11 ";
    const p5 = "80";

    const number = p1 + p2 + p3 + p4 + p5;

    const phoneLink = document.getElementById('phone-link');
    if (phoneLink) {
        phoneLink.textContent = "📞 Telefon: " + number;
        phoneLink.href = "tel:" + number.replace(/[^+\d]/g, "");
    }
}

function closeContactPopup() {
    const popup = document.getElementById('contact-popup');
    if (!popup) return;

    popup.style.display = 'none';
}

// aktuell nur Status-Text, kein echter Versand
function submitKurzanfrage(e) {
    e.preventDefault();

    const status = document.getElementById('kufo-status');
    if (status) {
        status.style.display = 'block';
        status.textContent = "Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze.";
    }
}

// Events NACH dem Parsen des DOMs binden
document.addEventListener('DOMContentLoaded', () => {
    // ALLE sekundären Hero-Buttons (Projektleitung + Unverbindlich Anfragen)
    const heroSecondaryButtons = document.querySelectorAll('.hero-buttons-container .btn.btn-secondary');
    heroSecondaryButtons.forEach(btn => {
        btn.addEventListener('click', openContactPopup);
    });

    // Schliessen-Button im Popup
    const closeBtn = document.querySelector('#contact-popup .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeContactPopup);
    }

    // Formular-Submit
    const form = document.getElementById('kufo');
    if (form) {
        form.addEventListener('submit', submitKurzanfrage);
    }
});

