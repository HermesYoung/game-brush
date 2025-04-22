import {Transform2D} from "../math/Transform2D";

export interface Drawable {
    transform: Transform2D;
    draw(ctx: CanvasRenderingContext2D): void;
}