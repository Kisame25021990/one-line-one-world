const test = require('node:test');
const assert = require('node:assert/strict');
const {parse} = require('../src/schema.js');
const line = 'const contribution = {"type":"star","x":50,"y":25,"color":"#ffdd88","label":"Bonjour"};';
test('accepts exactly one valid contribution line', () => assert.equal(parse(line).label, 'Bonjour'));
test('rejects multiple lines and executable code', () => { assert.throws(() => parse(line + '\nalert(1)')); assert.throws(() => parse('const contribution = {}; fetch("https://example.com");')); });
test('rejects malformed and unsafe data', () => { for (const s of [line.replace('50','101'), line.replace('#ffdd88','red'), line.replace('"star"','"script"'), line.replace('"Bonjour"','""'), line.replace('"label"','"html"')]) assert.throws(() => parse(s)); });
test('text is data, never executed', () => { const malicious = line.replace('Bonjour','<img src=x onerror=alert(1)>'); assert.equal(parse(malicious).label, '<img src=x onerror=alert(1)>'); });
