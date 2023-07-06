//Modules to create: gameBoard, displayController
//FactoryFunction to create: Player


//GAMEBOARD Module
const GAMEBOARD = (() => {
    const BOARDVALUES = ["","","","","","","","",""];
    const BOARDFRAME = document.querySelector('#gameBoard');

    const RENDERBOARD = () => {
        // let valueIndex = 0;
        BOARDVALUES.forEach(value => {
            const CELL = document.createElement('div');
            CELL.classList.add("cell");
            //Data attribute stored should be X or O
            // CELL.setAttribute('data-attribute', BOARDVALUES[valueIndex]);
            // valueIndex++;
            // CELL.textContent = valueIndex;
            BOARDFRAME.appendChild(CELL);
        })
    }

    return {RENDERBOARD};

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

    const WINNINGCOMBINATIONS = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[6,4,2]
    ]

    GAMEBOARD.RENDERBOARD();

    //2 dingen moeten gebeuren bij klik: sign van huidige player moet naar Array gepushed worden
    //Mogelijks functie updateBOARD bij GAMEBOARD toevoegen
    
    const SETUPEVENTLISTENERS = () => {
        const CELLS = document.querySelectorAll('.cell');
        CELLS.forEach(cell => {
            cell.addEventListener('click', () => {
                const DATAVALUE = cell.setAttribute('data-attribute', currentPlayer.GETNAME());
                cell.textContent = currentPlayer.GETSIGN();
                console.log("Cell clicked with data value: " + currentPlayer.GETSIGN());
            })
        })
    }


    SETUPEVENTLISTENERS();

    return {}

})();

