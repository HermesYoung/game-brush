import {Vector2D} from "../math";
import {CollisionBox} from "../physics";
import {Transform2D} from "../math/Transform2D";

export abstract class GameObject {
    transform: Transform2D;
    isDestroyed: boolean = false;
    collisionBoxes: CollisionBox[] = [];

    protected constructor(transform?: Transform2D, collisionBoxes?: CollisionBox[]) {
        this.transform = transform ?? {position: {x: 0, y: 0}, rotation: 0};
        this.collisionBoxes = collisionBoxes || [];
    }

    abstract update(deltaTime: number): void;

    abstract draw(ctx: CanvasRenderingContext2D): void;

    destroy(): void {
        this.isDestroyed = true;
    }

    public getCollisionPoint(other: GameObject): Vector2D | null {
        for (let thisBox of this.collisionBoxes) {
            for (let otherBox of other.collisionBoxes) {
                let points = thisBox.getCollisionPoint(otherBox)
                if (points) {
                    return points;
                }
            }
        }
        return null;
    }

    protected drawCollisionBoxes(ctx: CanvasRenderingContext2D): void {
        for (let box of this.collisionBoxes) {
            box.draw(ctx);
        }
    }

    protected updateCollisionBox() {
        this.collisionBoxes.forEach(collisionBox => {
            collisionBox.reset(this.transform)
        })
    }
}