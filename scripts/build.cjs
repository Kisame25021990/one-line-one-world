const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'build');
fs.mkdirSync(output, { recursive: true });
fs.cpSync(path.join(root,'src'), path.join(output,'src'), { recursive: true });
fs.copyFileSync(path.join(root,'index.html'), path.join(output,'index.html'));
const folder=path.join(root,'contributions');
const files=fs.readdirSync(folder).filter(x=>/^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?\.js$/.test(x)).sort();
const contributions=files.map(name=>({name:name.slice(0,-3), code:fs.readFileSync(path.join(folder,name),'utf8')}));
fs.writeFileSync(path.join(output,'contributions.json'), JSON.stringify(contributions));
console.log(`Built ${contributions.length} contributions in build/`);

// Les propositions IA sont une galerie distincte, pas des contributions de personnes.
const aiFolder = path.join(root, 'curated-ai');
const aiFiles = fs.existsSync(aiFolder) ? fs.readdirSync(aiFolder).filter(name => /^[a-z0-9-]+\.js$/.test(name)).sort() : [];
const ai = aiFiles.map(name => ({name: name.slice(0, -3), code: fs.readFileSync(path.join(aiFolder, name), 'utf8')}));
fs.writeFileSync(path.join(output, 'ai-showcase.json'), JSON.stringify(ai));
console.log(`Built ${ai.length} AI showcase entries`);
