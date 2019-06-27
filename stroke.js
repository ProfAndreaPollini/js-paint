export class Stroke {
    constructor({
        selectedColor,
        ctx,
        strokeSize
    }) {
        this.points = []
        this.color = selectedColor
        this.ctx = ctx
        this.strokeSize = strokeSize
    }

    push(aPoint) {
        this.points.push(aPoint)
    }

    draw() {

        this.ctx.strokeStyle = this.color
        this.ctx.lineWidth = this.strokeSize
        this.ctx.beginPath();

        if (this.points.length > 1) {
            this.ctx.moveTo(this.points[0].x, this.points[0].y);

            for (let i = 1; i < this.points.length; i++)
                this.ctx.lineTo(this.points[i].x, this.points[i].y)
        }
        this.ctx.stroke();
    }
}


export class Eraser extends Stroke {
    constructor({
        size,
        ctx
    }) {
        super({
            selectedColor: "rgb(255,255,255)",
            ctx,
            strokeSize: size
        })
    }
}