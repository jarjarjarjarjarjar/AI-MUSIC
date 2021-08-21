music1 = ""
music2 = ""
socreLeftWirst = 0
socreRightWirst = 0
song1_status = ""
song2_status = ""

function preload() {
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized')
}

function draw() {
    image(video, 0, 0, 300, 300);

    fill("#FF0000")
    stroke("FF0000")

    if (socreLeftWirst > 0.2) {
        circle(leftWristX, leftWristY, 20);
        music1.stop()
        if (song2_status == false) {
            music2.play()
            document.getElementById("song").innerHTML = "loudveryloudearburstingloud"
        }
    }
    if (socreRightWirst > 0.2) {
        circle(rightWristX, rightWristY, 20);
        music2.stop()
        if (song1_status == false) {
            music1.play()
            document.getElementById("song").innerHTML = "Peterpanlovestan"
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        socreRightWirst = results[0].pose.keypoints[10].score;
        socreLeftWirst = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + socreLeftWirst)

        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY)

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY)


    }
}