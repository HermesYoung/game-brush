import {Transform2D, Vector2D} from "../math";
import {CollisionBox} from "../physics";

export abstract class GameObject {
    layer: number = 0;
    transform: Transform2D;
    isDestroyed: boolean = false;
    collisionBoxes: CollisionBox[] = [];
    children: GameObject[] = [];

    protected constructor(transform?: Transform2D) {
        this.transform = transform ?? new Transform2D({x: 0, y: 0});
    }

    abstract updateObject(deltaTime: number): void;

    update(deltaTime: number): void{
        this.updateObject(deltaTime);
        this.updateCollisionBox();
        this.children.forEach(child => child.update(deltaTime));
    }

    abstract drawObject(ctx: CanvasRenderingContext2D): void;

    draw(ctx: CanvasRenderingContext2D): void{
        this.drawObject(ctx)
        this.children.forEach(child => child.draw(ctx));
    }

    destroy(): void {
        this.isDestroyed = true;
    }

    public getCollisionPoint(other: GameObject): Vector2D | null {
        for (const thisBox of this.collisionBoxes) {
            for (const otherBox of other.collisionBoxes) {
                const points = thisBox.getCollisionPoint(otherBox)
                if (points) {
                    return points;
                }
            }
        }
        return null;
    }

    protected drawCollisionBoxes(ctx: CanvasRenderingContext2D): void {
        for (const box of this.collisionBoxes) {
            box.draw(ctx);
        }
    }

    protected updateCollisionBox() {
        this.collisionBoxes.forEach(collisionBox => {
            collisionBox.reset(new Transform2D(this.transform.getWorldPosition(), this.transform.getWorldRotation()))
        })
    }

    addChild(child: GameObject): void {
        child.transform.parent = this.transform;
        this.children.push(child);
    }

    addCollisionBox(collisionBox: CollisionBox): void {
        collisionBox.transform.parent = this.transform;
        this.collisionBoxes.push(collisionBox);
    }
}