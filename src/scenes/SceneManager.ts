import { Scene } from './Scene.js';

export class SceneManager {
  private scenes: Map<string, Scene> = new Map();
  private currentScene: Scene | null = null;

  register(id: string, scene: Scene): void {
    this.scenes.set(id, scene);
  }

  changeScene(id: string): void {
    const scene = this.scenes.get(id);
    if (scene) {
      this.currentScene = scene;
      scene.reset?.();
    }
  }

  update(deltaTime: number): void {
    this.currentScene?.update(deltaTime);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.currentScene?.draw(ctx);
  }
}