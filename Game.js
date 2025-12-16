const menu = document.getElementById("menu");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const ending = document.getElementById("ending");

let y = 130, vy = 0;
let time = 0;
let running = false;
let shadowDist = 600;
let crouchCount = 0;
let ended = false;

function startGame(){
  menu.style.display = "none";
  canvas.style.display = "block";
  running = true;
  loop();
}

function jump(){
  if(y >= 130) vy = -12;
}

function crouch(){
  if(time > 30*60) crouchCount++;
  if(crouchCount >= 5 && shadowDist < 300){
    secretEnding();
  }
}

addEventListener("click", jump);
addEventListener("touchstart", jump);
addEventListener("keydown", e=>{
  if(e.key === "ArrowUp") jump();
  if(e.key === "ArrowDown") crouch();
});

function loop(){
  if(!running) return;
  ctx.clearRect(0,0,600,200);

  time++;

  // физика
  vy += 0.7;
  y += vy;
  if(y > 130){ y = 130; vy = 0; }

  // через 30 секунд появляется тень
  if(time > 30*60){
    shadowDist -= 1.2;
  }

  // земля
  ctx.fillStyle="#333";
  ctx.fillRect(0,170,600,30);

  // динозавр
  if(!ended){
    ctx.fillStyle="#fff";
    ctx.fillRect(80,y,24,24);
  }

  // тень
  if(time > 30*60){
    ctx.fillStyle="rgba(0,0,0,0.85)";
    ctx.beginPath();
    ctx.arc(40,140,200-shadowDist/3,0,Math.PI*2);
    ctx.fill();
  }

  // концовки
  if(shadowDist < 120 && !ended){
    badEnding();
  }

  if(time > 45*60 && !ended){
    goodEnding();
  }

  requestAnimationFrame(loop);
}

function showEnding(a,b,c){
  canvas.style.display="none";
  ending.style.display="block";
  t1.textContent=a;
  t2.textContent=b;
  t3.textContent=c;
}

function badEnding(){
  ended = true;
  showEnding(
    "Ты мог помочь нам",
    "Но ты не помог",
    "Теперь слишком поздно"
  );
}

function goodEnding(){
  ended = true;
  showEnding(
    "Ты убежал",
    "Тень отступила",
    "Но она помнит тебя"
  );
}

function secretEnding(){
  ended = true;
  showEnding(
    "Ты остановился",
    "И тень исчезла",
    "Иногда это спасает"
  );
}

