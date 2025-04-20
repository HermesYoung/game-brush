import {Vector2D} from "../math/Vector2D";
import {Boundary} from "../math/Boundary.js";

export class RangeDetector {
    static isInRange(position : Vector2D, boundary : Boundary):boolean {
        if (position.x < boundary.from.x || position.x > boundary.to.x) {
            return false;
        }
        return !(position.y < boundary.from.y || position.y > boundary.to.y);

    }
}