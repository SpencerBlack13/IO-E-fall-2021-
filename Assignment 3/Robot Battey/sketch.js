/* 
November 8th, 2021 - Spencer Black

-Sketch.js
-poseNet 

I originally made the game to be a balloon popping game. But I decided to create my own graphics and make it more playful by implimenting a robot and a battery.
*/

let video;
let poseNet;
let pose;

let isBalloon;
let balloonX;
let balloonY;
let balloonCollisionThreshold;
let balloonSpawnThreshold;

//Assets
function preload() {
    img1 = loadImage('assets/battery.png');
    img2 = loadImage('assets/robot.png');
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);

    poseNet.on('pose', gotPoses);
    
    isBalloon = false;
    balloonCollisionThreshold = 100;
    balloonSpawnThreshold = 300;
}

function gotPoses(poses) {
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

function draw() {
    image(video, 0, 0, width, height);
    
    // Spawn new balloon
    if (!isBalloon)
        SpawnBalloon();
    
    // Display user image
    image(img1, balloonX-100, balloonY-100, 100, 200);
    
    // Display balloon
    if (pose){
        image(img2, pose.leftWrist.x, pose.leftWrist.y, 200, 300);
        CollisionDetection();
    }
    
}

// Detect when hand is over balloon
function CollisionDetection(){
    if (pose.leftWrist.x > balloonX - balloonCollisionThreshold && 
        pose.leftWrist.x < balloonX + balloonCollisionThreshold &&
        pose.leftWrist.y < balloonY + balloonCollisionThreshold && 
        pose.leftWrist.y > balloonY - balloonCollisionThreshold){
        
        // Hand over balloon position
        isBalloon = false;
    }
}

//The function is from stackoverflow 
//https://stackoverflow.com/questions/5842747/how-can-i-use-javascript-to-limit-a-number-between-a-min-max-value/5842770
// Clamp value between two numbers
function Clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}

// Spawn balloon randomly on the screen
function SpawnBalloon(){
    balloonX = Clamp((Math.floor(Math.random() * windowWidth)), balloonSpawnThreshold, windowWidth-balloonSpawnThreshold);
    balloonY = Clamp((Math.floor(Math.random() * windowHeight)), balloonSpawnThreshold, windowHeight-balloonSpawnThreshold);
    isBalloon = true;
}

function modelReady() {
    select('#status').html('model Loaded');
}