document.addEventListener("DOMContentLoaded", ()=>{
    createDrawBoard(32)
})


function createDrawBoard(size){
    let drawBoard = document.querySelector(".grid");

    drawBoard.computedStyleMap.gridTemplateColumns = `repeat(${size}, 1fr)`
    drawBoard.computedStyleMap.gridTemplateRows = `repeat(${size}, 1fr)`
    
    let numDivs = size * size;

    for (let i = 0; i < numDivs; i++){
        let div = document.createElement("div");
    }
}
