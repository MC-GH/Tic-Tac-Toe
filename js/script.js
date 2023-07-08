//GAMEBOARD Module
const GAMEBOARD = (() => {
    const BOARDVALUES = ["","","","","","","","",""];
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
        if(BOARDVALUES[index] === "") {
            BOARDVALUES[index] = sign;
            UPDATEBOARD(sign, index);
            console.log(BOARDVALUES);
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

    return {RENDERBOARD, UPDATEBOARDVALUES, UPDATEBOARD};

})();

//PLAYER Factory Function
const PLAYER = (name, sign) => {
    const GETNAME = () => name;
    const GETSIGN = () => sign;

    return {GETNAME, GETSIGN};
}



//GAMECONTROLLER Module
const GAMECONTROLLER = (() => {
    const PLAYERONE = PLAYER("Michaël", 'X');
    const PLAYERTWO = PLAYER("God", 'O');
    let currentPlayer = PLAYERONE;
    let currentPlayerName = currentPlayer.GETNAME();
    let currentPlayerSign = currentPlayer.GETSIGN();
    //To do = set playing variable when a mode is selected to true.
    //Make it so it is unable to switch mode when active, or reset the game
    let playing = true;
    let aiActive = true;
    // const CELLS = document.querySelectorAll('.cell');

    const WINNINGCOMBINATIONS = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[6,4,2]
    ]

    
   
   const SETUPEVENTLISTENERS = () => {
    const SINGLEPLAYERBUTTON = document.querySelector('#singlePlayerButton');
    SINGLEPLAYERBUTTON.addEventListener('click', () => {
        aiActive = true;
    })

    const MULTIPLAYERBUTTON = document.querySelector('#multiplayerButton');
    MULTIPLAYERBUTTON.addEventListener('click', () => {
        aiActive = false;
    })

    const CELLS = document.querySelectorAll('.cell');
    CELLS.forEach(cell => {
        cell.addEventListener('click', () => {
            if(playing) {
                const CURRENTVALUE = cell.getAttribute('value');
                if(CURRENTVALUE !== null) {
                    console.log("Cell already occupied. Pick another.")
                } else {
                    // console.log("Active player: " + currentPlayerName);
                    //update the array of the board
                    const INDEX = cell.getAttribute('data-index');
                    GAMEBOARD.UPDATEBOARDVALUES(currentPlayerSign,INDEX);
                    SWITCHPLAYER();
                }

                if(aiActive) {
                    console.log("Active player: " + currentPlayerName);
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
            if(VALUE === null) {
                emptyCells.push(INDEX);
            }
        })
        const CHOSENINDEX = Math.floor(Math.random()*emptyCells.length);
        GAMEBOARD.UPDATEBOARDVALUES(currentPlayerSign, emptyCells[CHOSENINDEX]);
        
        // cell.setAttribute('value',currentPlayerSign);
    }


    const SWITCHPLAYER = () => {
        if(currentPlayer === PLAYERONE) {
            currentPlayer = PLAYERTWO;
            currentPlayerName = currentPlayer.GETNAME();
            currentPlayerSign = currentPlayer.GETSIGN();
        } else {
            currentPlayer = PLAYERONE;
            currentPlayerName = currentPlayer.GETNAME();
            currentPlayerSign = currentPlayer.GETSIGN();
        }
    }

    const CHECKWINNER = (BOARDVALUES) => {
        let isFull = true;
        WINNINGCOMBINATIONS.forEach(combination => {
            const [a,b,c] = combination;
            if(
                BOARDVALUES[a] === currentPlayerSign &&
                BOARDVALUES[b] === currentPlayerSign &&
                BOARDVALUES[c] === currentPlayerSign
            ) {
                console.log(currentPlayerName + " wins the game!")
                playing = false;
            }
        })

        BOARDVALUES.forEach(value => {
            if(value === '') {
                isFull = false;
            }
        })

        if(isFull) {
            console.log("The game is a tie!");
            playing = false;
        }
    }

    GAMEBOARD.RENDERBOARD();
    SETUPEVENTLISTENERS();

    return {CHECKWINNER}

})();

