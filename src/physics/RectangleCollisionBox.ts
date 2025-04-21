import {CollisionBox} from './CollisionBox.js';
import {Vector2DUtils, Vector2D} from '../math';
import {EllipseCollisionBox} from "./EllipseCollisionBox";
import {CollisionManager} from "./CollisionManager";

export class RectangleCollisionBox implements CollisionBox {
    position: Vector2D;
    width: number;
    height: number;
    rotation: number;

    constructor(position: Vector2D, width: number, height: number, rotation: number = 0) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
    }

    reset(position: Vector2D, rotation: number): void {
        this.position = position;
        this.rotation = rotation;
    }

    getCorners(): Vector2D[] {
        const hw = this.width / 2;
        const hh = this.height / 2;
        const center = this.position;

        const corners = [
            {x: -hw, y: -hh},
            {x: hw, y: -hh},
            {x: hw, y: hh},
            {x: -hw, y: hh}
        ];

        return corners.map(corner => {
            const rotated = Vector2DUtils.rotate(corner, this.rotation);
            return Vector2DUtils.add(center, rotated);
        });
    }

    getAxes(): Vector2D[] {
        const corners = this.getCorners();
        const axes = [];
        for (let i = 0; i < corners.length; i++) {
            const p1 = corners[i];
            const p2 = corners[(i + 1) % corners.length];
            const edge = Vector2DUtils.subtract(p2, p1);
            const normal = Vector2DUtils.normalize(this.getNormalVector(edge));
            axes.push(normal);
        }
        return axes;
    }

    private getNormalVector(edge: Vector2D) {
        return {x: -edge.y, y: edge.x};
    }

    projectOntoAxis(axis: Vector2D): { min: number; max: number } {
        const corners = this.getCorners();
        let min = Vector2DUtils.dot(corners[0], axis);
        let max = min;
        for (let i = 1; i < corners.length; i++) {
            const projection = Vector2DUtils.dot(corners[i], axis);
            if (projection < min) min = projection;
            if (projection > max) max = projection;
        }
        return {min, max};
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const corners = this.getCorners();
        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        for (let i = 1; i < corners.length; i++) {
            ctx.lineTo(corners[i].x, corners[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    collidesWith(other: CollisionBox): boolean {
        return CollisionManager.checkCollision(this, other);
    }

    getCollisionPoint(other: CollisionBox): Vector2D | null {
        if (!this.collidesWith(other)) return null;

        if (other instanceof RectangleCollisionBox) {
            const axes = [...this.getAxes(), ...other.getAxes()];
            let minOverlap = Infinity;
            let mtv: Vector2D | null = null;

            for (const axis of axes) {
                const proj1 = this.projectOntoAxis(axis);
                const proj2 = other.projectOntoAxis(axis);
                const overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
                if (overlap < minOverlap) {
                    minOverlap = overlap;
                    mtv = axis;
                }
            }

            if (mtv) {
                const direction = Vector2DUtils.subtract(other.position, this.position);
                if (Vector2DUtils.dot(direction, mtv) < 0) {
                    mtv = Vector2DUtils.multiply(mtv, -1);
                }
                return Vector2DUtils.add(this.position, Vector2DUtils.multiply(mtv, minOverlap / 2));
            }
        } else if (other instanceof EllipseCollisionBox) {
            const x = Math.max(this.position.x - this.width / 2, Math.min(other.position.x, this.position.x + this.width / 2));
            const y = Math.max(this.position.y - this.height / 2, Math.min(other.position.y, this.position.y + this.height / 2));
            return { x, y };
        }
        return null;
    }
}
