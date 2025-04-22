import { Vector2D, Transform2D } from "../math";

export interface CollisionBox {
    transform: Transform2D;
    collidesWith(collisionBox: CollisionBox): boolean;
    reset(transform: Transform2D): void;
    getCollisionPoint(other: CollisionBox): Vector2D | null;
    draw(context: CanvasRenderingContext2D): void;
}
