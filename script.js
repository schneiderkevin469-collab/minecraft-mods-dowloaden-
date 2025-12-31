const API="https://api.countapi.xyz";
const NS="coolmods-global-2025";

async function get(k){return (await fetch(`${API}/get/${NS}/${k}`)).json()}
async function hit(k){return (await fetch(`${API}/hit/${NS}/${k}`)).json()}

async function init(){
  openTab("resourcepacks");
  buildRatings();
  loadCounts();
  startCountdown();
}

async function loadCounts(){
  const s=(await get("silvester")).value||0;
  const sh=(await get("shader")).value||0;
  const d=(await get("datapack")).value||0;
  document.getElementById("dl-silvester").textContent=s;
  document.getElementById("dl-shader").textContent=sh;
  document.getElementById("dl-datapack").textContent=d;
  document.getElementById("totalDl").textContent=s+sh+d;
}

function download(path){
  const a=document.createElement("a");
  a.href=path;a.download="";a.click();
}

async function downloadSilvester(){
  document.getElementById("dl-silvester").textContent=(await hit("silvester")).value;
  download("resourcepacks/silvester-resourcepack.zip");
}
async function downloadShader(){
  document.getElementById("dl-shader").textContent=(await hit("shader")).value;
  download("shaders/ComplementaryReimagined_r5.6.1.zip");
}
async function downloadDatapack(){
  document.getElementById("dl-datapack").textContent=(await hit("datapack")).value;
  download("datapacks/hello datapack.zip");
}
function downloadAngel(){
  download("resourcepacks/angel_mod.zip");
}

function startCountdown(){
  const r=new Date("2026-01-01T00:00:00");
  setInterval(()=>{
    const d=r-new Date();
    if(d<=0){
      document.getElementById("countdownTimer").textContent="🎉 Jetzt verfügbar!";
      document.getElementById("angelBadge").style.display="none";
      document.getElementById("angelBtn").style.display="inline-block";
      showReleasePopup();
      return;
    }
    document.getElementById("countdownTimer").textContent=
      Math.floor(d/86400000)+" Tage verbleibend";
  },1000);
}

function buildRatings(){
  document.querySelectorAll(".rating").forEach(r=>{
    for(let i=1;i<=5;i++){
      const s=document.createElement("span");
      s.textContent="★";
      s.onclick=()=>{localStorage.setItem("rate-"+r.dataset.rate,i);update(r,i)};
      r.appendChild(s);
    }
    update(r,localStorage.getItem("rate-"+r.dataset.rate)||0);
  });
}
function update(r,n){
  [...r.children].forEach((s,i)=>s.classList.toggle("active",i<n));
}

function openTab(id){
  document.querySelectorAll(".tabcontent").forEach(t=>t.style.display="none");
  document.getElementById(id).style.display="block";
}

function showImage(src){
  document.getElementById("popupImg").src=src;
  document.getElementById("imgPopup").style.display="flex";
}

function showReleasePopup(){
  document.getElementById("releasePopup").style.display="flex";
  fireworks();
}
function closePopup(){
  document.getElementById("releasePopup").style.display="none";
}

function fireworks(){
  const start=Date.now();
  const i=setInterval(()=>{
    blast(Math.random()*innerWidth,Math.random()*innerHeight*0.6);
    if(Date.now()-start>10000) clearInterval(i);
  },300);
}
function blast(x,y){
  for(let i=0;i<25;i++){
    const d=document.createElement("div");
    d.className="firework";
    d.style.left=x+"px";
    d.style.top=y+"px";
    d.style.background=`hsl(${Math.random()*360},100%,60%)`;
    d.style.setProperty("--x",(Math.random()*200-100)+"px");
    d.style.setProperty("--y",(Math.random()*200-100)+"px");
    document.body.appendChild(d);
    setTimeout(()=>d.remove(),1500);
  }
}
