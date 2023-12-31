//GAMEBOARD Module
const GAMEBOARD = (() => {
    const BOARDVALUES = ["", "", "", "", "", "", "", "", ""];
    const BOARDFRAME = document.querySelector('#gameBoard');

    const RENDERBOARD = () => {
        let valueIndex = 0;
        BOARDVALUES.forEach(value => {
            const CELL = document.createElement('div');
            CELL.classList.add("cell");
            CELL.setAttribute('data-index', valueIndex);
            valueIndex++;
            BOARDFRAME.appendChild(CELL);
        })
    }
    //Responsible to update the array holding the values
    const UPDATEBOARDVALUES = (sign, index) => {
        if (BOARDVALUES[index] === "") {
            BOARDVALUES[index] = sign;
            UPDATEBOARD(sign, index);
            GAMECONTROLLER.CHECKWINNER(BOARDVALUES);
        } else {
            console.log("There is already a sign here!")
        }
    }
    //Responsible to visually update the board based on the array values
    const UPDATEBOARD = (sign, index) => {
        const CELL = document.querySelector(`[data-index="${index}"]`);
        CELL.textContent = sign;
        CELL.setAttribute('value', sign);
    }

    const RESETBOARD = () => {
        BOARDVALUES.fill("");
        const CELLS = document.querySelectorAll('.cell');
        CELLS.forEach(cell => {
            BOARDFRAME.removeChild(cell);
        })
    }

    const ISBOARDBLANK = () => {
        //Returns true if every array value is '';
        return BOARDVALUES.every(value => value === '');
    }

    return { RENDERBOARD, UPDATEBOARDVALUES, UPDATEBOARD, ISBOARDBLANK, RESETBOARD };

})();

//PLAYER Factory Function
const PLAYER = (name, sign) => {
    const GETNAME = () => name;
    const GETSIGN = () => sign;

    return { GETNAME, GETSIGN };
}

//GAMECONTROLLER Module
const GAMECONTROLLER = (() => {
    let playerOne = PLAYER("Player X", 'X');
    let playerTwo = PLAYER("Computer", 'O');
    let currentPlayer = playerOne;
    let playing = true;
    let aiActive = true;
    const WINNERTEXT = document.querySelector('#winner');

    const WINNINGCOMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [6, 4, 2]
    ]

    const CREATEPLAYERS = () => {
        if (aiActive) {
            playerOne = PLAYER("Player X", 'X');
            playerTwo = PLAYER("Computer", 'O');
            currentPlayer = playerOne;

        } else {
            playerOne = PLAYER("Player X", 'X');
            playerTwo = PLAYER("Player O", 'O');
            currentPlayer = playerTwo;
        }
    }

    const SETUPEVENTLISTENERS = () => {
        const SINGLEPLAYERBUTTON = document.querySelector('#singlePlayerButton');
        SINGLEPLAYERBUTTON.addEventListener('click', () => {
            if (!playing || GAMEBOARD.ISBOARDBLANK()) {
                aiActive = true;
                CREATEPLAYERS();
                UPDATEGAMEINFO();
            }
        })

        const MULTIPLAYERBUTTON = document.querySelector('#multiplayerButton');
        MULTIPLAYERBUTTON.addEventListener('click', () => {
            if (!playing || GAMEBOARD.ISBOARDBLANK()) {
                aiActive = false;
                CREATEPLAYERS();
                UPDATEGAMEINFO();
            }
        })

        const RESETBUTTON = document.querySelector('#resetButton');
        RESETBUTTON.addEventListener('click', () => {
            GAMEBOARD.RESETBOARD();
            GAMEBOARD.RENDERBOARD();
            playing = true;
            CREATEPLAYERS();
            SETUPEVENTLISTENERS();
            UPDATEGAMEINFO();
            WINNERTEXT.textContent = "";

        });

        const CELLS = document.querySelectorAll('.cell');
        CELLS.forEach(cell => {
            cell.addEventListener('click', () => {
                if (playing) {
                    const CURRENTVALUE = cell.getAttribute('value');
                    if (CURRENTVALUE !== null) {
                        console.log("Cell already occupied. Pick another.");
                        return;
                    } else {
                        //update the array of the board
                        const INDEX = cell.getAttribute('data-index');
                        GAMEBOARD.UPDATEBOARDVALUES(currentPlayer.GETSIGN(), INDEX);
                        SWITCHPLAYER();
                    }
                    //If we are still playing & ai is active
                    if (aiActive && playing) {
                        MAKERANDOMMOVE();
                        SWITCHPLAYER();
                    }
                }
            })
        })
    }

    const MAKERANDOMMOVE = () => {
        //Fetch all empty cells, store them in an array
        //Return a random cell => call the UPDATEBOARDVALUES function
        const emptyCells = [];
        const CELLS = document.querySelectorAll('.cell');
        CELLS.forEach(cell => {
            const VALUE = cell.getAttribute('value');
            const INDEX = cell.getAttribute('data-index');
            if (VALUE === null) {
                emptyCells.push(INDEX);
            }
        })
        const CHOSENINDEX = Math.floor(Math.random() * emptyCells.length);
        GAMEBOARD.UPDATEBOARDVALUES(currentPlayer.GETSIGN(), emptyCells[CHOSENINDEX]);
    }


    const SWITCHPLAYER = () => {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    }

    const CHECKWINNER = (BOARDVALUES) => {
        let isFull = true;
        WINNINGCOMBINATIONS.forEach(combination => {
            const [a, b, c] = combination;
            if (
                BOARDVALUES[a] === currentPlayer.GETSIGN() &&
                BOARDVALUES[b] === currentPlayer.GETSIGN() &&
                BOARDVALUES[c] === currentPlayer.GETSIGN()
            ) {
                WINNERTEXT.textContent = currentPlayer.GETNAME() + " wins the game! Congratulations!";
                playing = false;
            }
        })

        BOARDVALUES.forEach(value => {
            if (value === '') {
                isFull = false;
            }
        })

        if (isFull && playing) {
            WINNERTEXT.textContent = "The game is a tie!";
            playing = false;
        }
    }

    const UPDATEGAMEINFO = () => {
        const GAMEMODEINFO = document.querySelector('#mode');
        GAMEMODEINFO.textContent = aiActive ? "Current mode: Single Player" : "Current mode: 2 Players";
    }

    GAMEBOARD.RENDERBOARD();
    SETUPEVENTLISTENERS();
    UPDATEGAMEINFO();

    return { CHECKWINNER }

})();

