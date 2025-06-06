﻿import {CanvasEllipseProps} from "./CanvasEllipseProps";
import {Drawable} from "./Drawable";
import {Transform2D} from "../math";

export class EllipseDrawer implements Drawable{
    properties: CanvasEllipseProps
    transform: Transform2D;

    constructor(transform : Transform2D, properties: CanvasEllipseProps) {
        this.properties = properties;
        this.transform = transform ?? {position: {x: 0, y: 0}, rotation: 0};
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

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        const position = this.transform.getWorldPosition();
        const rotation = this.transform.getWorldRotation();
        ctx.translate(position.x, position.y);
        ctx.rotate(rotation);
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