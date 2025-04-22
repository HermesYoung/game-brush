import {Vector2D} from "./Vector2D.js";
import {Vector2DUtils} from "./Vector2DUtils.js";

export class Transform2D {
    position: Vector2D;
    rotation: number;
    parent: Transform2D | null = null;

    constructor(position: Vector2D = {x: 0, y: 0}, rotation: number = 0) {
        this.position = position;
        this.rotation = rotation;
    }

    getWorldPosition(): Vector2D {
        if (!this.parent) return this.position;
        const parentWorld = this.parent.getWorldPosition();
        const rotated = Vector2DUtils.rotate(this.position, this.parent.rotation);
        return Vector2DUtils.add(parentWorld, rotated);
    }

    getWorldRotation(): number {
        return this.parent ? this.parent.getWorldRotation() + this.rotation : this.rotation;
    }
}
