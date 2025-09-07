const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const messageElement = document.getElementById('message');
const startButton = document.getElementById('startButton');
const scoreElement = document.getElementById('score');
const rankingArea = document.getElementById('ranking-area');
const rankList = document.getElementById('rank-list');
const volumeControl = document.getElementById('volume');

const hitSound = document.getElementById('hitSound');
const gameoverSound = document.getElementById('gameoverSound');

let gameStarted = false;
let score = 0;

// ボールの設定
let ball = {
    x: 0,
    y: 0,
    dx: 1.5,
    dy: -1.5,
    radius: 10
};

// パドルの設定
let paddle = {
    height: 10,
    width: 90,
    x: 0,
    speed: 5
};

let rightPressed = false;
let leftPressed = false;

// ブロックの設定
let bricks = [];
const brickRowCount = 5;
const brickColumnCount = 7;
const brickWidth = 70;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// 画面サイズに合わせてキャンバスのサイズを設定
function setCanvasSize() {
    canvas.width = window.innerWidth * 0.9 > 600 ? 600 : window.innerWidth * 0.9;
    canvas.height = canvas.width / 1.5;
    
    // パドルの位置も再計算
    paddle.x = (canvas.width - paddle.width) / 2;
}

function initBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for(let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status === 1) {
                const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if(b.status === 1) {
                if(ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    score += 10;
                    scoreElement.textContent = score;
                    hitSound.currentTime = 0;
                    hitSound.play();
                    checkWin();
                }
            }
        }
    }
}

function checkWin() {
    let allBricksBroken = true;
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status === 1) {
                allBricksBroken = false;
                break;
            }
        }
    }
    if(allBricksBroken) {
        messageElement.textContent = `ゲームクリア！スコア: ${score}`;
        endGame();
    }
}

function endGame() {
    gameStarted = false;
    startButton.textContent = 'もう一度プレイ';
    startButton.style.display = 'block';
    
    saveRanking();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        } else {
            messageElement.textContent = `ゲームオーバー！スコア: ${score}`;
            gameoverSound.currentTime = 0;
            gameoverSound.play();
            endGame();
        }
    }

    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.speed;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= paddle.speed;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (gameStarted) {
        requestAnimationFrame(draw);
    }
}

function start() {
    if (!gameStarted) {
        gameStarted = true;
        score = 0;
        scoreElement.textContent = score;
        setCanvasSize(); // ゲーム開始時にサイズを再設定
        initBricks();
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 1.5;
        ball.dy = -1.5;
        paddle.x = (canvas.width - paddle.width) / 2;
        messageElement.textContent = "";
        startButton.style.display = 'none';
        rankingArea.style.display = 'none';
        draw();
    }
}

// ランキング機能
function saveRanking() {
    let name = prompt("ランキングに名前を登録します。名前を入力してください:");
    if (!name) {
        name = "名無しさん";
    }
    const ranking = getRanking();
    ranking.push({ name: name, score: score });
    ranking.sort((a, b) => b.score - a.score);

    localStorage.setItem('breakoutRanking', JSON.stringify(ranking));

    displayRanking();
}

function getRanking() {
    const rankingJson = localStorage.getItem('breakoutRanking');
    return rankingJson ? JSON.parse(rankingJson) : [];
}

function displayRanking() {
    const ranking = getRanking();
    rankList.innerHTML = '';
    ranking.slice(0, 10).forEach((rank, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}位: ${rank.name} - ${rank.score} 点`;
        rankList.appendChild(li);
    });
    rankingArea.style.display = 'block';
}

// イベントリスナー (PC用)
document.addEventListener("keydown", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
});

document.addEventListener("mousemove", (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
    }
});

// イベントリスナー (スマートフォン用)
document.addEventListener("touchstart", (e) => {
    const touchX = e.touches[0].clientX - canvas.offsetLeft;
    paddle.x = touchX - paddle.width / 2;
}, { passive: false });

document.addEventListener("touchmove", (e) => {
    const touchX = e.touches[0].clientX - canvas.offsetLeft;
    paddle.x = touchX - paddle.width / 2;
}, { passive: false });


// 音量スライダーのイベントリスナー
volumeControl.addEventListener('input', (e) => {
    hitSound.volume = e.target.value;
    gameoverSound.volume = e.target.value;
});

startButton.addEventListener('click', start);

// 画面サイズ変更時のイベントリスナー
window.addEventListener('resize', setCanvasSize);
window.addEventListener('orientationchange', setCanvasSize);

setCanvasSize(); // ページ読み込み時に初期サイズを設定
displayRanking();