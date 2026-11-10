const fs = require('node:fs');
const {parse} = require('../src/schema.js');
const file = process.argv[2];
if (!file || !/^contributions\/[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?\.js$/.test(file)) throw new Error('Invalid contribution path');
parse(fs.readFileSync(file, 'utf8'));
console.log('Contribution valide:', file);
