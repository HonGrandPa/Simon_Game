var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var flag = true;


//Generate randomNumber
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber]

    //random color
    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
    makeSound(randomChosenColour);

    gamePattern.push(randomChosenColour);

    $("h1").text("Level: " + level);
    level++;
}



//Input Audio
function makeSound(input) {

    let audio = new Audio("./sounds/" + input + ".mp3");
    audio.play();
}

//game start data store -> gamePattern [red] level:0
//Click data store > userPatter [red]
//check
//preses state data store -> gampattern [red blue] levl:1
//click data store -> userPattern [red red  blue]

//let user store the state first but how ?
//first make sure the length are equal 
//check the element
function checkAnswer(currentLevel) {


    if (userClickedPattern.length === currentLevel) {

        //same length


        //now checking 
        for (var i = 0; i < currentLevel; i++) {

            if (userClickedPattern[i] === gamePattern[i]) {

                console.log("Success")

            } else {

                console.log("Fail")

                $("body").addClass("game-over")

                //$(".btn").off("click")

                setTimeout(function () {

                    $("body").removeClass("game-over")

                    $("h1").text("Game Over, Press Any Key to Restart");

                }, 200)

                gamePattern = [];

                $(document).on("keypress", function () {



                    level = 0
                    gamePattern = [];
                    nextSequence();
                    userClickedPattern = [];
                    $(document).off("keypress");
                    $(".btn").on("click")
                    //deactivated the button
                    $(document).off("keypress");
                    



                });

                break;

            }


        }
















        //makeusre the run until last element in the arr
        if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {

            setTimeout(function () {

                nextSequence();

            }, 1000);

            userClickedPattern = []

        }






    } else {

        console.log("need more input")
    }

}




$(document).on("keypress", function () {

    nextSequence();


    $(".btn").on("click")
    //deactivated the button
    $(document).off("keypress");


});

$(".btn").on("click", function () {

    var userChosenColour = this.id;
    makeSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    //add animation
    $("#" + userChosenColour).addClass("pressed");
    //back to origin img
    setTimeout(function () {
        $("#" + userChosenColour).removeClass("pressed");
    }, 150)

    checkAnswer(level);



})









