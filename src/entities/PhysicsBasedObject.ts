import {GameObject} from "./GameObject.js";
import {PhysicsComponent, CollisionBox} from "../physics";
import {Transform2D} from "../math";

export abstract class PhysicsBasedObject extends GameObject {
    public physicsComponent: PhysicsComponent;

    protected constructor(transform: Transform2D, collisionBoxes?: CollisionBox[]) {
        super(transform, collisionBoxes);
        this.physicsComponent = new PhysicsComponent();
    }

    abstract updateBeforePhysics(deltaTime: number): void ;

    update(deltaTime: number): void {
        this.updateBeforePhysics(deltaTime);
        this.physicsComponent.update(this.transform, deltaTime);
        this.updateCollisionBox()
    }
}