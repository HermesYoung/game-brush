import {Vector2D, Vector2DUtils} from "../math";
import { CollisionBox } from "./CollisionBox";
import { RectangleCollisionBox } from "./RectangleCollisionBox";
import {CollisionManager} from "./CollisionManager";

export class EllipseCollisionBox implements CollisionBox {
    position: Vector2D;
    rotation: number;
    radiusX: number;
    radiusY: number;

    constructor(position: Vector2D, radiusX: number, radiusY: number, rotation: number = 0) {
        this.position = position;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
    }

    collidesWith(other: CollisionBox): boolean {
        return CollisionManager.checkCollision(this, other);
    }

    getCollisionPoint(other: CollisionBox): Vector2D | null {
        if (!this.collidesWith(other)) return null;

        const toLocal = (point: Vector2D): Vector2D =>
            Vector2DUtils.rotate(Vector2DUtils.subtract(point, this.position), -this.rotation);

        const toWorld = (point: Vector2D): Vector2D =>
            Vector2DUtils.add(Vector2DUtils.rotate(point, this.rotation), this.position);

        if (other instanceof EllipseCollisionBox) {
            const delta = toLocal(other.position);
            const norm = Math.sqrt((delta.x * delta.x) / (this.radiusX * this.radiusX) + (delta.y * delta.y) / (this.radiusY * this.radiusY));
            const direction = Vector2DUtils.divide(delta, norm);
            return toWorld(direction);
        }

        if (other instanceof RectangleCollisionBox) {
            const local = toLocal(other.position);
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

    reset(position: Vector2D, rotation: number): void {
        this.position = position;
        this.rotation = rotation;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation);
        context.beginPath();
        context.ellipse(0, 0, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        context.strokeStyle = "red";
        context.stroke();
        context.restore();
    }
}
