//Array with all available colors-->
var buttoncolors=["red","blue","green","yellow"];
//Empty array for storing pattern of the game-->
var gamepattern=[];
//Array to remeber the pattern-->
var userClickedPattern=[];
//To make sure game has not started-->
var started=false;
//Set level 0-->
var level=0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextsequence();
        started=true;
    }

});


//TO store the choices made by the user each step-->
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatepress(userChosenColor);
    checkanswer(userClickedPattern.length-1);
});

function checkanswer(currentLevel){
    if(gamepattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamepattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextsequence();
           },1000);
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        var wrong=new Audio("sounds/wrong.mp3");
        wrong.play();
        $("#level-title").text("Game Over!! Press any key to Restart!");
        startover();
        console.log("wrong");
        
    }

    
}

//To determine sequence of color chosen-->
function nextsequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttoncolors[randomNumber];
    gamepattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
    
    
}



function playsound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatepress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed")
    },100);

}

function startover(){
    level=0;
    gamepattern=[];
    started=false;
}

