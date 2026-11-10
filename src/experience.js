'use strict';

function start() {
  const star = document.querySelector('.star');
  const message = document.querySelector('#message');
  const sky = document.querySelector('#sky');
  const status = document.querySelector('#contribution-status');
  star.addEventListener('click', () => { message.textContent = 'Une étoile brille. Que fera ta ligne ?'; });

  async function loadContributions() {
    try {
      const response = await fetch('https://api.github.com/repos/Kisame25021990/one-line-one-world/contents/contributions?ref=main', { headers: { Accept: 'application/vnd.github+json' } });
      if (!response.ok) throw new Error('GitHub unavailable');
      const entries = await response.json();
      if (!Array.isArray(entries)) throw new Error('Invalid listing');
      const files = entries.filter(e => e.type === 'file' && /^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?\.js$/.test(e.name)).sort((a, b) => a.name.localeCompare(b.name));
      let count = 0;
      for (const entry of files.slice(0, 100)) {
        try {
          // Build URL ourselves: never fetch an arbitrary URL from the API response.
          const url = 'https://raw.githubusercontent.com/Kisame25021990/one-line-one-world/main/contributions/' + encodeURIComponent(entry.name);
          const result = await fetch(url);
          if (!result.ok) continue;
          const data = OneLineSchema.parse(await result.text());
          const button = document.createElement('button');
          button.type = 'button'; button.className = 'contribution-star';
          button.style.left = data.x + '%'; button.style.top = data.y + '%'; button.style.color = data.color;
          button.textContent = '✦'; button.setAttribute('aria-label', data.label);
          button.addEventListener('click', () => { message.textContent = data.label; });
          sky.appendChild(button); count++;
        } catch (_) { /* One bad file cannot stop other stars. */ }
      }
      status.textContent = count ? `${count} étoile(s) de la communauté${files.length > 100 ? ' (100 premières affichées)' : ''}.` : 'Le ciel attend les premières contributions.';
    } catch (_) {
      status.textContent = 'Les étoiles de la communauté sont momentanément indisponibles. Le ciel de départ reste accessible.';
    }
  }
  loadContributions();
}
start();
