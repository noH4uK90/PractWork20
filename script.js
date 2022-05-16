function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

const screenSize = { width: window.screen.width, height: window.screen.height };
const canvas = document.getElementById("canvas");
canvas.setAttribute("width", screenSize.width);
canvas.setAttribute("height", screenSize.height);
const context = canvas.getContext("2d");
let ballSpeed = { x: getRandomFloat(2, 3), y: getRandomFloat(2, 3)};
const ballRadius = 50;
const friction = 0.001;
let position = { x: ballRadius / 2, y: ballRadius / 2 };

function slowDownBall(friction, ballSpeed) {
if (friction < 0) {
    
}
if (ballSpeed.x < 0){
    const speed = ballSpeed.x + friction;
    ballSpeed.x = speed > 0 ? 0 : speed;
}
if (ballSpeed.x > 0){
    const speed = ballSpeed.x - friction;
    ballSpeed.x = speed < 0 ? 0 : speed;
}
if (ballSpeed.y < 0){
    const speed = ballSpeed.y + friction;
    ballSpeed.y = speed > 0 ? 0 : speed;
}
if (ballSpeed.y > 0){
    const speed = ballSpeed.y - friction;
    ballSpeed.y = speed < 0 ? 0 : speed;
}
    if (ballSpeed.x == 0) ballSpeed.y = 0;
    if (ballSpeed.y == 0) ballSpeed.x = 0;
}

setInterval(() => {
    context.clearRect(0, 0, screenSize.width, screenSize.height);
    context.beginPath();
    context.arc(position.x, position.y, ballRadius, 0, 2 * Math.PI, false);
    context.fill();
    position = { x: position.x + ballSpeed.x, y: position.y + ballSpeed.y };
    slowDownBall(friction, ballSpeed);
    const isMoreScreenWidth = screenSize.width < position.x + ballRadius;
    const isSmallerScreenWidth = position.x + (ballRadius / 2) <= ballRadius;
    if (isMoreScreenWidth || isSmallerScreenWidth) {
        ballSpeed.x = -ballSpeed.x;
        slowDownBall(friction * 3, ballSpeed);
    }
    const isMoreScreenHeight = screenSize.height < position.y + ballRadius;
    const isSmallerScreenHeight = position.y + (ballRadius / 2) <= ballRadius;
    if (isMoreScreenHeight || isSmallerScreenHeight) {
        ballSpeed.y = -ballSpeed.y;
        slowDownBall(friction * 3, ballSpeed);
    }
}, 1);