import {PhysicsBasedObject} from "../entities/PhysicsBasedObject";

export interface Controller {
    update(deltaTime: number, gameObject: PhysicsBasedObject) : void;
}