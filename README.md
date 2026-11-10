# One Line, One World

### Une personne. Une ligne de code. Un ciel créé ensemble.

Un défi open source pour développeurs, débutants et créateurs avec IA : chacun peut faire accepter une seule ligne, pour toute la durée du projet. Ensemble, créons un ciel d'étoiles interactif.

## Comment contribuer

1. Fais un fork puis crée le fichier `contributions/ton-pseudo-github-en-minuscules.js` (exemple : `contributions/alice.js`). Un fichier par compte limite les conflits entre contributeurs.
2. Ajoute exactement une ligne de JavaScript, sur le modèle ci-dessous, sans modifier d'autre fichier :

```js
const contribution = {"type":"star","x":50,"y":25,"color":"#ffdd88","label":"Bonjour le monde"};
```

3. Modifie la position `x` et `y` (entiers de 5 à 95), la couleur hexadécimale (`#` suivi de 6 chiffres/lettres) et le message (1 à 48 caractères). Les noms des propriétés et le format JSON à l'intérieur des accolades doivent rester identiques.
4. Crée une pull request vers `main` et explique ton idée. Les contrôles vérifient le format, la ligne et les tests ; un mainteneur examine aussi la sécurité et la cohérence avant fusion.

La ligne est traitée comme des données, jamais exécutée comme du JavaScript : c'est un cadre volontairement limité pour garder un ensemble cohérent et réduire les risques. Pour proposer d'autres interactions, ouvre une issue : les idées et revues ne consomment pas ta ligne. Tu restes responsable de ta proposition, même avec l'IA. Pas de contenu nuisible, de données personnelles, de traçage ni de code que tu n'as pas le droit de partager. Les fichiers du projet initial sont sa fondation.

## Essayer

Ouvre `index.html` dans un navigateur. La première étoile fonctionne sans connexion. Pour afficher les contributions, une connexion à GitHub est nécessaire ; l'affichage se limite pour le moment aux 100 premiers fichiers, par ordre alphabétique. Si GitHub est indisponible ou limite les requêtes, le ciel de base reste accessible. La validation automatique réduit les erreurs mais ne prouve pas la sécurité absolue, ne peut pas vérifier l'identité réelle et n'empêche pas tous les conflits. Le mainteneur garde la décision finale.

Tests pour les mainteneurs : `node --test tests/*.test.cjs` et `node scripts/check-contribution.cjs contributions/pseudo.js`. Une fusion ne doit avoir lieu qu'après le passage des contrôles et une revue humaine.

## English

One person, one line, one shared sky. Fork this repository and add a single JavaScript line in `contributions/your-github-username-lowercase.js`, following the example above. Each account can have one accepted contribution. The line contains strictly validated data and is never executed as code; it describes one star. Open a pull request, pass the checks, and wait for human review. GitHub access is needed to load community stars; the first 100 are displayed. Ideas and reviews do not count as a contribution. MIT license.

## Licence

Licence MIT. Les contributions sont partagées sous la même licence.
