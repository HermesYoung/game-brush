import {GameObject} from "./GameObject.js";
import {PhysicsComponent, CollisionBox} from "../physics";
import {Vector2D} from "../math";

export abstract class PhysicsBasedObject extends GameObject {
    public physicsComponent: PhysicsComponent;

    protected constructor(Position?: Vector2D, collisionBoxes?: CollisionBox[]) {
        super(Position, collisionBoxes);
        this.physicsComponent = new PhysicsComponent();
    }
}