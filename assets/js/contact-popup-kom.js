// contact-popup-kom.js

// Popup öffnen
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

// Popup schliessen
function closeContactPopup() {
    const popup = document.getElementById('contact-popup');
    if (!popup) return;

    popup.style.display = 'none';
}

// Formular absenden (an Formspree)
function submitKurzanfrage(e) {
    e.preventDefault();

    const textarea = document.getElementById('kufo-msg');
    const status = document.getElementById('kufo-status');

    if (!textarea || !status) return;

    const msg = textarea.value.trim();
    if (!msg) {
        status.style.display = 'block';
        status.textContent = "Bitte eine Nachricht eingeben.";
        return;
    }

    status.style.display = 'block';
    status.textContent = "Wird gesendet...";

    // HIER deine Formspree-URL eintragen:
    const formspreeUrl = "https://formspree.io/f/myzaydqp";


    fetch(formspreeUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ message: msg })
    })
    .then(response => {
        if (response.ok) {
            status.textContent = "Vielen Dank! Die Nachricht wurde gesendet.";
            textarea.value = "";
        } else {
            status.textContent = "Es gab ein Problem beim Senden. Bitte später erneut versuchen.";
        }
    })
    .catch(error => {
        console.error(error);
        status.textContent = "Fehler beim Senden. Bitte später erneut versuchen.";
    });
}

// Events NACH dem Laden des DOMs registrieren
document.addEventListener("DOMContentLoaded", () => {
    // Öffnen-Buttons (alle Hero/Kontakt-Buttons mit .btn.btn-secondary)
    const openButtons = document.querySelectorAll(".hero-buttons-container .btn.btn-secondary");
    openButtons.forEach(btn => {
        btn.addEventListener("click", openContactPopup);
    });

    // Schliessen-Button im Popup
    const closeBtn = document.querySelector("#contact-popup .close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeContactPopup);
    }

    // Formular-Submit
    const form = document.getElementById("kufo");
    if (form) {
        form.addEventListener("submit", submitKurzanfrage);
    }
});

