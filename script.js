document.addEventListener("DOMContentLoaded", ()=>{
createDrawBoard(16)
})

// Select Color
const colorInput = document.querySelector(".color")
const rainbowBtn = document.querySelector(".rainbow")
var randomColor = Math.floor(Math.random()*16777215).toString(16);
let brushColor = "#000000"; //Black is the default color

colorInput.oninput = function(){
    brushColor = colorInput.value
    console.log(colorInput.value)
}
//

let drawBoard = document.querySelector(".grid");
function createDrawBoard(size){

    drawBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    drawBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    let numDivs = size * size;

    for (let i = 0; i < numDivs; i++){
        let div = document.createElement("div");
        div.addEventListener('mouseover',()=>{
            div.style.backgroundColor = brushColor
        })
        drawBoard.appendChild(div)
    }
}



// Erase Board (Reset Button)
const eraseBtn = document.querySelector(".reset");
function eraseBoard(){
    brushColor = "#000000";
    colorInput.value = brushColor
    let child = Array.from(drawBoard.childNodes);
    child.forEach((item)=>drawBoard.removeChild(item));
    createDrawBoard(currentBoardSize);
}
eraseBtn.addEventListener("click", eraseBoard)
// End Erase Board

const boardSize = document.querySelector(".boardSize")
let currentBoardSize = 16;

boardSize.addEventListener('click', (ev)=>{
    let target = ev.target
    let child = Array.from(drawBoard.childNodes);
    switch (target.id){
        case "board-16":
            console.log(brushColor)
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
