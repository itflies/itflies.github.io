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

// Versand
function submitKurzanfrage(e) {
    e.preventDefault(); // verhindert den Seitenwechsel zu formspree.io

    const form = e.target;
    const status = document.getElementById('kufo-status');
    if (status) {
        status.style.display = 'block';
        status.textContent = "Ihre Nachricht wird gesendet…";
    }

    const formData = new FormData(form);

    fetch("https://formspree.io/f/myzaydqp", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            if (status) {
                status.textContent = "Vielen Dank! Die Nachricht wurde gesendet.";
            }
            form.reset();
        } else {
            if (status) {
                status.textContent = "Es gab ein Problem beim Senden. Bitte später erneut versuchen.";
            }
        }
    })
    .catch(error => {
        console.error(error);
        if (status) {
            status.textContent = "Fehler beim Senden. Bitte später erneut versuchen.";
        }
    });
}


// Events NACH dem Parsen des DOMs binden
document.addEventListener('DOMContentLoaded', () => {
    // Alle Hero-Buttons, die das Popup öffnen sollen
    const heroButtons = document.querySelectorAll('.hero-buttons-container .btn.btn-secondary');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', openContactPopup);
    });

    // Schliessen-Button
    const closeBtn = document.querySelector('#contact-popup .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeContactPopup);
    }

    // Formular-Submit: nur Status anzeigen, Browser darf normal absenden
    const form = document.getElementById('kufo');
    if (form) {
        form.addEventListener('submit', submitKurzanfrage);
    }
});

