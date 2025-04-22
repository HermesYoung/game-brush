import {Drawable} from "./Drawable";
import {CanvasRectangleProps} from "./CanvasRectangleProps";
import {Transform2D} from "../math/Transform2D";

export class RectangleDrawer implements Drawable {
    properties: CanvasRectangleProps
    transform: Transform2D;

    constructor(transform: Transform2D, properties: CanvasRectangleProps) {
        this.properties = properties;
        this.transform = transform ?? {position: {x: 0, y: 0}, rotation: 0};
    }


    update(transform: Transform2D) {
        this.transform = transform;
    }

    resize(width: number, height: number) {
        this.properties.width = width;
        this.properties.height = height;
    }

    setColor(color: string) {
        this.properties.color = color;
    }

    setOpacity(opacity: number) {
        this.properties.opacity = opacity;
    }

    setStokeStyle(color: string, width: number) {
        this.properties.strokeColor = color;
        this.properties.strokeWidth = width;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.transform.position.x, this.transform.position.y);
        ctx.rotate(this.transform.rotation);

        ctx.globalAlpha = this.properties.opacity ?? 1;
        if (this.properties.color) {
            ctx.fillStyle = this.properties.color;
        }

        ctx.fillRect(-this.properties.width / 2, -this.properties.height / 2, this.properties.width, this.properties.height);

        if (this.properties.strokeColor) {
            ctx.strokeStyle = this.properties.strokeColor;
            ctx.lineWidth = this.properties.strokeWidth ?? 1;
            ctx.strokeRect(-this.properties.width / 2, -this.properties.height / 2, this.properties.width, this.properties.height);
        }

        ctx.restore();
    }
}
