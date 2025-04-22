import {Vector2D, Vector2DUtils} from "../math";
import { CollisionBox } from "./CollisionBox";
import { RectangleCollisionBox } from "./RectangleCollisionBox";
import {CollisionManager} from "./CollisionManager";
import {Transform2D} from "../math/Transform2D";

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

        const toLocal = (point: Vector2D): Vector2D =>
            Vector2DUtils.rotate(Vector2DUtils.subtract(point, this.transform.position), -this.transform.rotation);

        const toWorld = (point: Vector2D): Vector2D =>
            Vector2DUtils.add(Vector2DUtils.rotate(point, this.transform.rotation), this.transform.position);

        if (other instanceof EllipseCollisionBox) {
            const delta = toLocal(other.transform.position);
            const norm = Math.sqrt((delta.x * delta.x) / (this.radiusX * this.radiusX) + (delta.y * delta.y) / (this.radiusY * this.radiusY));
            const direction = Vector2DUtils.divide(delta, norm);
            return toWorld(direction);
        }

        if (other instanceof RectangleCollisionBox) {
            const local = toLocal(other.transform.position);
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
        context.translate(this.transform.position.x, this.transform.position.y);
        context.rotate(this.transform.rotation);
        context.beginPath();
        context.ellipse(0, 0, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        context.strokeStyle = "red";
        context.stroke();
        context.restore();
    }
}
