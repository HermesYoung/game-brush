import {PhysicsBasedObject} from "../PhysicsBasedObject";
import {CanvasEllipseProps, EllipseDrawer} from "../../graphic";
import {Transform2D} from "../../math";


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