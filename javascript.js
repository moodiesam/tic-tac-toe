//Gameboard object which will control the ui portion once rounds are finished

const Gameboard = (() => {

    let board = [];

    const getBoard = () => board;
    
    const createSquare = (item) => {
        const gameboard = document.getElementById('gameboard');
        const squareDiv = document.createElement('button');

        squareDiv.classList.add('square');
        squareDiv.setAttribute('id', board.indexOf(item))
        squareDiv.textContent = item;
        gameboard.appendChild(squareDiv);

        squareDiv.addEventListener('click', () => {
            if (squareDiv.textContent === '' && DisplayController.getWinnerAnnounced() == false) {
                board.splice(board.indexOf(item), 1, DisplayController.getActivePlayer().marker)
            //clear the divs
                DisplayController.clearSquares();
            //reload with new array info
                DisplayController.fillSquares();
            //check for winner
                DisplayController.checkWinner();
            //check for tie
                DisplayController.checkTie();
            //announce winner OR
            //switch active player
            if (DisplayController.getWinnerAnnounced() == true) {
                DisplayController.changeActivePlayer();
                DisplayController.announceWinner();
                };
            }
        });
    
    };

    for(let i=0; i<9; i++) {
        board[i] = ['']
        createSquare(board[i]);
    };

    const resetBoard = () => {
        for(let i=0; i<9; i++) {
            board[i] = ['']
            
        };
    }

    return { board, createSquare, resetBoard, getBoard };
})();

const DisplayController = (() => {

    let board = Gameboard.getBoard();

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
    let winnerAnnounced = false;
    let round = 0;

    const getActivePlayer = () => activePlayer;
    const getWinnerAnnounced = () => winnerAnnounced;
    

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

    const clearSquares = () => {
        const display = document.getElementById('gameboard');
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => display.removeChild(square));
    };

    function fillSquares() {
        for(let i=0; i<9; i++){
            Gameboard.createSquare(Gameboard.board[i]);
        };
    };

    function announceWinner() {
        announcements.textContent = `${activePlayer.name}` + " wins the game!";
        //end game
        //no more moves (remove event listeners)
        //ask to reset the game
    };

    function checkWinner() {
        winningCombinations.forEach((item) => {
            if(Gameboard.board[item[0]] === activePlayer.marker && Gameboard.board[item[1]] === activePlayer.marker && Gameboard.board[item[2]] === activePlayer.marker) {
                winnerAnnounced = true;
            }    
        })
        changeActivePlayer();
    };

    function announceTie() {
        announcements.textContent = 'Tie game!';
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

    function changeActivePlayer(){
        if(activePlayer === players[0]){
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        };
        announcements.textContent = `${activePlayer.name}` + " it's your turn!";
    };

  

    const playAgain = document.getElementById('playAgainButton');
    playAgain.addEventListener('click', () => {
        Gameboard.resetBoard();
        clearSquares();
        fillSquares();
        winnerAnnounced = false;
        announcements.textContent = "Player 1, it's your turn!"
    })

    
    return{ clearSquares,
        fillSquares,
        checkWinner,
        checkTie,
        announceWinner,
        announceTie,
        changeActivePlayer,
        getActivePlayer,
        getWinnerAnnounced,
        board,
        winnerAnnounced,
        activePlayer
    }
})();



