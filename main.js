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

function draw()
{
    image(video, 0, 0, 600, 500);
}