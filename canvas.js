let fail = 0;
let radius = 40;
let speed = 800;
//canvas elements
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

//site elements
const userPanel = document.querySelector(".userPanel");

//Size settings
const easySize = document.querySelector("#easy_size");
easySize.addEventListener("click", () => {
  radius = 40;
  toggleIt();
  Clicker = makeCircle();
});
const mediumSize = document.querySelector("#medium_size");
mediumSize.addEventListener("click", () => {
  radius = 30;
  toggleIt();
  Clicker = makeCircle();
});
const hardSize = document.querySelector("#hard_size");
hardSize.addEventListener("click", () => {
  radius = 20;
  toggleIt();
  Clicker = makeCircle();
});

//speed settings
const easySpeed = document.querySelector("#easy_speed");
easySpeed.addEventListener("click", () => {
  speed = 800;
});
const mediumSpeed = document.querySelector("#medium_speed");
mediumSpeed.addEventListener("click", () => {
  speed = 700;
});
const hardSpeed = document.querySelector("#hard_speed");
hardSpeed.addEventListener("click", () => {
  speed = 500;
});

//points & fails settings
const pointCount = document.querySelector(".point_count");
const failCount = document.querySelector(".fail_count");
const gameover = document.querySelector(".gameover");

//start button
const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", () => {
  Clicker.count = 0;
  pointCount.textContent = 0;
  fail = 0;
  Clicker.clicked = true;
  toggleIt();
  init();
});


let timer;

//array of circle colors
const colorArr = ["#011526", "#012E40", "#025959", "#02735E", "#038C65"];
//circle object
function Circle(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.count = 0;
  this.clicked = true;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.fillStyle = colorArr[Math.floor(Math.random() * colorArr.length)];
    c.fill();
    c.stroke();
  };
  this.update = function () {
    this.x = Math.random() * canvas.width + this.radius;
    this.y = Math.random() * canvas.height + this.radius;
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.update();
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.update();
    }
    this.draw();
  };
  this.click = function () {
    console.log("trafiłeś");
  };
  this.isInPath = function (event) {
    let bb, x, y;
    bb = canvas.getBoundingClientRect();
    x = (event.clientX - bb.left) * (canvas.width / bb.width);
    y = (event.clientY - bb.top) * (canvas.height / bb.height);
    return c.isPointInPath(x, y);
  };
}
canvas.addEventListener("click", function (event) {
  if (Clicker.isInPath(event)) {
    console.log("trafiłeś!");
    Clicker.count += 1;
    pointCount.textContent = Clicker.count;
    fail -= 1;
    c.clearRect(0, 0, innerWidth, innerHeight);
  } else {
    failCount.textContent = fail;
    fail += 1;
  }
});

function makeCircle() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  const Clicker = new Circle(300, 300, radius);
  Clicker.draw();
  return Clicker;
}
function stopAnimate() {
  if (fail > 2) {
    failCount.textContent = 3;
    gameover.classList.toggle("visible");
  }
}
function toggleIt() {
  if (gameover.classList.contains("visible")) {
    gameover.classList.toggle("visible");
  }
}
function animate() {
  if (fail < 3) {
    timer = setTimeout(function () {
      requestAnimationFrame(animate);
    }, speed);
    c.clearRect(0, 0, innerWidth, innerHeight);
    failCount.textContent = fail;
    fail += 1;
    Clicker.update();
  } else {
    c.clearRect(0, 0, canvas.width, canvas.height);
    stopAnimate();
  }
}
let Clicker = makeCircle();

function init() {
  animate();
}
