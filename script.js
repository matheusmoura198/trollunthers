const $=s=>document.querySelector(s),root=document.documentElement;
const chars=[
['img/jim.jpg','Jim Lake Jr.','Caçador de Trolls','Garoto de Arcadia que herda o Amuleto da Luz do Dia.'],
['img/toby.jpg','Toby','Melhor amigo','Leal, divertido e sempre pronto para a batalha.'],
['img/claire.jpg','Claire','Aliada','Corajosa e inteligente, entra de cabeça no mundo dos trolls.'],
['img/blinky.jpg','Blinky','Mentor','Troll estudioso e treinador do Caçador.'],
['img/aaarrrgghh.jpg','AAARRRGGHH!!!','Guerreiro','Troll gigante e gentil, mestre da força.'],
['img/merlin.jpg','Merlin','Criador do Amuleto','O primeiro Caçador de Trolls.'],
['img/gunmar.jpg','Gunmar','Rei dos Gumm-Gumms','O Negro, que quer destruir a Luz.'],
['img/bular.jpg','Bular','Vilão','Filho de Gunmar e rival do Caçador.']];
const P={'Jim Lake Jr.':'50% 25%','Toby':'50% 30%','Claire':'50% 35%','Blinky':'50% 30%','AAARRRGGHH!!!':'50% 25%','Merlin':'75% 30%','Gunmar':'50% 40%','Bular':'50% 55%'};
$('#chars').innerHTML=chars.map((c,i)=>`<div class="card rv" data-i="${i}" tabindex="0" style="--d:${(i%4)*.12}s"><img class="foto" src="${c[0]}" alt="${c[1]}" style="object-position:${P[c[1]]}" loading="lazy"><h3>${c[1]}</h3><small>${c[2]}</small><p>${c[3]}</p></div>`).join('');
const seasons=[
['Temporada 1 (2016)','26 episódios','Jim recebe o Amuleto da Luz do Dia e descobre Trolltown. Ele precisa defender Arcadia dos Gumm-Gumms enquanto esconde tudo da família.'],
['Temporada 2 (2017)','13 episódios','A ameaça de Gunmar cresce e o Eclipse se aproxima. Jim enfrenta escolhas difíceis e passa a usar a armadura do Eclipse, em preto e vermelho.'],
['Temporada 3 (2018)','13 episódios','A guerra final por Arcadia reúne todos os aliados e fecha a história de Caçadores de Trolls.']];
const tabs=$('#tabs'),tp=$('#tp');
function show(i){[...tabs.children].forEach((b,j)=>b.setAttribute('aria-selected',i===j));const s=seasons[i];tp.style.animation='none';tp.offsetWidth;tp.style.animation='';tp.innerHTML=`<h3>${s[0]}</h3><small style="color:var(--ac2)">${s[1]}</small><p style="margin-top:10px;color:var(--mut)">${s[2]}</p>`}
seasons.forEach((s,i)=>{const b=document.createElement('button');b.role='tab';b.textContent='Temporada '+(i+1);b.onclick=()=>show(i);tabs.appendChild(b)});show(0);
/* observer */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
/* tema */
function setT(t,save){root.dataset.t=t;document.querySelectorAll('.opt').forEach(o=>o.setAttribute('aria-pressed',o.dataset.t===t));if(save){try{localStorage.setItem('troll-t',t)}catch(e){}}}
document.querySelectorAll('.opt').forEach(o=>o.onclick=()=>setT(o.dataset.t,true));
try{const t=localStorage.getItem('troll-t');if(t)setT(t)}catch(e){}
/* scroll */
const r1=$('#r1'),r2=$('#r2'),vid=$('#trailer'),fr=$('#frame');let tk=false;
function onS(){tk=false;const y=scrollY;
r1.style.transform=`translateX(${-y*.35}px)`;r2.style.transform=`translateX(${y*.35-1200}px)`;
const b=vid.getBoundingClientRect(),p=Math.min(1,Math.max(0,-b.top/(b.height-innerHeight)*1.6));
fr.style.setProperty('--s',(.4+.6*p).toFixed(3));fr.style.setProperty('--r',(40*(1-p))+'px')}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});onS();
/* hero: tilt 3D + blob */
const hero=$('#hero'),amu=$('#amu'),mb=$('#mb');
hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
amu.style.setProperty('--ry',((x/r.width-.5)*50)+'deg');amu.style.setProperty('--rx',(-(y/r.height-.5)*50)+'deg');
mb.style.transform=`translate(${x-60}px,${y-60}px)`});
hero.addEventListener('pointerleave',()=>{amu.style.setProperty('--rx','0deg');amu.style.setProperty('--ry','0deg')});
/* revelação mouse */
const mr=$('#segredo');
function mv(e){const r=mr.getBoundingClientRect(),p=e.touches?e.touches[0]:e;mr.style.setProperty('--mx',(p.clientX-r.left)+'px');mr.style.setProperty('--my',(p.clientY-r.top)+'px')}
mr.addEventListener('pointermove',mv);mr.addEventListener('touchmove',mv,{passive:true});

/* quiz */
const Q=[
['Qual é o nome do protagonista da série?',['Jim Lake Jr.','Toby Domzalski','Steve Palchuk','Walter Strickler'],0],
['Qual objeto dá poderes ao Caçador de Trolls?',['A Espada de Fogo','O Amuleto da Luz do Dia','O Cajado de Merlin','A Pedra do Eclipse'],1],
['Quem criou o Amuleto e foi o primeiro Caçador?',['Blinky','Bular','Merlin','Gunmar'],2],
['Quem é o rei dos Gumm-Gumms?',['Gunmar','Angor Rot','Kanjigar','Draal'],0],
['Quem é o melhor amigo humano de Jim?',['Steve','Toby','Eli','Tronos'],1],
['Quem é o criador da série?',['Tim Burton','Guillermo del Toro','Hayao Miyazaki','Pete Docter'],1]];
let qi=0,qs=0;const qb=$('#qbox');
function qShow(){
 if(qi>=Q.length)return qEnd();
 const q=Q[qi];
 qb.innerHTML=`<div class="qbar"><i style="width:${qi/Q.length*100}%"></i></div><div class="qin"><small style="color:var(--ac2)">Pergunta ${qi+1} de ${Q.length}</small><h3>${q[0]}</h3>${q[1].map((o,i)=>`<button class="qa" data-i="${i}">${o}</button>`).join('')}<p class="qfb"></p></div>`;
 requestAnimationFrame(()=>{const b=qb.querySelector('.qbar i');b.style.width=((qi+1)/Q.length*100)+'%'});
 qb.querySelectorAll('.qa').forEach(b=>b.onclick=()=>qPick(+b.dataset.i));
}
function qPick(i){
 const q=Q[qi],bs=qb.querySelectorAll('.qa');
 bs.forEach(b=>b.disabled=true);
 bs[q[2]].classList.add('ok');
 if(i===q[2]){qs++;qb.querySelector('.qfb').textContent='Correto! Pela Luz do Dia!'}
 else{bs[i].classList.add('no');qb.querySelector('.qfb').textContent='Ops, essa não era a resposta.'}
 setTimeout(()=>{qb.firstElementChild.style.transition='opacity .4s';qb.style.opacity=0;setTimeout(()=>{qi++;qShow();qb.style.opacity=1},400)},1300);
}
function qEnd(){
 const m=qs===6?['Trollhunter lendário','Merlin estaria orgulhoso. O Amuleto é seu!']:qs>=4?['Aprendiz de Caçador','Você conhece bem Arcadia. Falta pouco para o Amuleto.']:['Humano comum','Hora de maratonar a série de novo e voltar mais forte.'];
 qb.innerHTML=`<div class="qbar"><i style="width:100%"></i></div><div class="qres qin"><div class="big grad">${qs}/${Q.length}</div><h3 style="text-transform:none;font-family:inherit;margin:10px 0">${m[0]}</h3><p style="color:var(--mut)">${m[1]}</p><button class="btn" id="qr" style="border:0;cursor:pointer;font:inherit;font-weight:700">Jogar de novo</button></div>`;
 $('#qr').onclick=()=>{qi=0;qs=0;qShow()};
}
qShow();

/* extras */
const ld=$('#ld');addEventListener('load',()=>setTimeout(()=>ld.classList.add('hide'),500));setTimeout(()=>ld.classList.add('hide'),3500);
const cu=$('#cur');
if(matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{cu.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;cu.classList.add('on')});document.addEventListener('pointerover',e=>cu.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,.card'))))}
/* modal */
const D={'Jim Lake Jr.':'Adolescente de Arcadia Oaks escolhido pelo Amuleto da Luz do Dia. Divide a vida entre a escola, a família e a guerra contra os Gumm-Gumms.',
'Toby':'Melhor amigo de Jim, leal e divertido. Luta com um martelo de guerra e nunca deixa o amigo sozinho.',
'Claire':'Aliada corajosa e esperta que entra de cabeça no mundo dos trolls. Mais tarde empunha o Cajado das Sombras.',
'Blinky':'Troll estudioso e treinador do Caçador. Medroso na aparência, mas sempre presente quando importa.',
'AAARRRGGHH!!!':'Troll gigante e gentil, guerreiro poderoso. Fala apenas o próprio nome, mas todos o entendem.',
'Merlin':'Mago criador do Amuleto da Luz do Dia e o primeiro Caçador de Trolls.',
'Gunmar':'Gunmar, o Negro, rei dos Gumm-Gumms. Seu plano depende do Eclipse para conquistar a superfície.',
'Bular':'Filho de Gunmar, guerreiro brutal e grande rival do Caçador.'};
const md=$('#md');
function openM(i){const c=chars[i];const im=$('#mdi');im.src=c[0];im.alt=c[1];im.style.objectPosition=P[c[1]];$('#mdn').textContent=c[1];$('#mdr').textContent=c[2];$('#mdt').textContent=D[c[1]];md.classList.add('on');document.body.style.overflow='hidden'}
function closeM(){md.classList.remove('on');document.body.style.overflow=''}
$('#chars').addEventListener('click',e=>{const c=e.target.closest('.card');if(c)openM(+c.dataset.i)});
$('#chars').addEventListener('keydown',e=>{if(e.key==='Enter'){const c=e.target.closest('.card');if(c)openM(+c.dataset.i)}});
md.addEventListener('click',e=>{if(e.target===md||e.target.id==='mdx')closeM()});
addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});
/* mapa */
const PL=[['Casa do Jim','Onde Jim mora com a mãe e esconde o segredo de ser o Caçador.'],['Escola Arcadia Oaks','Onde Jim, Toby e Claire dividem aulas e segredos.'],['Heartstone Trollmarket','O refúgio dos trolls, escondido sob a cidade.'],['Darklands','O reino sombrio dos Gumm-Gumms, de onde Gunmar planeja a conquista.']];
document.querySelectorAll('.pin').forEach(p=>p.onclick=()=>{document.querySelectorAll('.pin').forEach(x=>x.classList.remove('on'));p.classList.add('on');const m=$('#mpi'),k=PL[p.dataset.k];m.innerHTML=`<b>${k[0]}</b><p>${k[1]}</p>`;m.classList.remove('sw');m.offsetWidth;m.classList.add('sw')});
/* curiosidades */
document.querySelectorAll('.flip').forEach(f=>f.onclick=()=>f.classList.toggle('on'));
/* som */
let snd=false,AC;const sb=$('#snd');
function tone(t){if(!snd)return;AC=AC||new(window.AudioContext||window.webkitAudioContext)();const n=t==='gloria'?[440,554,659,880]:[220,185,147,110];n.forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain(),s=AC.currentTime+i*.12;o.type=t==='gloria'?'sine':'sawtooth';o.frequency.value=f;g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(.1,s+.03);g.gain.exponentialRampToValueAtTime(.0001,s+.5);o.connect(g);g.connect(AC.destination);o.start(s);o.stop(s+.55)})}
sb.onclick=()=>{snd=!snd;sb.textContent=snd?'🔊 Som':'🔇 Som';sb.setAttribute('aria-pressed',snd);tone(root.dataset.t)};
document.querySelectorAll('.opt').forEach(o=>o.addEventListener('click',()=>tone(o.dataset.t)));
/* quiz 2 */
const Q2=[['Seu superpoder seria…',[['Coragem para liderar',0],['Humor que anima todo mundo',1],['Estratégia afiada',2],['Sabedoria dos livros',3]]],
['Num sábado livre você…',[['Parto para a aventura',0],['Maratono séries e como pizza',1],['Organizo o plano de todos',2],['Leio um livro antigo',3]]],
['Seus amigos dizem que você é…',[['Determinado',0],['Leal e divertido',1],['Corajoso e esperto',2],['Gentil e forte',4]]],
['Sua arma favorita…',[['Espada de luz',0],['Martelo de guerra',1],['Cajado das sombras',2],['Meus punhos e meu coração',4]]]];
let q2i=0,q2s=[0,0,0,0,0];const b2=$('#qbox2');
function q2Show(){
 if(q2i>=Q2.length)return q2End();
 const q=Q2[q2i];
 b2.innerHTML=`<div class="qbar"><i style="width:${q2i/Q2.length*100}%"></i></div><div class="qin"><small style="color:var(--ac2)">Pergunta ${q2i+1} de ${Q2.length}</small><h3>${q[0]}</h3>${q[1].map((o,i)=>`<button class="qa" data-i="${i}">${o[0]}</button>`).join('')}</div>`;
 requestAnimationFrame(()=>b2.querySelector('.qbar i').style.width=((q2i+1)/Q2.length*100)+'%');
 b2.querySelectorAll('.qa').forEach(b=>b.onclick=()=>{q2s[q[1][+b.dataset.i][1]]++;b2.style.opacity=0;setTimeout(()=>{q2i++;q2Show();b2.style.opacity=1},400)});
}
function q2End(){
 const w=q2s.indexOf(Math.max(...q2s)),c=chars[w];
 b2.innerHTML=`<div class="qbar"><i style="width:100%"></i></div><div class="qres res qin"><img src="${c[0]}" alt="${c[1]}" style="object-position:${P[c[1]]}"><h3 class="grad" style="font-size:2rem;font-family:Impact,sans-serif;text-transform:uppercase">${c[1]}</h3><p style="color:var(--mut);margin:8px 0">${D[c[1]]}</p><button class="btn" id="q2r" style="border:0;cursor:pointer;font:inherit;font-weight:700">Refazer</button></div>`;
 $('#q2r').onclick=()=>{q2i=0;q2s=[0,0,0,0,0];q2Show()};
}
q2Show();

/* arsenal 3D */
const AR=[['Amuleto da Luz do Dia','Jim Lake Jr.','Concede ao Caçador a armadura e a espada da luz.'],['Cajado das Sombras','Claire Nuñez','Cajado de poder sombrio que Claire passa a empunhar.'],['Martelo de Guerra','Toby Domzalski','O martelo de guerra do melhor amigo de Jim.']];
const rg=$('#ring'),arms=[...rg.children],dots=[...$('#dots').children],ai=$('#ai'),stg=$('#stage');
let ang=0,cur=-1,drag=false,sx=0,a0=0;
function apply(){
 rg.style.transform=`rotateY(${ang}deg)`;
 const i=((Math.round(ang/120)%3)+3)%3;
 if(i!==cur){cur=i;arms.forEach((p,k)=>p.classList.toggle('act',k===i));dots.forEach((d,k)=>d.classList.toggle('on',k===i));
  const w=AR[i];ai.innerHTML=`<small>${w[1]}</small><h3>${w[0]}</h3><p>${w[2]}</p>`;ai.classList.remove('sw');ai.offsetWidth;ai.classList.add('sw')}
}
function snap(d){ang=Math.round(ang/120)*120+(d||0)*120;rg.style.transition='transform .8s cubic-bezier(.2,.7,.2,1)';apply()}
stg.addEventListener('pointerdown',e=>{drag=true;sx=e.clientX;a0=ang;rg.style.transition='none';stg.setPointerCapture(e.pointerId)});
stg.addEventListener('pointermove',e=>{if(!drag)return;ang=a0+(e.clientX-sx)*.5;apply()});
const end=()=>{if(drag){drag=false;snap(0)}};
stg.addEventListener('pointerup',end);stg.addEventListener('pointercancel',end);
$('#ap').onclick=()=>snap(-1);$('#an').onclick=()=>snap(1);
dots.forEach((d,k)=>d.onclick=()=>{const t=Math.round(ang/120);snap(k-(((t%3)+3)%3))});
stg.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')snap(-1);if(e.key==='ArrowRight')snap(1)});
apply();

/* partículas */
const pcv=$('#fx'),pcx=pcv.getContext('2d');let pw,ph,pfc=0,pcol=['#39d0ff','#2f7bff'];const pps=[];
function prs(){pw=pcv.width=innerWidth;ph=pcv.height=innerHeight}
prs();addEventListener('resize',prs);
const pmk=init=>({x:Math.random()*pw,y:init?Math.random()*ph:ph+10,r:Math.random()*2+.6,v:Math.random()*.5+.15,dx:(Math.random()-.5)*.3,p:Math.random()*6.28,a:Math.random()*.6+.2,c:Math.random()<.5?0:1});
for(let i=0;i<(innerWidth<700?35:70);i++)pps.push(pmk(true));
function pfx(){
 pfc++;
 if(pfc%20===1){const cs=getComputedStyle(root);pcol=[cs.getPropertyValue('--ac2').trim()||pcol[0],cs.getPropertyValue('--ac').trim()||pcol[1]]}
 pcx.clearRect(0,0,pw,ph);
 for(const q of pps){
  q.y-=q.v;q.x+=q.dx+Math.sin(q.p+pfc*.01)*.2;
  if(q.y<-10)Object.assign(q,pmk(false));
  pcx.globalAlpha=q.a*(.6+.4*Math.sin(q.p+pfc*.03));
  pcx.fillStyle=pcx.shadowColor=pcol[q.c];pcx.shadowBlur=8;
  pcx.beginPath();pcx.arc(q.x,q.y,q.r,0,6.28);pcx.fill();
 }
 requestAnimationFrame(pfx);
}
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)pfx();
/* progresso + topo */
const pgi=$('#pg i'),pgm=$('#pg img'),bt=$('#top');
function prog(){const m=document.documentElement.scrollHeight-innerHeight,p=m>0?scrollY/m:0;pgi.style.width=(p*100)+'%';pgm.style.left=(p*100)+'%';pgm.style.transform=`rotate(${p*1440}deg)`;bt.classList.toggle('show',scrollY>700)}
addEventListener('scroll',prog,{passive:true});addEventListener('resize',prog);prog();
bt.onclick=()=>scrollTo({top:0,behavior:'smooth'});
/* transformação do amuleto */
function armor(){
 const r=amu.getBoundingClientRect(),t=root.dataset.t,rn=$('#rn');
 rn.style.left=(r.left+r.width/2)+'px';rn.style.top=(r.top+r.height/2)+'px';
 $('#tt').textContent=t==='ruina'?'Armadura do Eclipse ativada':'Armadura da Luz do Dia ativada';
 ['fl','rn','tt'].forEach(id=>{const e=$('#'+id);e.classList.remove('go');e.offsetWidth;e.classList.add('go')});
 amu.classList.add('pulse');setTimeout(()=>amu.classList.remove('pulse'),1500);
 tone(t);
}
amu.addEventListener('click',armor);
amu.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();armor()}});
                      
