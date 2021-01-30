// images
CIRCLE_PATH = "images/circle.png";
CROSS_PATH = "images/cross.png";
ARROW_PATH = "images/arrow.png";
// constants
EMPTY_ITEM = 0;
CIRCLE_ITEM = 1;
CROSS_ITEM = 2;

grid = [[EMPTY_ITEM,EMPTY_ITEM,EMPTY_ITEM],[EMPTY_ITEM,EMPTY_ITEM,EMPTY_ITEM], [EMPTY_ITEM,EMPTY_ITEM,EMPTY_ITEM]];
turn = CIRCLE_ITEM;
winner = EMPTY_ITEM;

function hello() {
    console.log("hello");
    console.log(grid);
}

function player_play(x, y) {
    console.log(x, y)
    if (grid[y][x] != EMPTY_ITEM) return;
    id = "item_"+ x + "_" + y;
    item = document.getElementById(id);
    if (turn == CIRCLE_ITEM) {
        item.src = CIRCLE_PATH;
        grid[y][x] = CIRCLE_ITEM;
        if (check_win)
        console.log(check_win());
        turn = CROSS_ITEM;
    } else {
        item.src = CROSS_PATH;
        grid[y][x] = CROSS_ITEM;
        console.log(check_win());
        turn = CIRCLE_ITEM;
    }
    console.log(grid);
}

function check_win() {
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