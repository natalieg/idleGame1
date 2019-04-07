$ = jQuery;

var time = 1000;
var isGameActive = true;
var myTimerVar;
var counter = 1;

var mood = 1;

var maxHunger = 100,
    currentHunger = maxHunger,
    hungerValue = 1;
var hungerTime = 1000;

var maxEnergy = 100,
    currentEnergy = maxEnergy;

var storageFood = 2, // Testvalue
    maxStorageFood = 40,
    foodValue = 5,
    eatAmount = 1,
    collectFoodAmountMax = 5,
    collectingFoodTime = 20; //TESTVALUE
var canCollect = true;
var storageSticks = 0,
    maxStorageSticks = 20;

function changeGameStatus(newStatus) {
    if (newStatus) {
        myTimerVar = setInterval(globalTimer, time);
    } else {
        clearInterval(myTimerVar);
        console.log("Stop Playing");
    }
}

/**
 * Checks if there is food in the storage
 * if this is the case, the player is fed, 
 * when no food is available, the hunger value
 * is rising (in this case going down)
 */
function checkHungerAndFood() {
    if (storageFood > 0) {
        if ((currentHunger == maxHunger) && (counter % 4 == 0)) {
            storageFood = storageFood - eatAmount;
            console.log("Hunger is fulfilled");
        } else if (currentHunger < maxHunger) {
            currentHunger = currentHunger + foodValue;
            if (currentHunger > maxHunger) {
                currentHunger = maxHunger;
            }
            storageFood = storageFood - eatAmount;
        }
    } else {
        if (currentHunger > 0) {
            currentHunger = currentHunger - 1; //#MAYBE might decrease slower later? if it makes sense?
        }
    }

    switch (true) {
        case (currentHunger >= 51):
            mood = 1;
            $('.hungerBar').css("background-color", "green");
            break;
        case ((currentHunger < 51) && (currentHunger > 10)):
            mood = 0;
            $('.hungerBar').css("background-color", "yellow");
            break;
        case (currentHunger <= 10):
            $('.hungerBar').css("background-color", "red");
            break;
        default:
            console.log("Something went wrong in the Switch");
    }

    $('.hungerBar').width(currentHunger);
    $('.hunger').html(currentHunger);
    $('.food').html(storageFood);

    if (mood == 0) {
        $('#youImg').attr("src", "img/youSad.jpg");
    } else {
        $('#youImg').attr("src", "img/you.jpg");
    }
}

function getRandomFood() {
    min = Math.ceil(1);
    max = Math.floor(collectFoodAmountMax);
    return Math.floor(Math.random() * (max - min +1)) + min; 
}

function myFunction(p1, p2) {
    return p1 * p2;   // The function returns the product of p1 and p2
}

// Automatic Intervalls

function globalTimer() {
    checkHungerAndFood();
    counter = counter + 1;
    // console.log("Counter: " + counter);
    if (counter > 1000) {
        counter = 0;
    }
}

$(document).ready(function () {

    // Initialization
    myTimerVar = setInterval(globalTimer, time);
    console.log("ready!");

    $('.hunger').html(maxHunger);
    $('.energy').html("Energy " + maxEnergy);

    $('.food').html(storageFood);
    // $('.sticks').html("Sticks " + storageSticks);

    // Actions

    /**
     * Action
     * Food will be collected in "collectingFoodTime"
     * if the storage is full the user cannot collect anything
     */
    $(".collectFood").click(function () {
        if(storageFood < maxStorageFood){
            if(canCollect){
                var barWidthDecrease = 100 / collectingFoodTime;
                var currentWidth = 100;
                var i = 1;
                function myLoop() {
                    setTimeout(function () {
                        canCollect = false;
                        $('.collectFood').attr('disabled','disabled');
                        currentWidth = currentWidth - barWidthDecrease;
                        $('.collectFoodBar').width(currentWidth);
                        i++;
                        if (i < collectingFoodTime + 1) {
                            myLoop();
                        } else {
                            var foundFood = getRandomFood();
                            storageFood = storageFood + foundFood;
                            console.log("Collected Food!");
                            $('.lastCollected').html("Collected: " + foundFood);
                            $('.food').html(storageFood);
                            $('.collectFoodBar').width(100);
                            canCollect = true;
                        }
                    }, 100)
                }
                myLoop();
            } else {
                console.log("Not yet");
            }
        } 
    });


    $(".stopStart").click(function () {
        isGameActive = !isGameActive;
        changeGameStatus(isGameActive);
    })
});