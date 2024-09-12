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
				if (window.innerWidth <= 768) { // Nur auf mobilen Geräten
					menu.classList.remove('active');
				}
			});
		});