import {
    Stroke
} from "./stroke.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const colorPalette = document.getElementById("colorPalette")
const currentColor = document.getElementById("currentColor")
const colorHue = document.getElementById("colorHue")
const colorSchemaSelect = document.getElementById("colorSchemaSelect")
const colorSchemaVariationSelect = document.getElementById("colorSchemaVariationSelect")



const W = 400
const H = 400

canvas.width = W
canvas.height = H



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



let selectedColor = colors[0]
currentColor.style.backgroundColor = selectedColor



const clearCanvas = () => {
    ctx.clearRect(0, 0, W, H)
        //ctx.fillRect(0, 0, W, H)
}
clearCanvas()

let dragOk = false
    //let stroke = new Stroke()



const OnMouseMove = (e) => {
    if (!dragOk) return
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    console.log(x, y)
    strokes[strokes.length - 1].push({
        x,
        y
    })
    strokes[strokes.length - 1].draw({
        selectedColor,
        ctx
    })
}

canvas.onmousedown = (e) => {
    dragOk = true
    canvas.onmousemove = OnMouseMove
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    console.log(x, y)
    strokes.push(new Stroke())
    strokes[strokes.length - 1].push({
        x,
        y
    })

}
canvas.onmouseup = () => {
    dragOk = false
    canvas.onmousemove = null
    strokes[strokes.length - 1].draw({
        selectedColor,
        ctx
    })
}