import {PhysicsBasedObject} from "../PhysicsBasedObject.js";
import {CollisionBox} from "../../physics";
import {CanvasRectangleProps, RectangleDrawer} from "../../graphic";
import {Transform2D} from "../../math";

export abstract class RectangleGameObject extends PhysicsBasedObject{
    protected drawer: RectangleDrawer;

    protected constructor(transform: Transform2D,properties : CanvasRectangleProps ,collisionBoxes: CollisionBox[] = []) {
        super(transform ,collisionBoxes);
        this.drawer = new RectangleDrawer(transform, properties);

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
        this.drawer.draw(ctx);
    }
}