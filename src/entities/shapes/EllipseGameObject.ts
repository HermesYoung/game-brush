import {PhysicsBasedObject} from "../PhysicsBasedObject";
import {CanvasEllipseProps} from "../../graphic";
import {EllipseDrawer} from "../../graphic/EllipseDrawer";

export abstract class EllipseGameObject extends PhysicsBasedObject{
    private drawer: EllipseDrawer;

    protected constructor(position: {x: number, y: number}, rotation: number, properties : CanvasEllipseProps ,collisionBoxes: [] = []) {
        super(position, rotation ,collisionBoxes);
        this.drawer = new EllipseDrawer(position, rotation, properties);
   }

    update(deltaTime: number): void {
        super.update(deltaTime);
    }
    draw(ctx: CanvasRenderingContext2D): void {
        this.drawer.update(this.position, this.rotation);
        this.drawer.draw(ctx);
    }

}