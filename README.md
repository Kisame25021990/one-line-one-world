# One Line, One World

### Une personne. Une ligne de code. Un monde créé ensemble.

Un défi open source : développeurs, débutants et créateurs avec IA construisent ensemble une expérience web interactive. Chaque personne peut faire accepter une seule ligne de code pour tout le projet. On commence avec un ciel : à vous d'imaginer comment il évolue.

## Comment participer

1. Fais un fork puis crée `contributions/ton-pseudo-github-en-minuscules.js`. Exemple : `contributions/alice.js` si ton compte est `Alice`. Un fichier par compte réduit les conflits entre participants.
2. Écris dans ce fichier une seule ligne physique de JavaScript exécutable, 512 octets maximum, sans changer d'autre fichier. Exemples (choisis-en un ou invente ta propre ligne) :

```js
api.star(20 + Math.floor(Math.random() * 60), 25, '#ffdd88', 'Une étoile au hasard');
```
```js
api.text(50, 70, 'Bienvenue dans notre monde', '#bbddff');
```
```js
api.onClick(() => api.message('Merci de participer !'));
```

3. Lance l'application et teste ta ligne comme expliqué ci-dessous ; ouvre une pull request vers `main` et décris ce que tu as créé. La fusion attend le contrôle automatique et la décision du mainteneur. Pas d'approbation humaine imposée automatiquement : le mainteneur doit effectivement examiner la proposition.

### Boîte à outils pour une ligne

L'API `api` est fournie au code de chaque contribution :
- `api.star(x, y, couleur, texte)` : ajoute une étoile cliquable.
- `api.text(x, y, texte, couleur)` : ajoute un texte cliquable.
- `api.message(texte)` : affiche un message sous le ciel.
- `api.background(couleur)` : change le fond du ciel.
- `api.onClick(() => ...)` : exécute une fonction lorsque l'on clique sur l'un des éléments de ta contribution.

Les positions sont des nombres de 0 à 100 ; les couleurs sont hexadécimales à six chiffres, par exemple `#aabbcc`. Les textes contiennent 1 à 100 caractères. Tu peux utiliser JavaScript pour calculer et composer ces actions ; l'interface limite les actions émises par chaque contribution afin de limiter les abus. Il reste possible de proposer de nouvelles possibilités dans les issues, sans dépenser ta ligne.

### Règles et limites

- Une seule ligne acceptée par personne pour toute la durée du projet, que tu écrives seul ou avec l'IA. Une proposition refusée ne compte pas. Une contribution correspond à un seul nouveau fichier, nommé d'après le compte GitHub qui ouvre la pull request.
- Ne minifie pas et ne cache pas du code dans une ligne artificiellement complexe. Pas de données personnelles, secrets, collecte, publicité intrusive, contenu malveillant ou code dont tu ne peux pas partager les droits. Tu restes responsable même avec l'IA.
- Le contrôle vérifie le nom et le nombre de lignes, la syntaxe et les tests de base. Les règles GitHub exigent une pull request et ces contrôles avant fusion, mais ne peuvent pas vérifier l'identité réelle ou empêcher une personne d'utiliser un autre compte.
- Chaque ligne acceptée est du vrai code exécuté dans une iframe isolée, sans accès direct à la page principale et avec les connexions réseau bloquées par sa politique. Ce n'est pas une garantie de sécurité absolue : une ligne peut encore présenter un risque, bloquer ou dégrader l'expérience. La revue humaine du code et de sa cohérence reste indispensable ; les tests automatiques ne prouvent pas que toute contribution fonctionne.
- Des fichiers séparés réduisent les conflits Git sans les éliminer. Des effets contradictoires peuvent aussi rendre l'expérience incohérente : il faut en discuter avant fusion.

## Essayer et tester

Il faut Node.js (version 20 ou plus) :

```sh
node scripts/build.cjs
node scripts/serve.cjs
```

Ouvre ensuite http://127.0.0.1:8080. La construction rassemble tous les fichiers de contribution sans limite fixe de 100 ; recommence-la après une modification. Le nombre de contributions utilisables reste limité en pratique par la mémoire et les performances du navigateur. Les fichiers construits dans `build/` ne sont pas enregistrés dans Git. Ne lance que des contributions dont tu acceptes le risque et que tu as examinées.

Tests : `node --test tests/*.test.cjs`. Pour vérifier une proposition sans l'exécuter : `node scripts/check-contribution.cjs contributions/alice.js`. Les tests couvrent notamment plusieurs formes de code, les erreurs et la construction avec plus de 100 fichiers ; ils ne remplacent pas une revue humaine ni un test dans un vrai navigateur.

## Maintenance

Le propriétaire peut ouvrir une PR depuis une branche `maintenance/…` de ce dépôt pour modifier la base, les tests ou la documentation sans être soumis à la règle d'une ligne. Cette exception ne s'applique qu'au propriétaire et à une branche de ce dépôt ; les tests et protections de `main` restent obligatoires. Elle ne permet pas à un contributeur de contourner la règle. Les changements d'architecture doivent préserver les contributions déjà acceptées ou expliquer la migration.

## English

One person, one line, one shared world. Fork the project and add one line of executable JavaScript to `contributions/your-lowercase-github-username.js`; use the `api` methods above, and open a pull request. The line is run in a restricted iframe after approval; isolation and checks reduce risk but do not ensure safety. Human review is essential. Build with `node scripts/build.cjs`, then serve with `node scripts/serve.cjs`. The generated manifest has no fixed 100-contribution cutoff, but browser resource limits still apply. Maintainers may use owner-only `maintenance/…` branches. MIT license.

## Licence

Licence MIT. Les contributions sont partagées sous la même licence.
