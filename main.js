music1 = ""
music2 = ""

function preload()
{
    music1 = loadSound("music.mp3");
    music2 = loadSound("music1.mp3");
}

function setup()
{
    canvas = createCanvas(300, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet  = ml5.poseNet(video,  modelLoaded)
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialized')
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000")
    stroke("FF0000")

    if(socreLeftWirst > 0)
    {
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY)
        removeDecimals = floor(InNumberleftWirstY)
        volume = removeDecimals/500
        document.getElementById("volume").innerHTML = "Volume" + volume
        song.setVolume(volume)
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        socreLeftWirst = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + socreLeftWirst)

        leftWristX = results[0].pose.leftWristX.x
        leftWristY = results[0].pose.leftWristY.y
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY)
        
        rightWristX = results[0].pose.rightWristX.x
        rightWristY = results[0].pose.rightWristY.y
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY)


    }
}