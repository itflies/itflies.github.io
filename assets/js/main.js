document.addEventListener('DOMContentLoaded', () => {
  // Email Auflösung
  const email = "info" + "@" + "itflies.ch";
  document.querySelectorAll('.email-link').forEach(link => {
    link.innerHTML = '<a href="mailto:' + email + '">' + email + '</a>';
  });

  // Map Marker Click
  const mapMarker = document.getElementById('map-marker');
  if (mapMarker) {
    mapMarker.addEventListener('click', () => {
      window.open('https://www.google.com/maps/search/?api=1&query=Hueb+123,+5465+Mellikon,+Schweiz', '_blank');
    });
  }

  // YouTube Placeholder
  function loadYouTube() {
    const placeholder = document.querySelector('.youtube-placeholder');
    if (!placeholder) return;
    const iframe = document.createElement('iframe');
    iframe.className = 'youtube-iframe';
    iframe.setAttribute('src', 'https://www.youtube-nocookie.com/embed/iyF_B9d9l1Q?rel=0&modestbranding=1&autoplay=1');
    iframe.setAttribute('title', 'CAD-Angebots-Kalkulator');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    placeholder.parentNode.replaceChild(iframe, placeholder);
  }

  const yt = document.getElementById('yt-placeholder');
  if (yt) {
    yt.addEventListener('click', loadYouTube);
  }
});
