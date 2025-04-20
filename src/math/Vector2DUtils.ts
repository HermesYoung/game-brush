import { Vector2D } from "./Vector2D.js";

export class Vector2DUtils {
    static add(v1: Vector2D, v2: Vector2D): Vector2D {
        return { x: v1.x + v2.x, y: v1.y + v2.y };
    }

    static subtract(v1: Vector2D, v2: Vector2D): Vector2D {
        return { x: v1.x - v2.x, y: v1.y - v2.y };
    }

    static multiply(v: Vector2D, scalar: number): Vector2D {
        return { x: v.x * scalar, y: v.y * scalar };
    }

    static divide(v: Vector2D, scalar: number): Vector2D {
        return { x: v.x / scalar, y: v.y / scalar };
    }

    static magnitude(v: Vector2D): number {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    static normalize(v: Vector2D): Vector2D {
        const mag = this.magnitude(v);
        return mag === 0 ? { x: 0, y: 0 } : this.divide(v, mag);
    }

    static negate(v: Vector2D): Vector2D {
        return { x: -v.x, y: -v.y };
    }

    static dot(v1: Vector2D, v2: Vector2D): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static cross(v1: Vector2D, v2: Vector2D): number {
        return v1.x * v2.y - v1.y * v2.x;
    }

    static clone(v: Vector2D): Vector2D {
        return { x: v.x, y: v.y };
    }

    static zero():Vector2D {
        return { x: 0, y: 0 };
    }

    static distanceSquared(a: Vector2D, b: Vector2D): number {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return dx * dx + dy * dy;
    }

    static distance(a: Vector2D, b: Vector2D): number {
        return Math.sqrt(this.distanceSquared(a, b));
    }

    static rotate(v: Vector2D, angle: number): Vector2D {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
            x: v.x * cos - v.y * sin,
            y: v.x * sin + v.y * cos
        };
    }
}
