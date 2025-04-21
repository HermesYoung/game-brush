import {Drawable} from "./Drawable";
import {CanvasRectangleProps} from "./CanvasRectangleProps";
import {Vector2D} from "../math";

export class RectangleDrawer implements Drawable {

    properties: CanvasRectangleProps
    position: Vector2D;
    rotation: number;

    constructor(position: Vector2D, rotation: number, properties: CanvasRectangleProps) {
        this.properties = properties;
        this.position = position;
        this.rotation = rotation;
    }



    update(position: Vector2D, rotation: number) {
        this.position = position;
        this.rotation = rotation;
        console.log(position, rotation);
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
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);

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
