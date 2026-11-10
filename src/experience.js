'use strict';

function start() {
  const star = document.querySelector('.star');
  const message = document.querySelector('#message');
  star.addEventListener('click', () => { message.textContent = 'Une étoile brille. Que fera ta ligne ?'; });
  // Ajoute ta ligne de code ici : une seule ligne par personne, pour tout le projet.
}

start();
