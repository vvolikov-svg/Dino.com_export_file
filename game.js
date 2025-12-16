const menu = document.getElementById("menu");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const ending = document.getElementById("ending");
const red = document.getElementById("red");

let y = 130;
let vy = 0;
let time = 0;
let running = false;
let chase = false;
let shadowX = -140;
let ended = false;

function startGame(){
  menu.style.display = "none";
  canvas.style.display = "block";
  ending.style.display = "none";

  // сброс
  y = 130;
  vy = 0;
  time = 0;
  chase = false;
  shadowX = -140;
  ended = false;
  running = true;

  document.body.classList.remove("alert");
  red.style.display = "none";

  loop();
}

function jump(){
  if(!running || ended) return;
  if(y >= 130){
    vy = -12;
  }
}

addEventListener("click", jump);
addEventListener("touchstart", jump);
addEventListener("keydown", e=>{
  if(e.key === "ArrowUp") jump();
});

function loop(){
  if(!running) return;

  ctx.clearRect(0,0,600,200);
  time++;

  // физика прыжка
  vy += 0.7;
  y += vy;
  if(y > 130){
    y = 130;
    vy = 0;
  }

  // через 30 секунд начинается погоня
  if(time > 30 * 60 && !chase){
    chase = true;
    document.body.classList.add("alert");
    red.style.display = "block";
  }

  // земля
  ctx.fillStyle = "#333";
  ctx.fillRect(0,170,600,30);

  // динозавр (пиксельный силуэт)
  if(!ended){
    ctx.fillStyle = "#fff";
    ctx.fillRect(80, y, 24, 24);   // тело
    ctx.fillRect(96, y + 6, 6, 6); // глаз
  }

  // тень "годзиллы"
  if(chase){
    shadowX += 1.8;

    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect(shadowX, 90, 70, 80);       // тело
    ctx.fillRect(shadowX - 20, 70, 40, 40);  // голова
    ctx.fillRect(shadowX + 20, 150, 20, 30); // нога
  }

  // если догнала
  if(shadowX > 60 && !ended){
    badEnding();
  }

  requestAnimationFrame(loop);
}

function badEnding(){
  ended = true;
  running = false;

  canvas.style.display = "none";
  document.body.classList.remove("alert");
  red.style.display = "none";

  ending.style.display = "block";
  t1.textContent = "Ты мог помочь нам";
  t2.textContent = "Но ты не помог";
  t3.textContent = "Теперь слишком поздно";
}
