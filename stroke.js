export class Stroke {
    constructor(col, ctx) {
        this.points = []
        this.color = col
        this.ctx = ctx
    }

    push(aPoint) {
        this.points.push(aPoint)
    }

    draw({
        selectedColor,
        ctx
    }) {
        ctx.strokeStyle = selectedColor
        ctx.beginPath();

        if (this.points.length > 1) {
            ctx.moveTo(this.points[0].x, this.points[0].y);
            for (let i = 1; i < this.points.length; i++)
                ctx.lineTo(this.points[i].x, this.points[i].y)
        }
        ctx.stroke();
    }
}