import {Vector2D} from "../math";
import {CollisionBox} from "../physics";

export abstract class GameObject {
  position: Vector2D = { x: 0, y: 0 };
  rotation: number = 0;
  isDestroyed: boolean = false;
  collisionBoxes: CollisionBox[] = [];

  protected constructor(position?: Vector2D, rotation?: number ,collisionBoxes?: CollisionBox[]) {
    this.position = position || { x: 0, y: 0 };
    this.rotation = rotation || 0;
    this.collisionBoxes = collisionBoxes || [];
  }

  abstract update(deltaTime: number): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;

  destroy(): void {
    this.isDestroyed = true;
  }

  public getCollisionPoint(other: GameObject): Vector2D | null {
    for (let thisBox of this.collisionBoxes) {
      for (let otherBox of other.collisionBoxes) {
        let points = thisBox.getCollisionPoint(otherBox)
        if (points) {
          return points;
        }
      }
    }
    return null;
  }
}