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

    this.updateObjects(deltaTime);
    this.cleanup();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.objects.forEach(obj => obj.draw(ctx));
  }

  reset(): void {
    this.objects = [];
    this.timeSinceLastSpawn = 0;
  }

  getObjects(): GameObject[] {
    return this.objects;
  }

  protected abstract spawn(): void;
  protected abstract updateObjects(deltaTime: number): void;
  protected abstract cleanup(): void;
}
