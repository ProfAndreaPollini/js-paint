import {
    Stroke,
    Eraser
} from "./stroke.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const colorPalette = document.getElementById("colorPalette")
const currentColor = document.getElementById("currentColor")
const colorHue = document.getElementById("colorHue")
const colorSchemaSelect = document.getElementById("colorSchemaSelect")
const colorSchemaVariationSelect = document.getElementById("colorSchemaVariationSelect")
const strokeSize = document.getElementById("strokeSize")
const strokeSizeDiv = document.getElementById("strokeSizeDiv")
const btnUndo = document.getElementById("btnUndo")

const eraserTool = document.getElementById("eraserTool")
const pencilTool = document.getElementById("pencilTool")

let currentTool = "eraser"

eraserTool.onclick = () => {
    currentTool = "eraser"
}

pencilTool.onclick = () => {
    currentTool = "pencil"
}

strokeSize.oninput = (e) => {
    strokeSizeDiv.textContent = strokeSize.value
}

const W = 400
const H = 400

canvas.width = W
canvas.height = H

const clearCanvas = () => {
    ctx.clearRect(0, 0, W, H)
        //ctx.fillRect(0, 0, W, H)
}
clearCanvas()


let strokes = []
let colors

const makeColors = (startHue, colorScheme, colorSchemaVariation) => {
    colorPalette.textContent = ""

    var scheme = new ColorScheme;
    scheme.from_hue(startHue)
        .scheme(colorScheme)
        .variation(colorSchemaVariation);


    colors = scheme.colors().map(color => "#" + color)
    colors.forEach(color => {
        let colorElement = document.createElement("div")
        colorElement.style.backgroundColor = color;
        //colorElement.textContent = "&nbsp;"
        colorPalette.appendChild(colorElement)
        colorElement.onclick = (e) => {
            selectedColor = e.target.style.backgroundColor;
            //alert(selectedColor)
            currentColor.style.backgroundColor = selectedColor
        }
    });
}

makeColors(colorHue.value, colorSchemaSelect.value, colorSchemaVariationSelect.value)

colorHue.oninput = (e) => {

    makeColors(colorHue.value, colorSchemaSelect.value, colorSchemaVariationSelect.value)
}
colorSchemaSelect.onchange = (e) => {
    makeColors(colorHue.value, colorSchemaSelect.value, colorSchemaVariationSelect.value)
}
colorSchemaVariationSelect.onchange = (e) => {
    console.log("xx")
    makeColors(colorHue.value, colorSchemaSelect.value, colorSchemaVariationSelect.value)
}

const undo = () => {
    strokes.pop()
}

btnUndo.onclick = (e) => {
    console.log("UNDO")

    undo()

}


let selectedColor = colors[0]
currentColor.style.backgroundColor = selectedColor





let dragOk = false
    //let stroke = new Stroke()



const OnMouseMove = (e) => {
    if (!dragOk) return
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    //console.log(x, y)
    strokes[strokes.length - 1].push({
            x,
            y
        })
        //strokes[strokes.length - 1].draw()
}

canvas.onmousedown = (e) => {
    dragOk = true
    canvas.onmousemove = OnMouseMove
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;

    const tool = (currentTool === "eraser") ? new Eraser({
        ctx,
        size: strokeSize.value
    }) : new Stroke({
        selectedColor,
        ctx,
        strokeSize: strokeSize.value
    })

    console.log(tool)
    strokes.push(tool)
    strokes[strokes.length - 1].push({
        x,
        y
    })

}
canvas.onmouseup = () => {
    dragOk = false
    canvas.onmousemove = null
        //strokes[strokes.length - 1].draw()
}

let canvasScale = 1.0

let cumDeltaY = 0.0

canvas.onwheel = (e) => {
    console.log(e.wheelDelta, e.wheelDelta > 0, canvasScale)
    cumDeltaY += e.deltaY


    if (e.wheelDelta > 0) {
        if (canvasScale < 1.0) canvasScale = 1.0
        else
            canvasScale *= 1.01
    } else {
        if (canvasScale > 1.0) canvasScale = 0.99
        else
            canvasScale *= 0.99
    }
    //lastDeltaY = e.deltaY
    //console.log(cumDeltaY);
    ctx.scale(canvasScale, canvasScale);

}

function paint() {
    clearCanvas()

    strokes.forEach(stroke => stroke.draw())
    requestAnimationFrame(paint)
}
paint()