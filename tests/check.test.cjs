const test=require('node:test'), assert=require('node:assert/strict');
const {validate}=require('../scripts/check-contribution.cjs');
test('accepts creative real JavaScript expressions',()=>{validate('contributions/alice.js',`api.star(Math.floor(Math.random()*80), 25, '#ffdd88', 'Hello');\n`);validate('contributions/bob.js',`api.onClick(()=>api.message('Bonjour'));\n`)});
test('rejects multi-line, invalid syntax, wrong filename, overlong',()=>{for(const [name,code] of [['contributions/a.js','api.text()\napi.star()'],['contributions/a.js','api.('],['contributions/../x.js','api.star()'],['contributions/a.js','a'.repeat(513)]])assert.throws(()=>validate(name,code))});
