//Modules to create: gameBoard, displayController
//FactoryFunction to create: Player


//GAMEBOARD Module
const GAMEBOARD = (() => {
    const BOARDVALUES = [1,2,3,4,5,6,7,8,9];
    const BOARDFRAME = document.querySelector('#gameBoard');
    let valueIndex = 0;

    const RENDERBOARD = () => {
        BOARDVALUES.forEach(value => {
            const CELL = document.createElement('div');
            CELL.classList.add("cell");
            CELL.setAttribute('data-attribute', BOARDVALUES[valueIndex]);
            valueIndex++;
            CELL.textContent = valueIndex;
            BOARDFRAME.appendChild(CELL);
        })
    }

    const SETUPEVENTLISTENERS = () => {
        const CELLS = document.querySelectorAll('.cell');
        CELLS.forEach(cell => {
            cell.addEventListener('click', () => {
                const DATAVALUE = cell.getAttribute('data-attribute');
                console.log("Cell clicked with data value: " + DATAVALUE);
            })
        })
    }

    return {RENDERBOARD, SETUPEVENTLISTENERS};

})();

GAMEBOARD.RENDERBOARD();
GAMEBOARD.SETUPEVENTLISTENERS();