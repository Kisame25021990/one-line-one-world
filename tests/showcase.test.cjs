const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const sandbox=fs.readFileSync('src/sandbox.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
for(const name of fs.readdirSync('curated-ai').filter(n=>n.endsWith('.js'))){test('showcase: '+name,()=>{
 const code=fs.readFileSync('curated-ai/'+name,'utf8');assert.ok(Buffer.byteLength(code)<=512);assert.match(code,/^[^\r\n]+\n?$/);new vm.Script('(function(api){\n'+code+'\n})');
 let listener,output=[];const parent={postMessage:x=>output.push(x)};vm.runInNewContext(sandbox,{parent,addEventListener:(t,fn)=>listener=fn});listener({source:parent,data:{type:'run',code}});
 assert.ok(!output.some(x=>x.type==='error'));const actions=output.filter(x=>['star','text','background','message'].includes(x.type));assert.ok(actions.length<=24);for(const {type,data:d} of actions){if(type==='star'||type==='text'){assert.ok(d.x>=0&&d.x<=100&&d.y>=0&&d.y<=100);assert.match(d.color,/^#[a-f0-9]{6}$/i);assert.ok((d.label||d.text||'').length>0)}}
 listener({source:parent,data:{type:'click'}});assert.ok(!output.some(x=>x.type==='error'));
})}
