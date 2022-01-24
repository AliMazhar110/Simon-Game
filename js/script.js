var intro = "";
function introPlay(){
    intro = new Audio("sounds/epic.mp3");
    intro.play();
}
function makeSound(key){
    var audio;
    switch(key){
        case "red":
            audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "yellow":
            audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        case "green":
            audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "blue":
            audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "wrong":
            audio = new Audio("sounds/wrong.mp3");
            audio.play();
            break;
        default:
            console.log(key);
    }
}
function playintro(){
    if(intro!=""){
        document.querySelector(".fa-volume-up").style.fontSize = "30px";
        document.querySelector(".fa-volume-mute").style.fontSize = "0px";
        intro.play();   
    }
}
function muteIntro(){
    document.querySelector(".fa-volume-up").style.fontSize = "0px";
    document.querySelector(".fa-volume-mute").style.fontSize = "30px";
    if(intro!=""){
        intro.pause();   
    } 
}

var btn_no = document.querySelectorAll("button").length;
var gamePattern = [];
var userPattern = [];
var count = 0;
var level = 0;
var buttonColors = ["red", "yellow", "green", "blue"];

function tracker(){
    if(gamePattern[count] == userPattern[count]){
        if(count==gamePattern.length-1){
            count=0;
            userPattern=[];
            setTimeout(nextSequence, 000);
        }
        else{
            count+=1;
        }
    }
    else if(gamePattern[count] != userPattern[count] && level != 0){
        makeSound("wrong");
        document.querySelector(".container").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector(".container").style.backgroundColor = "#000000";
        },300);
        document.querySelector("h1").innerHTML = "Wrong Pattern! Press Any Key to Try Again.";
        level = 0;
        setTimeout(playintro,2000);
    }
}

function nextSequence(){
    level+=1;
    document.querySelector("h1").innerHTML = "Level - "+level;
    var randomNumber = Math.floor(Math.random()*4);
    gamePattern.push(buttonColors[randomNumber]);
    console.log(gamePattern)
    makeSound(gamePattern[gamePattern.length-1]);
    document.querySelector("."+gamePattern[gamePattern.length-1]).classList.add("highlighter");
    setTimeout(function(){document.querySelector("."+gamePattern[gamePattern.length-1]).classList.remove("highlighter");},500);
}

for(var i=0; i<btn_no; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function(){
        var color = this.classList[0];
        makeSound(color);
        userPattern.push(color);
        tracker();
    });        
}

document.addEventListener("keypress", function(){
    if(level==0){
        muteIntro();
        count = 0;
        level = 0;
        userPattern = [];
        gamePattern = [];
        setTimeout(nextSequence, 500);
    }
});

document.querySelector(".fa-volume-mute").addEventListener("click", function(){
    this.style.fontSize = "0px";
    document.querySelector(".fa-volume-up").style.fontSize = "30px";
});

document.querySelector(".fa-volume-up").addEventListener("click", function(){
    this.style.fontSize = "0px";
    document.querySelector(".fa-volume-mute").style.fontSize = "30px";
    intro.pause();
});
