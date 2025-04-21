import {Vector2D, Vector2DUtils} from "../math";
import {CollisionBox} from "./CollisionBox";
import {RectangleCollisionBox} from "./RectangleCollisionBox";

function rotatePoint(point: Vector2D, center: Vector2D, rotation: number): Vector2D {
    return Vector2DUtils.add(
        Vector2DUtils.rotate(Vector2DUtils.subtract(point, center), rotation),
        center
    );
}

export class EllipseCollisionBox implements CollisionBox {
    position: Vector2D;
    rotation: number = 0;
    radiusX: number;
    radiusY: number;

    constructor(position: Vector2D, radiusX: number, radiusY: number, rotation: number = 0) {
        this.position = position;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
    }

    collidesWith(other: CollisionBox): boolean {
        const selfCenter = this.position;
        const rotatedOtherPos = rotatePoint(other.position, selfCenter, -this.rotation);

        if (other instanceof EllipseCollisionBox) {
            const dx = (rotatedOtherPos.x - selfCenter.x) / this.radiusX;
            const dy = (rotatedOtherPos.y - selfCenter.y) / this.radiusY;
            return dx * dx + dy * dy <= 1;
        }

        if (other instanceof RectangleCollisionBox) {
            const worldToSelf = (point: Vector2D) => rotatePoint(point, selfCenter, -this.rotation);
            const localRectCenter = worldToSelf(other.position);

            const halfW = other.width / 2;
            const halfH = other.height / 2;

            const corners = [
                { x: -halfW, y: -halfH },
                { x: halfW, y: -halfH },
                { x: halfW, y: halfH },
                { x: -halfW, y: halfH }
            ].map(corner => Vector2DUtils.rotate(corner, other.rotation));

            const transformedCorners = corners.map(c => worldToSelf(
                Vector2DUtils.add(c, other.position)
            ));

            for (const corner of transformedCorners) {
                const dx = (corner.x - selfCenter.x) / this.radiusX;
                const dy = (corner.y - selfCenter.y) / this.radiusY;
                if (dx * dx + dy * dy <= 1) {
                    return true;
                }
            }

            return false;
        }

        return false;
    }

    getCollisionPoint(other: CollisionBox): Vector2D | null {
        if (!this.collidesWith(other)) return null;

        const selfCenter = this.position;
        const rotatedOtherPos = rotatePoint(other.position, selfCenter, -this.rotation);

        if (other instanceof EllipseCollisionBox) {
            const delta = Vector2DUtils.subtract(rotatedOtherPos, selfCenter);
            const norm = Math.sqrt(
                (delta.x * delta.x) / (this.radiusX * this.radiusX) +
                (delta.y * delta.y) / (this.radiusY * this.radiusY)
            );
            const unit = Vector2DUtils.divide(delta, norm);

            return rotatePoint(Vector2DUtils.add(selfCenter, unit), selfCenter, this.rotation);
        }

        if (other instanceof RectangleCollisionBox) {
            const worldToSelf = (point: Vector2D) => rotatePoint(point, selfCenter, -this.rotation);
            const localRectCenter = worldToSelf(other.position);

            const halfW = other.width / 2;
            const halfH = other.height / 2;

            const clampedX = Math.max(-halfW, Math.min(localRectCenter.x - selfCenter.x, halfW));
            const clampedY = Math.max(-halfH, Math.min(localRectCenter.y - selfCenter.y, halfH));

            const closestPoint = Vector2DUtils.add(selfCenter, { x: clampedX, y: clampedY });
            return rotatePoint(closestPoint, selfCenter, this.rotation);
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
