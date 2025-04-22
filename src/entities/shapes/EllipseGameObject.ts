import {PhysicsBasedObject} from "../PhysicsBasedObject";
import {CanvasEllipseProps, EllipseDrawer} from "../../graphic";
import {Transform2D} from "../../math";


export abstract class EllipseGameObject extends PhysicsBasedObject{
    private drawer: EllipseDrawer;

    protected constructor(transform: Transform2D, properties : CanvasEllipseProps ) {
        super(transform);
        this.drawer = new EllipseDrawer(transform, properties);
   }

    drawObject(ctx: CanvasRenderingContext2D) {
        this.drawer.draw(ctx);
    }
}