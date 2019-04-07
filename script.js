$ = jQuery;

var mood = 1;

var maxHunger = 100,
    currentHunger = maxHunger,
    hungerValue = 1;
var hungerTime = 1000;

var maxEnergy = 100,
    currentEnergy = maxEnergy;

var storageFood = 0,
    maxStorageFood = 20;
var storageSticks = 0,
    maxStorageSticks = 20;


function lowerNeed(need, needValue, time, className){   
    setInterval(function(){
        need = need - needValue;
        $(className).html(need);
    }, time);
}


$(document).ready(function () {

    // Initialization
    console.log("ready!");

    $('.hunger').html(maxHunger);
    $('.energy').html("Energy " + maxEnergy);

    $('.food').html(storageFood);
    // $('.sticks').html("Sticks " + storageSticks);

    // Automatic Intervalls
    setInterval(function(){
        if((storageFood > 0) && (currentHunger < maxHunger)) {
            storageFood = storageFood - 1;
            currentHunger = currentHunger + 5;
            $('.food').html(storageFood);
        } else {
            currentHunger = currentHunger - 1;
        }

        $('.hunger').html(currentHunger);
        if (currentHunger < 50){
            mood = 0;
        }
    }, hungerTime);

    setInterval(function(){
        if (mood == 0){
            $('#youImg').attr("src","img/youSad.jpg");
        } else {
            $('#youImg').attr("src","img/you.jpg");
        }
    }, 1000);

    // Actions
    $(".collectFood").click(function(){
        storageFood = storageFood + 1;
        console.log("FOOD!!!!");
        $('.food').html(storageFood);
    })
});