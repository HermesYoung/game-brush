import {Vector2D} from "../math";

export interface Drawable {
    position: Vector2D;
    rotation: number;
    draw(ctx: CanvasRenderingContext2D): void;
}