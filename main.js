var status = "";
var object = "";
answer = [];
var video;
var speaks = window.speechSynthesis;
var UtterThis = "";
var found = false;

function setup()
{
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 300, 300)
    
    if (status)
    {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < answer.length; i++)
        {
            console.log("in the for loop");
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + object.length;

            fill("#FF0000");
            percent = floor(answer[0].confidence * 100);
            text(answer[0].label + "" + percent  + "%", answer[0].x + 15, answer[0].y + 15);
            noFill();
            stroke("#FF0000")
            rect(answer[0].x, answer[0].y, answer[0].width, answer[0].height);

            if (object == answer[i].label)
            {
                status =  object + " Found";
                stop(status);  
                
            }
        }

        // if (status != "")
        // {
        //     video = createCapture(VIDEO);
        //     video.hide();
        // }
    }
}

function start()
{
    found = false;
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object = document.getElementById("input").value;
    console.log(object);   
    video.play();
}
function stop(displayText)
{
    if(found == false)
    {
        found = true;
        video.pause();
        console.log("correct");
                    
        document.getElementById("status").innerHTML = displayText
        var utterThis = new SpeechSynthesisUtterance(displayText);
        speaks.speak(utterThis);
    }
}

function modelLoaded()
{
    console.log("Model Loaded !");
    status = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    else {
        console.log(results);
        answer = results;
    }
}
