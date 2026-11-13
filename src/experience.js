'use strict';
// Merci à toutes les personnes qui contribuent à ce projet. Thank you to everyone who contributes to this project.
function start() {
 const sky=document.querySelector('#sky'), message=document.querySelector('#message'), status=document.querySelector('#contribution-status');
 document.querySelector('.star').addEventListener('click',()=>{message.textContent='Une étoile brille. Que fera ta ligne ?'});
 const frames=new Map();
 let aiItems=[], communityBackground=''; const selector=document.querySelector('#showcase');
 const color=x=>typeof x==='string' && /^#[0-9a-f]{6}$/i.test(x);
 const coord=x=>Number.isFinite(x)&&x>=0&&x<=100;
 const clean=x=>typeof x==='string'&&x.length>0&&x.length<=100&&!/[\u0000-\u001f\u007f]/.test(x);
 addEventListener('message',e=>{
  const state=frames.get(e.source); if(!state||!e.data||typeof e.data!=='object')return;
  const {type,data}=e.data; if(!data||typeof data!=='object')return;
  if(type==='loaded'){e.source.postMessage({type:'run',code:state.code},'*');return;}
  if(type==='error'){state.nodes.forEach(el=>el.remove());state.frame.remove();frames.delete(e.source);return;}
  if(state.actions++>=25)return;
  if((type==='star'||type==='text')&&coord(data.x)&&coord(data.y)&&clean(type==='star'?data.label:data.text)&&color(data.color)){
   const el=document.createElement('button');el.type='button';el.className='contribution-star';el.style.left=data.x+'%';el.style.top=data.y+'%';el.style.color=data.color;
   el.textContent=type==='star'?'✦':data.text;el.setAttribute('aria-label',type==='star'?data.label:data.text);
   el.addEventListener('click',()=>{if(type==='star')message.textContent=data.label;e.source.postMessage({type:'click'},'*')});sky.appendChild(el);state.nodes.push(el);
  } else if(type==='message'&&clean(data.text))message.textContent=data.text;
  else if(type==='background'&&color(data.color)){if(state.group==='community')communityBackground=data.color;sky.style.backgroundColor=data.color;}
 });
 fetch('contributions.json').then(r=>{if(!r.ok)throw Error('manifest');return r.json()}).then(items=>{
  if(!Array.isArray(items))throw Error('manifest');
  status.textContent=items.length?`${items.length} contribution(s) de la communauté.`:'Le ciel attend les premières contributions.';
  for(const item of items) addFrame(item, 'community');
 }).catch(()=>{status.textContent='Contributions indisponibles. Lance la construction indiquée dans le README.'});
 function addFrame(item, group){if(!item||typeof item.code!=='string'||new TextEncoder().encode(item.code).length>512)return;const frame=document.createElement('iframe');frame.hidden=true;frame.setAttribute('sandbox','allow-scripts');frame.title='Création isolée';frame.src='src/sandbox.html';document.body.appendChild(frame);frames.set(frame.contentWindow,{frame,code:item.code,actions:0,nodes:[],group});}
 fetch('ai-showcase.json').then(r=>{if(!r.ok)throw Error('manifest');return r.json()}).then(items=>{aiItems=items;for(const item of items){const opt=document.createElement('option');opt.value=item.name;opt.textContent=item.name;selector.appendChild(opt)}}).catch(()=>{selector.disabled=true});
 selector.addEventListener('change',()=>{for(const [key,state] of frames){if(state.group==='ai'){state.nodes.forEach(el=>el.remove());state.frame.remove();frames.delete(key)}} sky.style.backgroundColor=communityBackground;message.textContent='Touche une étoile pour découvrir son message.';for(const item of aiItems)if(selector.value==='all'||selector.value===item.name)addFrame(item,'ai');});
}
start();
