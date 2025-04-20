import {PhysicsBasedObject} from "../entities";

export interface Controller {
    update(deltaTime: number, gameObject: PhysicsBasedObject) : void;
}