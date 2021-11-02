let cells = document.querySelectorAll('.cell')
let board = document.querySelector('#board')

// win message
let message = document.querySelector('#message') as HTMLDivElement
// winner on win message
let winner = document.querySelector('#winner') as HTMLParagraphElement

// total steps
let steps: number

// enum player
enum Player{
    X = 'x',
    O = 'o'
}
let curPlayer: Player

// win array
let winArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

gameInit()

//game init and restart
function gameInit(){
    message.style.display = 'none'
    steps = 0
    curPlayer = Player.X
    board.classList.remove(Player.X, Player.O)
    board.classList.add(Player.X)
    cells.forEach(item => {
        let cell = item as HTMLDivElement
        cell.classList.remove(Player.X, Player.O)
        cell.removeEventListener('click',clickCell)
        cell.addEventListener('click', clickCell, { once: true })
    })
}


//restart button
const btn = document.querySelector('#restart') as HTMLButtonElement
btn.addEventListener('click', gameInit)


//click cell
function clickCell(event: MouseEvent){
    let target = event.target as HTMLDivElement

    target.classList.add(curPlayer)
    //change board hint for player
    steps++

    if (checkWin(curPlayer)) {
        message.style.display = 'block'
        winner.innerText = `${curPlayer.toUpperCase()} Win!`
        return
    }
    if (checkEqual(steps)) {
        message.style.display = 'block'
        winner.innerText = 'Nobody Win!'
        return
    }
    //change current player
    curPlayer = curPlayer === Player.X ? Player.O : Player.X
    //show player hint on board
    board.classList.remove(Player.X, Player.O)
    board.classList.add(curPlayer)
}


// check win
const checkWin = (player: Player) => {
    return winArr.some(item => {
        let cel1 = item[0]
        let cel2 = item[1]
        let cel3 = item[2]
        if (
            hasClass(cells[cel1], player) &&
            hasClass(cells[cel2], player) &&
            hasClass(cells[cel3], player)
        ) {
            return true
        } else {
            return false
        }
    })
}

// check if cell has a specific class
const hasClass = (ele: Element, name: string) => ele.classList.contains(name)

//check equal
const checkEqual = (steps: number) => steps === 9


