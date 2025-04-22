import {Transform2D} from "../math";

export interface Drawable {
    transform: Transform2D;
    draw(ctx: CanvasRenderingContext2D): void;
}