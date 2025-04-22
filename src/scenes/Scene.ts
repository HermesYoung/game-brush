import { GameObject } from '../entities';
import {Boundary} from "../math";
import {SceneManager} from "./SceneManager";

export abstract class Scene {
  sceneId: string;
  protected gameObjects: GameObject[] = [];
  protected boundary: Boundary;
  protected sceneManager: SceneManager | null = null;
  protected constructor(boundary: Boundary, sceneId: string) {
    this.boundary = boundary;
    this.sceneId = sceneId;
  }

  abstract updateScene(deltaTime: number): void;

  setSceneManager(sceneManager: SceneManager): void {
    this.sceneManager = sceneManager;
  }

  update(deltaTime: number): void {
    this.updateScene(deltaTime);
    this.gameObjects.forEach(obj => obj.update(deltaTime));
    this.gameObjects = this.gameObjects.filter(obj => !obj.isDestroyed).sort((a, b) => a.layer - b.layer) ;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.gameObjects.forEach(obj => {
      if(obj.isDestroyed) return;
        obj.draw(ctx);
    });
  }

  abstract reset(): void;

  addGameObject(obj: GameObject, layer : number = 0): void {
    obj.layer = layer;
    this.gameObjects.push(obj);
  }

  getSceneManager(): SceneManager | null {
    return this.sceneManager;
  }
}
