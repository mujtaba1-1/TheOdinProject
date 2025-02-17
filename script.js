// Buttons
const colorWheel = document.getElementById("color-wheel");
const colorBtn = document.getElementById("color-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn")

// Grid 
const gridContainer = document.getElementById("grid-container")
const grid = document.getElementsByClassName("grid-cell");

// Slider
const slider = document.getElementById("gridSlider");
const sliderValue = document.getElementById("sliderValue");

// Booleans
let isMouseDown = false;
let isColorMode = true;
let isRainbowMode = false;
let isEraser = false;

function addCell() {
    for (let i = 0; i < slider.value ** 2; i++) {
        const gridCell = document.createElement("div");

        gridCell.className = "grid-cell";

        gridCell.style.width = `${500 / slider.value}px`;
        gridCell.style.height = `${500 / slider.value}px`;

        
        gridCell.addEventListener("mousedown", () => {
            changeColor(gridCell);
        });
        gridCell.addEventListener("mouseup", () => {
            isMouseDown = false;
        });

        gridCell.addEventListener("mouseenter", () => {
            if (isMouseDown) {
                changeColor(gridCell);
            }
        })

        gridContainer.appendChild(gridCell);
    }
}

function changeColor(cell) {
    isMouseDown = true;

    if (isColorMode) {
        cell.style.backgroundColor = colorWheel.value;
    }
    else if (isRainbowMode) {
        cell.style.backgroundColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }
    else if (isEraser) {
        cell.style.backgroundColor = "";
    }
}

function clearBtnColor() {
    colorBtn.style.backgroundColor = "#fff";
    colorBtn.style.color = "#333333";

    rainbowBtn.style.backgroundColor = "#fff";
    rainbowBtn.style.color = "#333333";

    eraserBtn.style.backgroundColor = "#fff";
    eraserBtn.style.color = "#333333";
}

function setBtnColor(btn) {
    btn.style.backgroundColor = "#333333";
    btn.style.color = "#fff";
}

clearBtn.addEventListener("click", () => {
    gridContainer.innerHTML = "";
    addCell();
})

slider.addEventListener("input", () => {
    sliderValue.textContent = slider.value + " x " + slider.value;
    gridContainer.innerHTML = "";
    addCell();
}) 

colorBtn.onclick = () => {
    isColorMode = true;
    isRainbowMode = false;
    isEraser = false;

    clearBtnColor();
    setBtnColor(colorBtn)
}

rainbowBtn.onclick = () => {
    isColorMode = false;
    isRainbowMode = true;
    isEraser = false;

    clearBtnColor();
    setBtnColor(rainbowBtn)
}

eraserBtn.onclick = () => {
    isColorMode = false;
    isRainbowMode = false;
    isEraser = true;

    clearBtnColor();
    setBtnColor(eraserBtn)
}


addCell();