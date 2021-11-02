var cells = document.querySelectorAll('.cell');
var board = document.querySelector('#board');
// win message
var message = document.querySelector('#message');
// winner on win message
var winner = document.querySelector('#winner');
// total steps
var steps;
// enum player
var Player;
(function (Player) {
    Player["X"] = "x";
    Player["O"] = "o";
})(Player || (Player = {}));
var curPlayer;
// win array
var winArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
gameInit();
//game init and restart
function gameInit() {
    message.style.display = 'none';
    steps = 0;
    curPlayer = Player.X;
    board.classList.remove(Player.X, Player.O);
    board.classList.add(Player.X);
    cells.forEach(function (item) {
        var cell = item;
        cell.classList.remove(Player.X, Player.O);
        cell.removeEventListener('click', clickCell);
        cell.addEventListener('click', clickCell, { once: true });
    });
}
//restart button
var btn = document.querySelector('#restart');
btn.addEventListener('click', gameInit);
//click cell
function clickCell(event) {
    var target = event.target;
    target.classList.add(curPlayer);
    //change board hint for player
    steps++;
    if (checkWin(curPlayer)) {
        message.style.display = 'block';
        winner.innerText = curPlayer.toUpperCase() + " Win!";
        return;
    }
    if (checkEqual(steps)) {
        message.style.display = 'block';
        winner.innerText = 'Nobody Win!';
        return;
    }
    //change current player
    curPlayer = curPlayer === Player.X ? Player.O : Player.X;
    //show player hint on board
    board.classList.remove(Player.X, Player.O);
    board.classList.add(curPlayer);
}
// check win
var checkWin = function (player) {
    return winArr.some(function (item) {
        var cel1 = item[0];
        var cel2 = item[1];
        var cel3 = item[2];
        if (hasClass(cells[cel1], player) &&
            hasClass(cells[cel2], player) &&
            hasClass(cells[cel3], player)) {
            return true;
        }
        else {
            return false;
        }
    });
};
// check if cell has a specific class
var hasClass = function (ele, name) { return ele.classList.contains(name); };
//check equal
var checkEqual = function (steps) { return steps === 9; };
