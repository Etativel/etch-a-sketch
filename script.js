let drawBoard = document.querySelector(".grid");

function createDrawBoard(size){

    drawBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    drawBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    let numDivs = size * size;

    for (let i = 0; i < numDivs; i++){
        let div = document.createElement("div");
        div.addEventListener('mouseover',()=>{
            div.style.backgroundColor = 'black'
        })
        drawBoard.appendChild(div)
    }
}


const boardSize = document.querySelector(".boardSize")
let currentBoardSize;


boardSize.addEventListener('click', (ev)=>{
    let target = ev.target
    let child = Array.from(drawBoard.childNodes);
    switch (target.id){
        case "board-16":
            child.forEach((item)=>drawBoard.removeChild(item))
            createDrawBoard(16);
            currentBoardSize = 16
            break;
        case "board-32":
            child.forEach((item)=>drawBoard.removeChild(item))
            createDrawBoard(32);
            currentBoardSize = 32
            break;
        case "board-64":
            child.forEach((item)=>drawBoard.removeChild(item))
            createDrawBoard(64);
            currentBoardSize = 64
            break;
    }
})


createDrawBoard(16)

console.log(currentBoardSize)
