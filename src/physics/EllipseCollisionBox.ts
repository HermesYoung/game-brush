import {Vector2D, Vector2DUtils} from "../math";
import { CollisionBox } from "./CollisionBox";
import { RectangleCollisionBox } from "./RectangleCollisionBox";

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
        if (other instanceof RectangleCollisionBox) {
            const transformToEllipseSpace = (point: Vector2D): Vector2D => {
                let p = Vector2DUtils.subtract(point, this.position);
                p = Vector2DUtils.rotate(p, -this.rotation);
                return {
                    x: p.x / this.radiusX,
                    y: p.y / this.radiusY
                };
            };

            const halfW = other.width / 2;
            const halfH = other.height / 2;
            const corners = [
                { x: -halfW, y: -halfH },
                { x:  halfW, y: -halfH },
                { x:  halfW, y:  halfH },
                { x: -halfW, y:  halfH }
            ];

            const worldCorners = corners.map(corner =>
                Vector2DUtils.add(
                    Vector2DUtils.rotate(corner, other.rotation),
                    other.position
                )
            );

            const ellipseSpaceCorners = worldCorners.map(transformToEllipseSpace);

            const axes: Vector2D[] = [
                Vector2DUtils.normalize(Vector2DUtils.subtract(ellipseSpaceCorners[1], ellipseSpaceCorners[0])),
                Vector2DUtils.normalize(Vector2DUtils.subtract(ellipseSpaceCorners[3], ellipseSpaceCorners[0])),
                Vector2DUtils.normalize(ellipseSpaceCorners[0])
            ];

            for (const axis of axes) {
                let minA = Infinity, maxA = -Infinity;
                for (const corner of ellipseSpaceCorners) {
                    const proj = Vector2DUtils.dot(corner, axis);
                    minA = Math.min(minA, proj);
                    maxA = Math.max(maxA, proj);
                }

                const minB = -1, maxB = 1;
                if (maxA < minB || maxB < minA) {
                    return false;
                }
            }

            return true;
        }

        if (other instanceof EllipseCollisionBox) {
            const rotatedOtherPos = Vector2DUtils.rotate(Vector2DUtils.subtract(other.position, this.position), -this.rotation);
            const dx = rotatedOtherPos.x / this.radiusX;
            const dy = rotatedOtherPos.y / this.radiusY;
            return dx * dx + dy * dy <= 1;
        }

        return false;
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
