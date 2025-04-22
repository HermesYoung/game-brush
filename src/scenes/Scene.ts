import { GameObject } from '../entities';
import {Boundary} from "../math";

export abstract class Scene {
  protected gameObjects: GameObject[] = [];
  protected boundary: Boundary;
  protected constructor(boundary: Boundary) {
    this.boundary = boundary;
  }

  update(deltaTime: number): void {
    this.gameObjects.forEach(obj => obj.update(deltaTime));
    this.gameObjects = this.gameObjects.filter(obj => !obj.isDestroyed).sort((a, b) => a.layer - b.layer) ;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.gameObjects.forEach(obj => {
      if(obj.isDestroyed) return;
        obj.draw(ctx);
    });
  }

  reset(): void {
    this.gameObjects = [];
  }

  addGameObject(obj: GameObject, layer : number = 0): void {
    obj.layer = layer;
    this.gameObjects.push(obj);
  }
}
