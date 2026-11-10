const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const schema = require('../src/schema.js');
function element() { return {textContent:'', style:{}, children:[], handlers:{}, addEventListener(n,fn){this.handlers[n]=fn}, setAttribute(n,v){this[n]=v}, appendChild(e){this.children.push(e)}}; }
async function run(fetch) {
 const map = {'.star':element(), '#message':element(), '#sky':element(), '#contribution-status':element()};
 const document = {querySelector(s){return map[s]}, createElement(){return element()}};
 vm.runInNewContext(fs.readFileSync('src/experience.js','utf8'),{document, fetch, OneLineSchema:schema, encodeURIComponent, console});
 await new Promise(resolve=>setTimeout(resolve,50)); return map;
}
test('renders contribution and responds to clicks', async()=>{
 const payload='const contribution = {"type":"star","x":50,"y":25,"color":"#ffdd88","label":"Bonjour"};';
 const map=await run(async url => url.includes('api.github.com') ? {ok:true,json:async()=>[{type:'file',name:'alice.js'}]} : {ok:true,text:async()=>payload});
 assert.equal(map['#sky'].children.length,1); map['#sky'].children[0].handlers.click(); assert.equal(map['#message'].textContent,'Bonjour');
 map['.star'].handlers.click(); assert.match(map['#message'].textContent,/étoile/);
});
test('offline fallback leaves original star working',async()=>{const map=await run(async()=>{throw new Error('offline')});assert.match(map['#contribution-status'].textContent,/indisponibles/);map['.star'].handlers.click();assert.match(map['#message'].textContent,/étoile/);});
test('invalid contributor is ignored without breaking the sky',async()=>{const map=await run(async url=>url.includes('api.github.com')?{ok:true,json:async()=>[{type:'file',name:'bad.js'}]}:{ok:true,text:async()=>'<script>alert(1)</script>'});assert.equal(map['#sky'].children.length,0)});
