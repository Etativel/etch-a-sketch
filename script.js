document.addEventListener("DOMContentLoaded", ()=>{
createDrawBoard(16) //The default board size is 16 x 16
})

// Select Color
const colorInput = document.querySelector(".color");

let rainbow = false;
let basicColor = false;
let grayScale = false;
let erase = false;

function setColor(){
    if (rainbow){
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        // Create the RGB color string
        const randomRgbColor = `rgb(${r}, ${g}, ${b})`;
        
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
          }
          
          function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
          }
        let rgbToHexConverted = rgbToHex(r,g,b) 
        colorInput.value = rgbToHexConverted
        return randomRgbColor,rgbToHexConverted;
    }else if (basicColor){
        return colorInput.value;
    }else if (grayScale){
        return;
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

// Use event delegation
const colorContainer = document.querySelector(".navbar")
colorContainer.addEventListener("click", (ev)=>{
    console.log(rainbow)
    let target = ev.target
    console.log(target)
    console.log(target.id)
    switch(target.id){
        case "color":
            console.log(target.id)
            colorHandler(true, false, false,false);
            break;
        case "rainbow":
            colorHandler(false, true, false, false);
            break;
        case "grey-scale":
            colorHandler(false, false, true, false);
            break;
        case "eraser":
            colorHandler(false, false, false,true);
            break;
    }

})

let drawBoard = document.querySelector(".grid");
function createDrawBoard(size){

    drawBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    drawBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    let numDivs = size * size;

    for (let i = 0; i < numDivs; i++){
        let div = document.createElement("div");
        div.style.backgroundColor = "rgb(255,255,255)"
        div.addEventListener('mouseover',()=>{
            if (!grayScale){
                div.style.backgroundColor = setColor()
            }else{
                const style = getComputedStyle(div)
                let color= style.backgroundColor;
                const rgbValues = color.match(/\d+/g);
                r = parseInt(rgbValues[0]);
                g = parseInt(rgbValues[1]);
                b = parseInt(rgbValues[2]);
                div.style.backgroundColor = `rgb(${g - 25}, ${g - 25}, ${b - 25})`;
            }
        })
        drawBoard.appendChild(div);
    }
}

// Reset Board (Reset Button)
const resetBtn = document.querySelector(".reset");
function eraseBoard(){
    rainbow = false;
    basicColor = false;
    grayScale = false;
    colorInput.value = setColor();
    let child = Array.from(drawBoard.childNodes); // Make an array of nodes for child re-color
    child.forEach((item)=>item.style.backgroundColor = "rgb(255,255,255)");
}
resetBtn.addEventListener("click", eraseBoard);

// Event delegation for drawing
const boardSize = document.querySelector(".boardSize")
boardSize.addEventListener('click', (ev)=>{
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
    }
})
