import {GameObject} from "../entities";

export interface Controller<TGameObject extends GameObject>  {
    update(deltaTime: number, gameObject: TGameObject) : void;
}