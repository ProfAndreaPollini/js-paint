class Stroke {
    constructor(col) {
        this.points = []
        this.color = col
    }

    push(aPoint) {
        this.points.push(aPoint)
    }

    draw() {
        stroke(this.color)
        if (this.points.length > 1)
            for (let i = 1; i < this.points.length; i++)
                line(this.points[i - 1].x, this.points[i - 1].y, this.points[i].x, this.points[i].y);
    }
}

class Painter {
    constructor() {
        this.objects = []
    }

    push(obj) {
        this.objects.push(obj)
    }

    draw() {
        this.objects.forEach(obj =>
            obj.draw());
    }

    addToLastObject(info) {
        this.objects[this.objects.length - 1].push(info)
    }

    undo() {
        this.objects.pop()
    }
}

class ToolInfo {
    constructor() {
        this.currentColor = "#FFF";
    }


}

let app = new App();

let p;
let isDrawing = false;
let currentColor = "#FFFFFF"

function setup() {
    createCanvas(400, 400);

    p = new Painter();
}


function draw() {
    stroke(255)
    clear()
    background(0);

    p.draw();

    /*line(p[i - 1].x, p[i - 1].y, p[i].x, p[i].y);*/
}

function keyPressed() {
    console.log("Pressed ", keyCode)
    if (keyCode === ESCAPE) {
        console.log("ESC PRESSED");
        p.undo()
    }
    if (keyCode === 82) {
        console.log("R pressed")
        currentColor = "#FF0000"
    }
}

function mousePressed() {
    console.log("mousePresssed()")
    if (!isDrawing) {
        p.push(new Stroke(currentColor))
    }

    p.addToLastObject({
        x: mouseX,
        y: mouseY
    })

    isDrawing = true;
}

function mouseDragged() {

    //console.log(mouseX, mouseY)
    isDrawing = true;

    p.addToLastObject({
        x: mouseX,
        y: mouseY
    })
}


function mouseReleased() {
    console.log("mouserReleased()")
    isDrawing = false;
}