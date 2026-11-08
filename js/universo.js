(function(){
var S=[
{w:1,t:"Deyanira...",kick:"UN UNIVERSO PARA TI",ks:"Un mundo para quien brilla conmigo",sub:"Encontré algo en el universo que quería mostrarte.",b:"Descubrir"},
{t:"Dicen que hay millones de estrellas..."},
{t:"Pero ninguna podría iluminar mi vida como tú."},
{t:"Estrellas hay muchas, pero tú eres única para mí. Tú eres mi luna, Deyanira."},
{t:"Viajé un poco más lejos..."},
{t:"Y encontré un lugar que me recordó a ti."},
{t:"Entonces entendí algo..."},
{t:"No importa cuántos lugares existan, siempre elegiría aquel donde estés tú."},
{t:"Toca una flor",tap:1},
{t:"Pero entre todas ellas, hay una que siempre elegiría."},
{t:"Tú. Porque incluso en un universo infinito, seguirías siendo mi lugar favorito."},
{t:"Podría regalarte todas las flores del mundo... pero preferí regalarte un universo entero."},
{t:"Porque para mí, tú haces especial cualquier lugar."},
{card:1,b:"Una sorpresa más 💜"}];
var P=4,B=6,T=8,F=9,L=S.length-1;
var FL=[["Tu sonrisa",-66,76],["Cada momento contigo",-33,88],["Tu paciencia",0,102],["Tu mirada",33,84],["Tu forma de ser",66,74]];
var stage=document.getElementById("stage"),copy=document.getElementById("copy"),btn=document.getElementById("btn"),
fws=document.getElementById("fws"),vis=document.getElementById("vis");
var touched={},nTouched=0,cur=0,busy=false,heartOn=false;

function head(){var s='<svg class="head" viewBox="-23 -23 46 46" aria-hidden="true">',i;
for(i=0;i<14;i++)s+='<ellipse cx="0" cy="-14" rx="4.3" ry="8.6" fill="#8e5bd9" transform="rotate('+(i*360/14+13)+')"/>';
for(i=0;i<14;i++)s+='<ellipse cx="0" cy="-13" rx="4.2" ry="8.4" fill="#c9a0ff" transform="rotate('+(i*360/14)+')"/>';
return s+'<defs><radialGradient id="cg"><stop offset="0" stop-color="#4a2480"/><stop offset="1" stop-color="#1a0b33"/></radialGradient></defs><circle r="8.2" fill="url(#cg)"/></svg>'}
var flBtns=FL.map(function(f,i){
var w=document.createElement("div");w.className="fw"+(i===2?" ch":"");w.style.setProperty("--a",f[1]+"deg");
var b=document.createElement("button");b.type="button";b.className="fl";b.disabled=true;b.setAttribute("aria-label",f[0]);
b.style.setProperty("--h",f[2]+"px");b.style.setProperty("--d",(i*.3)+"s");
b.innerHTML='<span class="stem"></span>'+head();
b.addEventListener("click",function(){
 if(!touched[i]){touched[i]=1;nTouched++}
 b.classList.add("on");openPhoto(i);
 var c=document.getElementById("cnt");if(c)c.textContent=nTouched+" de "+FL.length;
 if(cur===T&&nTouched===FL.length)btn.classList.remove("hide")});
w.appendChild(b);fws.appendChild(w);return b});

var FOTOS=[["fotos/foto1.jpg", "fotos/foto2.jpg", "fotos/foto3.jpg", "fotos/foto4.jpg"],
  ["fotos/foto5.jpg", "fotos/foto6.jpg", "fotos/foto7.jpg", "fotos/foto8.jpg"],
  ["fotos/foto9.jpg", "fotos/foto10.jpg", "fotos/foto11.jpg", "fotos/foto12.jpg"],
  ["fotos/foto13.jpg", "fotos/foto14.jpg", "fotos/foto15.jpg"],
  ["fotos/foto16.jpg", "fotos/foto17.jpg"]];
var idx=[0,0,0,0,0];
var pho=document.getElementById("photo"),pimg=pho.querySelector("img"),pcap=pho.querySelector("figcaption"),pfb=pho.querySelector(".fb");
function openPhoto(i){pcap.textContent=FL[i][0];pfb.hidden=true;pimg.hidden=false;
var src=FOTOS[i][idx[i]%FOTOS[i].length];idx[i]++;
pimg.onerror=function(){pimg.hidden=true;pfb.hidden=false;pfb.querySelector("small").textContent="No se encontró "+src};
pimg.removeAttribute("src");pimg.src=src;pho.hidden=false;void pho.offsetWidth;pho.classList.add("show");pho.focus()}
function closePhoto(now){pho.classList.remove("show");
if(now){pho.hidden=true;return}
setTimeout(function(){if(!pho.classList.contains("show"))pho.hidden=true},350)}
pho.addEventListener("click",function(){closePhoto()});
addEventListener("keydown",function(e){if(e.key==="Escape")closePhoto()});

function html(s){
if(s.w)return '<p class="kick">'+s.kick+'</p><p class="ksub">'+s.ks+'</p><h1 class="big">'+s.t+'</h1><p class="sub">'+s.sub+'</p>';
if(s.card)return '<div class="card"><p class="to">Para Deyanira 💜</p><p class="from">Con amor, Axel </p></div>';
return '<p class="line">'+s.t+'</p>'+(s.tap?'<p class="cnt" id="cnt">'+nTouched+' de '+FL.length+'</p>':'')}

function go(n,instant){
cur=n;var c=stage.classList,s=S[n];
c.toggle("welcome",n===0);c.toggle("pl",n>=P);c.toggle("bloom",n>=B);c.toggle("fin",n>=F);
heartOn=n>=1&&n<P;
flBtns.forEach(function(b){b.disabled=n<T});
if(n===0){nTouched=0;touched={};flBtns.forEach(function(b){b.classList.remove("on")})}
function swap(){copy.innerHTML=html(s);btn.textContent=s.b||"Continuar";
btn.classList.toggle("hide",n===T&&nTouched<FL.length);copy.classList.remove("out");busy=false}
if(instant){swap();return}
busy=true;copy.classList.add("out");setTimeout(swap,360)}

btn.addEventListener("click",function(){if(busy)return;if(cur===L){location.href="corazon_3d.html";return}go(cur+1)});

/* cielo: estrellas y constelación */
var cv=document.getElementById("sky"),cx=cv.getContext("2d"),W,H,stars=[],hp=0,ha=0,last=0,
red=matchMedia("(prefers-reduced-motion:reduce)").matches;
var HEART=[];for(var k=0;k<26;k++){var t=k/26*Math.PI*2;HEART.push([16*Math.pow(Math.sin(t),3),-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))])}
function size(){var d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);
stars=[];for(var i=0,n=Math.round(W*H/5500);i<n;i++)stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.3,p:Math.random()*6.28,s:Math.random()*1.5+.4,c:Math.random()<.18?"217,194,255":"220,228,255"})}
function frame(ts){
var dt=Math.min((ts-last)/1000,.05);last=ts;cx.clearRect(0,0,W,H);
for(var i=0;i<stars.length;i++){var s=stars[i],a=red?.7:.3+.7*(.5+.5*Math.sin(ts/1000*s.s+s.p));
cx.fillStyle="rgba("+s.c+","+a.toFixed(2)+")";cx.beginPath();cx.arc(s.x,s.y,s.r,0,6.283);cx.fill()}
if(heartOn)hp=red?1:Math.min(1,hp+dt*.3);
ha+=((heartOn?1:0)-ha)*Math.min(1,dt*3);if(!heartOn&&ha<.01)hp=0;
if(ha>.01){
 var r=vis.getBoundingClientRect(),sc=Math.min(r.width*.78/34,r.height*.8/30,15)*(red?1:1+.015*Math.sin(ts/700)),
 ox=r.left+r.width/2,oy=r.top+r.height/2-2.5*sc,n=hp*HEART.length;
 cx.strokeStyle="rgba(217,194,255,"+(.5*ha).toFixed(2)+")";cx.lineWidth=1.2;cx.beginPath();
 for(var j=0;j<=Math.floor(n)&&j<HEART.length;j++){
  var p=HEART[j],q=HEART[(j+1)%HEART.length],f=Math.min(1,n-j);if(f<=0)break;
  cx.moveTo(ox+p[0]*sc,oy+p[1]*sc);cx.lineTo(ox+(p[0]+(q[0]-p[0])*f)*sc,oy+(p[1]+(q[1]-p[1])*f)*sc)}
 cx.stroke();cx.shadowColor="rgba(190,150,255,1)";cx.shadowBlur=14;
 for(var m=0;m<HEART.length&&m<=n;m++){cx.fillStyle="rgba(235,220,255,"+ha.toFixed(2)+")";cx.beginPath();cx.arc(ox+HEART[m][0]*sc,oy+HEART[m][1]*sc,2.4,0,6.283);cx.fill()}
 cx.shadowBlur=0}
requestAnimationFrame(frame)}
addEventListener("resize",size);size();requestAnimationFrame(frame);go(0,true);
})();
