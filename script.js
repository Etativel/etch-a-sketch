document.addEventListener("DOMContentLoaded", ()=>{
createDrawBoard(16) //The default board size is 16 x 16
})

// Select Color

// THIS IS A TEST

const rainbowBtn = document.querySelector(".rainbow")
const colorInput = document.querySelector(".color")

let rainbow = false;
let basicColor = false;

function setColor(){
    if (rainbow === true){
        colorInput.value = "#" + Math.floor(Math.random()*16777215).toString(16);
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }else if (basicColor === true){
        console.log(colorInput.value)
        return colorInput.value
    }else{
        return "#000000"
    }
    // else if (grayScale === true){
    //     return;
    // }
}

rainbowBtn.addEventListener("click", ()=>{
    rainbow = true;
    basicColor = false;
})

colorInput.addEventListener("click", ()=>{
    rainbow = false;
    basicColor = true;
})


// THIS IS A TEST


// const colorInput = document.querySelector(".color")

// let brushColor = "#000000"; //Black is the default color

// colorInput.oninput = function(){
//     brushColor = colorInput.value
//     console.log(colorInput.value)
// }

// colorInput.addEventListener("click",()=>{ //WHY I NEED THIS FUNCTION LOL (WILL BE REMOVED IT IN THE FUTURE)
//     brushColor = colorInput.value
// })

//Rainbow color
// const rainbowBtn = document.querySelector(".rainbow")
// let rainbow = false;
// rainbowBtn.addEventListener("click", ()=>{
//     rainbow = true;
// })
// while (rainbow){
//     brushColor = "#" + Math.floor(Math.random()*16777215).toString(16);
// }


let drawBoard = document.querySelector(".grid");
function createDrawBoard(size){

    drawBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    drawBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    let numDivs = size * size;

    for (let i = 0; i < numDivs; i++){
        let div = document.createElement("div");
        div.addEventListener('mouseover',()=>{
            div.style.backgroundColor = setColor()
        })
        drawBoard.appendChild(div)
    }
}



// Erase Board (Reset Button)
const eraseBtn = document.querySelector(".reset");
function eraseBoard(){
    rainbow = false;
    basicColor = false;
    colorInput.value = setColor()
    let child = Array.from(drawBoard.childNodes); // Make an array of nodes for child re-color
    child.forEach((item)=>item.style.backgroundColor = "white")
}
eraseBtn.addEventListener("click", eraseBoard)



// Event delegation for drawing
const boardSize = document.querySelector(".boardSize")
boardSize.addEventListener('click', (ev)=>{
    let target = ev.target
    let child = Array.from(drawBoard.childNodes);
    switch (target.id){
        case "board-16":
            console.log(brushColor)
            child.forEach((item)=>item.style.backgroundColor = "white")
            createDrawBoard(16);
            break;
        case "board-32":
            child.forEach((item)=>item.style.backgroundColor = "white")
            createDrawBoard(32);
            break;
        case "board-64":
            child.forEach((item)=>item.style.backgroundColor = "white")
            createDrawBoard(64);
            break;
    }
})
