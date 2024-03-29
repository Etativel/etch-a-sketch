document.addEventListener("DOMContentLoaded", ()=>{
    createDrawBoard(16)
})

let rainbow = false;
let basicColor = false;
let grayScale = false;
let erase = false;

const rainbowBtn = document.querySelector(".rainbow");
const colorInput = document.querySelector(".color");
const grayBtn = document.querySelector(".grey-scale");
const eraserBtn = document.querySelector('.eraser')
const colorContainer = document.querySelector(".navbar")
const buttons = document.querySelectorAll(".btn");
let drawBoard = document.querySelector(".grid");
const resetBtn = document.querySelector(".reset");
const boardSize = document.querySelector(".boardSize")

let drawing = false;
document.addEventListener('mousedown', (e) => {
    // console.log(e)
    if (e.target.classList.contains("grid-box")){
        e.preventDefault();
        drawing = true;
        changeColor(e);
    }
});

document.addEventListener('mouseup', (e) => {
  e.preventDefault();
  drawing = false;
});



function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

function setColor(){    
    if (rainbow){
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        // Create the RGB color string
        const randomRgbColor = `rgb(${r}, ${g}, ${b})`;
        let rgbToHexConverted = rgbToHex(r,g,b) 
        colorInput.value = rgbToHexConverted
        return randomRgbColor
    }else if (basicColor){
        return colorInput.value;
    }else if (erase){
        return 	"#FFFFFF"
    }
    else{
        return "#000000";
    }
}

function colorHandler(basicColorFlag, rainbowFlag, grayScaleFlag, eraseFlag){
    basicColor = basicColorFlag;
    grayScale = grayScaleFlag;
    erase = eraseFlag;
    rainbow = rainbowFlag;
}


function createDrawBoard(size){

    drawBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    drawBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    let numDivs = size * size;

    for (let i = 0; i < numDivs; i++){
        let gridBox = document.createElement("div");
        gridBox.classList.add("grid-box")
        gridBox.style.backgroundColor = "rgb(255,255,255)"
        gridBox.addEventListener('mouseover',changeColor)
        gridBox.addEventListener('mousedown',changeColor)
        drawBoard.appendChild(gridBox);
    }
}

function changeColor(e) {
    if (drawing) {
      if (!grayScale) {
        e.target.style.backgroundColor = setColor();
      } else {
        const style = getComputedStyle(e.target);
        let color = style.backgroundColor;
        const rgbValues = color.match(/\d+/g);
        r = rgbValues[0];
        g = rgbValues[1];
        b = rgbValues[2];
        e.target.style.backgroundColor = `rgb(${g - 25}, ${g - 25}, ${b - 25})`;
      }
    }
  }


function eraseBoard(){
    rainbow = false;
    basicColor = false;
    grayScale = false;
    erase = false;
    colorInput.value =  setColor();
    let child = Array.from(drawBoard.childNodes); // Make an array of nodes for child re-color
    child.forEach((item)=>item.style.backgroundColor = "rgb(255,255,255)");
}


// Coloring Board
colorContainer.addEventListener("click", (ev)=>{
    let target = ev.target
    buttons.forEach(button => button.classList.remove('active'));
    switch(target.id){
        case "color":
            colorHandler(true, false, false,false);
            break;
        case "rainbow":
            rainbowBtn.classList.add('active');
            colorHandler(false, true, false, false);
            break;
        case "grey-scale":
            grayBtn.classList.add('active');
            colorHandler(false, false, true, false);
            break;
        case "eraser":
            eraserBtn.classList.add('active');
            colorHandler(false, false, false,true);
            break;
    }

})

// Resetting Board
boardSize.addEventListener('click', (ev)=>{
    // console.log(ev.target)
    let target = ev.target
    let child = Array.from(drawBoard.childNodes);
    switch (target.id){
        case "board-16":
            child.forEach((item)=>item.style.backgroundColor = "white");
            createDrawBoard(16);
            break;
        case "board-32":
            child.forEach((item)=>item.style.backgroundColor = "white");
            createDrawBoard(32);
            break;
        case "board-64":
            child.forEach((item)=>item.style.backgroundColor = "white");
            createDrawBoard(64);
            break;
        case "board-100":
            child.forEach((item)=>item.style.backgroundColor = "white");
            createDrawBoard(100);
            break;
    }
})

resetBtn.addEventListener("click", eraseBoard);

