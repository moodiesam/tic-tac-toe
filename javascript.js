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












// // creating the boardgame
// //it represents the state of the BOARD

// let Gameboard = function() {
    
//     //create the array for the gameboard... 9 empty spaces in the array
//     let board = [];

//     for (i=0; i<9; i++) {
//         board[i] = [''];
//     };
//     const getBoard = () => board;
    
//     return {getBoard};
// }();

// console.log([Gameboard]);

// //create the board

// function fillBoard () {
//     for (let i=0; i<9; i++){
//         createSquare(board)
//     }
// }


// //creating two players (X and O)

// GameController = function() {

//     let board = Gameboard;

//     const players = [
//         {
//             name: 'Player One',
//             marker: 'X'
//         },
//         {
//             name: 'Player Two',
//             marker: 'O'
//         }
//     ];

//     let activePlayer = players[0];

//     // two functions
//     //1. switching whos turn it is
//     //2, get the current active player

//     const switchActivePlayer = () => {
//         activePlayer = activePlayer === players[0] ? players[1] : players[0];
//     };

//     const getActivePlayer = () => activePlayer;

//     const playRound = () => {
//         switchActivePlayer();
//     }

//     // let getActivePlayer = function() {
//     //     let activePlayer = players[0];
//     //     return function() {
//     //         if (activePlayer === players[0]) {
//     //             activePlayer = players[1];
//     //         } else {
//     //             activePlayer = players[0];
//     //         }
//     //         return activePlayer;
//     //     }
//     // };
//     // getActivePlayer();
//     console.log(players);
//     return {players, playRound, activePlayer};
// }();

// console.log([GameController]);
