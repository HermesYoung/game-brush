import {PhysicsBasedObject} from "../PhysicsBasedObject.js";
import {CollisionBox} from "../../physics";
import {CanvasRectangleProps, RectangleDrawer} from "../../graphic";
import {Vector2D} from "../../math";

export abstract class RectangleGameObject extends PhysicsBasedObject{
    protected drawer: RectangleDrawer;

    protected constructor(position:Vector2D, rotation: number,properties : CanvasRectangleProps ,collisionBoxes: CollisionBox[] = []) {
        super(position, rotation ,collisionBoxes);
        this.position = position;
        this.rotation = rotation;
        this.drawer = new RectangleDrawer(position, rotation, properties);

    }

    resize(width: number, height: number) {
        this.drawer.resize(width, height);
    }
    setColor(color: string) {
        this.drawer.setColor(color);
    }
    setOpacity(opacity: number) {
        this.drawer.setOpacity(opacity);
    }

    abstract updateBeforePhysics(deltaTime: number): void;

    update(deltaTime: number): void {
        super.update(deltaTime);
    }
    draw(ctx: CanvasRenderingContext2D): void {
        this.drawer.update(this.position, this.rotation);
        this.drawer.draw(ctx);
    }
}