import {GameObject} from "./GameObject.js";
import {PhysicsComponent} from "../physics/PhysicsComponent.js";
import {Vector2D} from "../math/Vector2D.js";
import {CollisionBox} from "../physics/CollisionBox.js";

export abstract class PhysicsBasedObject extends GameObject {
    public physicsComponent: PhysicsComponent;

    protected constructor(Position?: Vector2D, collisionBoxes?: CollisionBox[]) {
        super(Position, collisionBoxes);
        this.physicsComponent = new PhysicsComponent();
    }
}