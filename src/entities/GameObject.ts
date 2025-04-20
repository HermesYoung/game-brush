import {Vector2D} from "../math/Vector2D";
import {CollisionBox} from "../physics/CollisionBox.js";

export abstract class GameObject {
  position: Vector2D = { x: 0, y: 0 };
  isDestroyed: boolean = false;
  collisionBoxes: CollisionBox[] = [];

  protected constructor(position?: Vector2D, collisionBoxes?: CollisionBox[]) {
    this.position = position || { x: 0, y: 0 };
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