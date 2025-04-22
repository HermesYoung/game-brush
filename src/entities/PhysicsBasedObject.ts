import {GameObject} from "./GameObject.js";
import {PhysicsComponent} from "../physics";
import {Transform2D} from "../math";

export abstract class PhysicsBasedObject extends GameObject {
    public physicsComponent: PhysicsComponent;

    protected constructor(transform: Transform2D) {
        super(transform);
        this.physicsComponent = new PhysicsComponent();
    }

    update(deltaTime: number): void {
        this.physicsComponent.update(this.transform, deltaTime);
        super.update(deltaTime);
    }
}