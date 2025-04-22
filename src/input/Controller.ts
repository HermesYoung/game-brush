import {GameObject} from "../entities";
import {Scene} from "../scenes";

export interface Controller<TControllable extends GameObject | Scene>  {
    update(deltaTime: number, gameObject: TControllable) : void;
}