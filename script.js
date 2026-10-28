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
$('#chars').innerHTML=chars.map((c,i)=>`<div class="card rv" style="--d:${(i%4)*.12}s"><img class="foto" src="${c[0]}" alt="${c[1]}" style="object-position:${P[c[1]]}" loading="lazy"><h3>${c[1]}</h3><small>${c[2]}</small><p>${c[3]}</p></div>`).join('');
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
