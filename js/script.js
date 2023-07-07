//Modules to create: gameBoard, displayController
//FactoryFunction to create: Player


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
    let playing = true;

    const WINNINGCOMBINATIONS = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[6,4,2]
    ]
   
   const SETUPEVENTLISTENERS = () => {
    const CELLS = document.querySelectorAll('.cell');
    CELLS.forEach(cell => {
        cell.addEventListener('click', () => {
            if(playing) {
                const CURRENTVALUE = cell.getAttribute('value');
                if(CURRENTVALUE !== null) {
                    console.log("Cell already occupied. Pick another.")
                } else {
                    console.log("Active player: " + currentPlayerName);
                    cell.setAttribute('value', currentPlayerSign);
                    //update the array of the board
                    const INDEX = cell.getAttribute('data-index');
                    GAMEBOARD.UPDATEBOARDVALUES(currentPlayerSign,INDEX);
                    SWITCHPLAYER();
                }
            }
        })
    })
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
    }

    GAMEBOARD.RENDERBOARD();
    SETUPEVENTLISTENERS();

    return {CHECKWINNER}

})();

