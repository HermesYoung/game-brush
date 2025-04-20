import {CollisionBox} from './CollisionBox.js';
import {Vector2D} from '../math/Vector2D.js';
import {Vector2DUtils} from '../math/Vector2DUtils.js';
import {RectangleCollisionBox} from './RectangleCollisionBox.js';

export class CircleCollisionBox implements CollisionBox {
    position: Vector2D;
    radius: number;
    rotation: number = 0;

    constructor(position: Vector2D, radius: number) {
        this.position = position;
        this.radius = radius;
    }

    reset(position: Vector2D, rotation: number): void {
        this.position = position;
        this.rotation = rotation;
    }

    collidesWith(other: CollisionBox): boolean {
        if (other instanceof CircleCollisionBox) {
            const distSq = Vector2DUtils.distanceSquared(this.position, other.position);
            const radiusSum = this.radius + other.radius;
            return distSq <= radiusSum * radiusSum;
        } else if (other instanceof RectangleCollisionBox) {
            const axes = other.getAxes();
            axes.push(Vector2DUtils.normalize(Vector2DUtils.subtract(this.position, other.position)));

            for (const axis of axes) {
                const proj1 = this.projectOntoAxis(axis);
                const proj2 = other.projectOntoAxis(axis);
                if (proj1.max < proj2.min || proj2.max < proj1.min) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    projectOntoAxis(axis: Vector2D): { min: number; max: number } {
        const centerProjection = Vector2DUtils.dot(this.position, axis);
        return {
            min: centerProjection - this.radius,
            max: centerProjection + this.radius
        };
    }

    getCollisionPoint(other: CollisionBox): Vector2D | null {
        if (!this.collidesWith(other)) return null;

        if (other instanceof CircleCollisionBox) {
            const direction = Vector2DUtils.subtract(other.position, this.position);
            const normalized = Vector2DUtils.normalize(direction);
            return Vector2DUtils.add(this.position, Vector2DUtils.multiply(normalized, this.radius));
        } else if (other instanceof RectangleCollisionBox) {
            const axes = other.getAxes();
            axes.push(Vector2DUtils.normalize(Vector2DUtils.subtract(this.position, other.position)));

            let smallestOverlap = Infinity;
            let smallestAxis: Vector2D | null = null;

            for (const axis of axes) {
                const proj1 = this.projectOntoAxis(axis);
                const proj2 = other.projectOntoAxis(axis);
                const overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);

                if (overlap <= 0) return null;
                if (overlap < smallestOverlap) {
                    smallestOverlap = overlap;
                    smallestAxis = axis;
                }
            }

            if (smallestAxis) {
                const direction = Vector2DUtils.normalize(Vector2DUtils.subtract(this.position, other.position));
                const penetrationVector = Vector2DUtils.multiply(smallestAxis, smallestOverlap);
                const sign = Vector2DUtils.dot(direction, smallestAxis) < 0 ? -1 : 1;
                return Vector2DUtils.subtract(this.position, Vector2DUtils.multiply(penetrationVector, 0.5 * sign));
            }
        }

        return null;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }
}
