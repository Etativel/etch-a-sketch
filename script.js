document.addEventListener("DOMContentLoaded", ()=>{
    createDrawBoard(64) 
    console.log("hello")
})


function createDrawBoard(size){
    let drawBoard = document.querySelector(".grid");

    drawBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    drawBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    let numDivs = size * size;

    for (let i = 0; i < numDivs; i++){
        let div = document.createElement("div");
        drawBoard.insertAdjacentElement("beforeend", div)
    }
}