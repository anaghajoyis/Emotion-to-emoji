classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/GkTuz-2bz/model.json',modelLoaded);
function modelLoaded(){
    console.log("model loaded successfully")
}
Webcam.set({
    width: 400,
    height: 350,
    imageformat: 'png',
    png_quality: 90
});
var webcam = document.getElementById("camera");
Webcam.attach("#camera");
var prediction1="";
var prediction2="";
function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="c_img" src="'+data_uri+'">';
    });
}
function speak(){
    var synth = window.speechSynthesis;
    var speak1 = "The 1st prediction is" + prediction1;
    var speak2 = "The 2nd prediction is" + prediction2;
    var utterthis = new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterthis);
}
function getresult(){
    var img = document.getElementById("c_img");
    classifier.classify(img,gotresult);
}
function gotresult(error,result){
    if (error){
        console.error(error);
    } else{
        console.log(result);
        prediction1=result[0].label;
        prediction2=result[1].label;
        document.getElementById("result_emotion_name").innerHTML="Prediction 1: "+ prediction1;
        document.getElementById("result_emotion_name2").innerHTML="Prediction 2: "+ prediction2;
        document.getElementById("emoji1").innerHTML="HELLOOO"; 
        speak();
        if (result[0].label=="Happy!"){
            document.getElementById("emoji1").innerHTML="HELLOOOOOOO";
        }
    }
}