let video;
let poseNet;
let pose;

// sound clip of someone saying hello 
const music = new Audio('assets/hello.mp3');


function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);

    poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

function draw() {
    image(video, 0, 0, width, height);

    // We can call both functions to draw all keypoints and the skeletons
    if (pose) {
        //clownNose();
        handRaise();

    }
}

// some requirements need to be met
// In order for posenet to locate where the users hands are the user needs to be standing
// Subject must have their whole body visable 
// subject must put hand above head for audio to play

function handRaise() {
    if (pose.rightWrist.y < (windowHeight / 4)) {
        music.play();
    } else {
        music.pause();
    }
}


function modelReady() {
    select('#status').html('model Loaded');
}