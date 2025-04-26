import {GameObject} from "./GameObject.js";
import {SpawnerProperty} from "./SpawnerProperty";

export abstract class Spawner extends GameObject {
  protected property: SpawnerProperty;
  protected timeSinceLastSpawn: number = 0;
  protected objects: GameObject[] = [];

  protected constructor(property : SpawnerProperty) {
    super();
    this.property = property;
  }

  update(deltaTime: number): void {
    this.timeSinceLastSpawn += deltaTime;

    if (this.timeSinceLastSpawn >= this.property.spawnInterval && this.objects.length < this.property.spawnLimit) {
      this.spawn();
      this.timeSinceLastSpawn = 0;
    }

    this.cleanup();
    super.update(deltaTime);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  drawObject(_ctx: CanvasRenderingContext2D) {
    return
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.objects.forEach(obj => obj.draw(ctx));
    super.draw(ctx);
  }

  reset(): void {
    this.objects = [];
    this.timeSinceLastSpawn = 0;
  }

  getObjects(): GameObject[] {
    return this.objects;
  }

  protected abstract spawn(): void;
  protected abstract cleanup(): void;
}
