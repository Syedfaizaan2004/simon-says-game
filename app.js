let leveldisplay = document.querySelector(".level-display");
let scoredisplay = document.querySelector(".score-display");

let gameseq = []; 
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector(".highscore");

document.addEventListener("keypress", function(){
    if (started == false) {
        console.log("Game is started.");
        started = true;
        levelup();

    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 500);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 500);
}

function levelup (){
    userseq = [];
    level++;
    score += 10;
    h2.innerText = `Level - ${level}`;

    leveldisplay.innerText = `Level: ${level}`;
    scoredisplay.innerText = `Score: ${score}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randcolor = btns[randIdx];
    let randBtn = document.querySelector(`.${randcolor}`);
    // console.log(randIdx);
    // console.log(randcolor);
    // console.log(randBtn);
    gameseq.push(randcolor);
    // console.log(gameseq);
    gameflash(randBtn);
}

function checkans(idx){
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
        // console.log("same value")
    }else {

        if(level > highscore) {
            highscore = level;
            localStorage.setItem("highscore", highscore);
        }
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout (function(){
            document.querySelector("body").style.backgroundColor = "rgba(66, 195, 178, 0.53)";
        }, 150);

        highScoreDisplay.innerHTML = `Highest Score : ${highscore}`;
        reset();
    }
}

function btnpress() {
    // console.log(this);
    let btn = this;
    userflash(btn)

    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length-1);
    // console.log(usercolor);
}

let allbtn = document.querySelectorAll(".btn");
for (btn of allbtn) {
    btn.addEventListener("click", btnpress);
}

document.querySelector("#start-btn").addEventListener("click", function() {
    if(!started) {
        started = true;
        levelup();
    }
})

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    score = 0;
}

highScoreDisplay.innerText = `Highest score : ${highscore}`;

function resetHighScore() {
    localStorage.removeItem('highscore');
    updateHighScoreDisplay();
}

function updateHighScoreDisplay() {
    const highScore = localStorage.getItem('highscore') || 0;
    document.querySelector('.highscore'). textContent = `Highest score : ${highScore}`;
}

window.onload = function() {
    resetHighScore();
}
