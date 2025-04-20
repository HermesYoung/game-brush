import { Vector2D } from "../math";

export interface CollisionBox {
    position: Vector2D;
    rotation: number;
    collidesWith(collisionBox: CollisionBox): boolean;
    reset(position: Vector2D, rotation: number): void;
    getCollisionPoint(other: CollisionBox): Vector2D | null;
    draw(context: CanvasRenderingContext2D): void;
}
