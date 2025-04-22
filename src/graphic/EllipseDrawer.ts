import {Vector2D} from "../math";
import {CanvasEllipseProps} from "./CanvasEllipseProps";
import {Drawable} from "./Drawable";

export class EllipseDrawer implements Drawable{
    properties: CanvasEllipseProps
    position: Vector2D;
    rotation: number;

    constructor(position: Vector2D, rotation: number, properties: CanvasEllipseProps) {
        this.properties = properties;
        this.position = position;
        this.rotation = rotation;
    }
    resize(radiusX: number, radiusY: number) {
        this.properties.radiusX = radiusX;
        this.properties.radiusY = radiusY;
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

    update(position: Vector2D, rotation: number) {
        this.position = position;
        this.rotation = rotation;
        console.log(position, rotation);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.properties.opacity ?? 1;

        ctx.beginPath();
        ctx.ellipse(0, 0, this.properties.radiusX, this.properties.radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.properties.color ?? 'black';
        ctx.fill();

        if (this.properties.strokeColor) {
            ctx.strokeStyle = this.properties.strokeColor;
            ctx.lineWidth = this.properties.strokeWidth ?? 1;
            ctx.stroke();
        }

        ctx.restore();
    }
}