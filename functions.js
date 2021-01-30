// images
EMPTY_PATH = "images/empty.png";
CIRCLE_PATH = "images/circle.png";
CROSS_PATH = "images/cross.png";
ARROW_PATH = "images/arrow.png";
// constants
EMPTY_ITEM = 0;
CIRCLE_ITEM = 1;
CROSS_ITEM = 2;

gameOver = false;
grid = [[EMPTY_ITEM,EMPTY_ITEM,EMPTY_ITEM],[EMPTY_ITEM,EMPTY_ITEM,EMPTY_ITEM], [EMPTY_ITEM,EMPTY_ITEM,EMPTY_ITEM]];
turn = CIRCLE_ITEM;
winner = EMPTY_ITEM;
scoreOne = 0;
scoreTwo = 0;


window.addEventListener('load', function () {
    timer();
})

function playerPlay(x, y) {
    console.log(x, y)
    if (gameOver || grid[y][x] != EMPTY_ITEM) return;
    id = "item_"+ x + "_" + y;
    item = document.getElementById(id);
    if (turn == CIRCLE_ITEM) {
        item.src = CIRCLE_PATH;
        grid[y][x] = CIRCLE_ITEM;
        if (checkWin()) {
            winner = CIRCLE_ITEM;
            scoreOne += 1
            document.getElementById("score_1").innerHTML=scoreOne;
            reset();
        }
        turn = CROSS_ITEM;
        document.getElementById("arrow_1").src = EMPTY_PATH;
        document.getElementById("arrow_2").src = ARROW_PATH;
    } else {
        item.src = CROSS_PATH;
        grid[y][x] = CROSS_ITEM;
        if (checkWin()) {
            winner = CROSS_ITEM;
            scoreTwo += 1
            document.getElementById("score_2").innerHTML=scoreTwo;
            reset();
        }
        turn = CIRCLE_ITEM;
        document.getElementById("arrow_1").src = ARROW_PATH;
        document.getElementById("arrow_2").src = EMPTY_PATH;
    }
    console.log(grid);
}

function checkWin() {
    // check if diagonal win
    if (grid[0][0] != EMPTY_ITEM && grid[0][0] == grid[1][1]   && grid[1][1] == grid[2][2]                             
        || grid[2][0] != EMPTY_ITEM && grid[2][0] == grid[1][1]  && grid[1][1] == grid[0][2]) {
            return true;
    }
    for (i = 0; i < grid.length; i++) {
        if (grid[0][i] != EMPTY_ITEM && grid[0][i] == grid[1][i] && grid[0][i] == grid[2][i]    // row win
            || grid[i][0] != EMPTY_ITEM && grid[i][0] == grid[i][1] && grid[i][0] == grid[i][2] // column win
            ) {
            return true;
        }
    }
    return false;
}

function reset() {
    grid = [[EMPTY_ITEM,EMPTY_ITEM,EMPTY_ITEM],[EMPTY_ITEM,EMPTY_ITEM,EMPTY_ITEM], [EMPTY_ITEM,EMPTY_ITEM,EMPTY_ITEM]];
    for (i = 0; i < grid.length; i++) {
        document.getElementById("item_" + 0 + "_" + i).src = EMPTY_PATH;
        document.getElementById("item_" + 1 + "_" + i).src = EMPTY_PATH;
        document.getElementById("item_" + 2 + "_" + i).src = EMPTY_PATH;
    }
}

function timer() {
    // Set the date we're counting down to
    var countDownDate = new Date(new Date().getTime() + 3*60000);;

    // Update the count down every 1 second
    var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();
        
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
        
    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var totalSeconds = Math.floor(distance / 1000) + 1
    console.log(totalSeconds);
    progress = (totalSeconds / 180)*100
    console.log(progress);
    update_progress_bar(progress)
        
    // Output the result in an element with id="demo"
    document.getElementById("timer_text").innerHTML = minutes + "m " + seconds + "s ";
        
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        timerEnd();
    }
    }, 1000);
}

function update_progress_bar(progress) {
    $('#progress-bar').width(progress + "%").attr('aria-valuenow', progress)

}

function timerEnd() {
    winner = EMPTY_PATH;
    loser = EMPTY_PATH;
    winnerPoint = scoreOne;
    looserPoint = scoreTwo;
    if(scoreOne > scoreTwo) {
        winner = CIRCLE_ITEM;
        loser = CROSS_ITEM;
        winnerPoint = scoreOne;
        looserPoint = scoreTwo;
    } else if(scoreOne < scoreTwo) {
        winner = CROSS_ITEM;
        loser = CIRCLE_ITEM;
        winnerPoint = scoreTwo;
        looserPoint = scoreOne;
    }
    winnerMessage = "";
    if (winner == EMPTY_PATH) {
        winnerMessage = "DRAW ! " + scoreOne + " / " + scoreTwo;
    } else {
        winnerMessage = "WINNER " + (winner == CIRCLE_ITEM ? "player 1 with circle " : "player 2 with crosses ") + winnerPoint + " / " + looserPoint;
    }
    alert(winnerMessage);
    gameOver = true;
    document.getElementById("timer_text").innerHTML = winnerMessage;
}