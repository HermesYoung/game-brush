import {PhysicsBasedObject} from "../PhysicsBasedObject";
import {CanvasEllipseProps} from "../../graphic";
import {EllipseDrawer} from "../../graphic/EllipseDrawer";
import {Transform2D} from "../../math/Transform2D";

export abstract class EllipseGameObject extends PhysicsBasedObject{
    private drawer: EllipseDrawer;

    protected constructor(transform: Transform2D, properties : CanvasEllipseProps ,collisionBoxes: [] = []) {
        super(transform ,collisionBoxes);
        this.drawer = new EllipseDrawer(transform, properties);
   }

    update(deltaTime: number): void {
        super.update(deltaTime);
    }
    draw(ctx: CanvasRenderingContext2D): void {
        this.drawer.update(this.transform);
        this.drawer.draw(ctx);
    }

}