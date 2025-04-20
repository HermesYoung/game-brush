import { SceneManager } from './scenes/SceneManager.js';
import {Boundary} from "./math/Boundary.js";

export class Game {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly canvasBoundary: Boundary;
  private lastTime: number = 0;

  constructor(private canvas: HTMLCanvasElement, private sceneManager: SceneManager) {
    this.ctx = canvas.getContext('2d')!;
    this.canvasBoundary = {
      from: { x: 0, y: 0 },
      to: { x: canvas.width, y: canvas.height },
    };
  }

  start(): void {

    requestAnimationFrame(this.loop);
  }

  private loop = (timestamp: number): void => {
    const deltaTime = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.sceneManager.update(deltaTime);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.sceneManager.draw(this.ctx);
    requestAnimationFrame(this.loop);
  };
}