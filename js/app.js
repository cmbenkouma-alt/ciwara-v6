/* CIWARA MÉDIAS V6 — configuration réelle uniquement. */
const RADIO_STREAM_URL = "http://ciwarafm.radiostream321.com/";
const AUDIO = document.getElementById("radioAudio");
const playButtons = document.querySelectorAll("[data-play]");
const status = document.getElementById("status");
const stageStatus = document.getElementById("stageStatus");
const playerMessage = document.getElementById("playerMessage");
const bottomPlay = document.querySelector("#bottomPlay span");
const mainPlay = document.getElementById("mainPlay");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
const volume = document.getElementById("volume");
const mute = document.getElementById("mute");
const share = document.getElementById("share");
let connecting = false;

function setPlaying(playing){
  document.body.classList.toggle("playing", playing);
  if(bottomPlay) bottomPlay.textContent = playing ? "Ⅱ" : "▶";
  if(mainPlay) mainPlay.textContent = playing ? "Ⅱ" : "▶";
  if(status) status.textContent = playing ? "🔴 EN DIRECT" : "Prêt à écouter";
  if(stageStatus) stageStatus.textContent = playing ? "Radio Ciwara · EN DIRECT" : "Prêt à écouter le direct";
  if(playerMessage) playerMessage.textContent = playing ? "Vous êtes en direct sur Radio Ciwara 105.5 FM." : "Le direct radio est prêt à être lancé.";
}
async function playRadio(){
  if(connecting || !AUDIO) return;
  if(RADIO_STREAM_URL === "À_CONFIGURER") { showError("Flux radio : À CONFIGURER"); return; }
  connecting=true;
  if(status) status.textContent="Connexion au direct…";
  try{
    AUDIO.src=RADIO_STREAM_URL;
    AUDIO.load();
    await AUDIO.play();
    setPlaying(true);
  }catch(error){
    showError("Lecture impossible. Vérifiez l’URL du flux et l’autorisation du navigateur.");
  }finally{connecting=false;}
}
function pauseRadio(){ if(AUDIO){AUDIO.pause();setPlaying(false);} }
function toggleRadio(){ if(!AUDIO) return; AUDIO.paused ? playRadio() : pauseRadio(); }
function showError(message){
  if(status) status.textContent=message;
  if(stageStatus) stageStatus.textContent=message;
  if(playerMessage) playerMessage.textContent=message;
  setPlaying(false);
}
playButtons.forEach(button=>button.addEventListener("click",toggleRadio));
if(AUDIO){
  AUDIO.volume=.8;
  AUDIO.addEventListener("playing",()=>setPlaying(true));
  AUDIO.addEventListener("pause",()=>setPlaying(false));
  AUDIO.addEventListener("waiting",()=>{if(status)status.textContent="Connexion au direct…";});
  AUDIO.addEventListener("error",()=>showError("Le flux direct ne répond pas pour le moment."));
}
if(volume) volume.addEventListener("input",()=>{if(AUDIO)AUDIO.volume=Number(volume.value);});
if(mute) mute.addEventListener("click",()=>{if(!AUDIO)return;AUDIO.muted=!AUDIO.muted;mute.textContent=AUDIO.muted?"🔇":"🔊";});
if(share) share.addEventListener("click",async()=>{const data={title:"CIWARA MÉDIAS",text:"Écoutez Radio Ciwara 105.5 FM en direct.",url:location.href};try{if(navigator.share)await navigator.share(data);else await navigator.clipboard.writeText(location.href);}catch(e){}});
if("mediaSession" in navigator){
  navigator.mediaSession.metadata=new MediaMetadata({title:"Radio Ciwara 105.5 FM",artist:"CIWARA MÉDIAS",album:"En direct"});
  navigator.mediaSession.setActionHandler("play",playRadio);
  navigator.mediaSession.setActionHandler("pause",pauseRadio);
}
if(menuToggle&&nav){menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));}
function bamakoTime(){return new Intl.DateTimeFormat("fr-FR",{timeZone:"Africa/Bamako",hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date());}
function tick(){const c=document.getElementById("clock");if(c)c.textContent=bamakoTime();}
tick();setInterval(tick,30000);
const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();

/* Actualités : priorité à news.json, sans inventer de source. */
async function loadNews(){
 const grid=document.getElementById("newsGrid"); if(!grid)return;
 try{
  const response=await fetch("news.json?v="+Date.now(),{cache:"no-store"});
  if(!response.ok)throw new Error("news");
  const data=await response.json();
  if(!Array.isArray(data.items)||!data.items.length)throw new Error("empty");
  grid.innerHTML=data.items.slice(0,6).map(item=>`<article class="news-card"><div><small>${escapeHtml(item.source||"CIWARA INFO")}</small><h3>${escapeHtml(item.title||"Actualité")}</h3><p>${escapeHtml(item.description||"")}</p>${item.url?`<a class="text-link" href="${safeUrl(item.url)}" target="_blank" rel="noopener">Lire l'article →</a>`:""}</div></article>`).join("");
 }catch(e){ /* le bloc HTML À CONFIGURER reste volontairement visible */ }
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));}
function safeUrl(value){try{const u=new URL(value,location.href);return ["http:","https:"].includes(u.protocol)?u.href:"#"}catch(e){return "#"}}
loadNews();
