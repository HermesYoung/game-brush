import {Vector2D, Vector2DUtils, Transform2D} from "../math";
import { CollisionBox } from "./CollisionBox";
import { RectangleCollisionBox } from "./RectangleCollisionBox";
import {CollisionManager} from "./CollisionManager";

export class EllipseCollisionBox implements CollisionBox {
    transform: Transform2D;
    radiusX: number;
    radiusY: number;

    constructor(transform: Transform2D, radiusX: number, radiusY: number) {
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.transform = transform;
    }

    collidesWith(other: CollisionBox): boolean {
        return CollisionManager.checkCollision(this, other);
    }

    getCollisionPoint(other: CollisionBox): Vector2D | null {
        if (!this.collidesWith(other)) return null;
        const rotation = this.transform.getWorldRotation();
        const position = this.transform.getWorldPosition();
        const toLocal = (point: Vector2D): Vector2D => {

            return  Vector2DUtils.rotate(Vector2DUtils.subtract(point, position), -rotation);
        }

        const toWorld = (point: Vector2D): Vector2D =>
            Vector2DUtils.add(Vector2DUtils.rotate(point, rotation), position);

        const otherPosition = other.transform.getWorldPosition();
        if (other instanceof EllipseCollisionBox) {
            const delta = toLocal(otherPosition);
            const norm = Math.sqrt((delta.x * delta.x) / (this.radiusX * this.radiusX) + (delta.y * delta.y) / (this.radiusY * this.radiusY));
            const direction = Vector2DUtils.divide(delta, norm);
            return toWorld(direction);
        }

        if (other instanceof RectangleCollisionBox) {
            const local = toLocal(otherPosition);
            const norm = Math.sqrt(local.x * local.x + local.y * local.y);
            const direction = Vector2DUtils.divide(local, norm);
            const scaled = {
                x: direction.x * this.radiusX,
                y: direction.y * this.radiusY
            };
            return toWorld(scaled);
        }

        return null;
    }

    reset(transform: Transform2D): void {
        this.transform = transform;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.save();
        const rotation = this.transform.getWorldRotation();
        const position = this.transform.getWorldPosition();
        context.translate(position.x, position.y);
        context.rotate(rotation);
        context.beginPath();
        context.ellipse(0, 0, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        context.strokeStyle = "black";
        context.stroke();
        context.restore();
    }
}
