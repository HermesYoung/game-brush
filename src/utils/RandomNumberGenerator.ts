import {Boundary} from "../math/Boundary.js";
import {Vector2D} from "../math/Vector2D";

export class RandomNumberGenerator {
    static int(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static float(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    static position(boundary: Boundary): Vector2D {
        return {
            x: RandomNumberGenerator.int(boundary.from.x, boundary.to.x),
            y: RandomNumberGenerator.int(boundary.from.y, boundary.to.y)
        }
    }
}
