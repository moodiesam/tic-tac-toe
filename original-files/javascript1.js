let board = [];
let round = 0;
const announcements = document.getElementById('announcements');

function createBoard() {
    announcements.textContent = `${activePlayer.name}` + " it's your turn!";
    for(let i=0; i<9; i++) {
        board[i] = ['']
        createSquare(board[i]);
    }
};

function createSquare (item) {
    const gameboard = document.getElementById('gameboard');
    const squareDiv = document.createElement('button');

    squareDiv.classList.add('square');
    squareDiv.setAttribute('id', board.indexOf(item))
    squareDiv.textContent = item;
    gameboard.appendChild(squareDiv);

    squareDiv.addEventListener('click', () => {
        if (squareDiv.textContent === '') {
            board.splice(board.indexOf(item), 1, activePlayer.marker)
        //clear the divs
        clearSquares();
        //reload with new array info
        fillSquares();
        //check for winner
        checkWinner();
        //check for tie
        checkTie();
        //announce winner OR
        //switch active player
        if (winnerAnnounced == true) {
            announceWinner();
        } else {changeActivePlayer();}
        }
    })
};

function clearSquares() {
    const display = document.getElementById('gameboard');
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => display.removeChild(square));
};

function fillSquares() {
    for(let i=0; i<9; i++){
        createSquare(board[i]);
    }
};

let winnerAnnounced = false;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function checkWinner() {
    winningCombinations.forEach((item) => {
        if(board[item[0]] === activePlayer.marker && board[item[1]] === activePlayer.marker && board[item[2]] === activePlayer.marker) {
            winnerAnnounced = true;
        } 
    })

};

function announceWinner() {
    console.log('wins?')
    announcements.textContent = `${activePlayer.name}` + " wins the game!";
    //end game
    //no more moves (remove event listeners)
    //ask to reset the game
};

function checkTie() {
    round += 1;
    if (round === 9) {
        announceTie();
    }
};

function announceTie() {
    announcements.textContent = 'Tie game!';
    //end game
    //no more moves (remove event listeners)
    //ask to reset the game
}

function changeActivePlayer(){
    if(activePlayer === players[0]){
        activePlayer = players[1];
    } else {
        activePlayer = players[0];
    };
    announcements.textContent = `${activePlayer.name}` + " it's your turn!";
};

//restart button

const playAgain = document.getElementById('playAgainButton');
playAgain.addEventListener('click', () => {
    board = [];
    clearSquares();
    createBoard();
    winnerAnnounced = false;
    announcements.textContent = "Player 1, it's your turn!"
})

const players = [
    {
        name: 'Player 1',
        marker: 'X'
    },
    {
        name: 'Player 2',
        marker: 'O'
    }
];

let activePlayer = players[0];

createBoard();
