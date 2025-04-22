import {PhysicsBasedObject} from "../PhysicsBasedObject.js";
import {CanvasRectangleProps, RectangleDrawer} from "../../graphic";
import {Transform2D} from "../../math";

export abstract class RectangleGameObject extends PhysicsBasedObject{
    protected drawer: RectangleDrawer;

    protected constructor(transform: Transform2D,properties : CanvasRectangleProps ) {
        super(transform);
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

    drawObject(ctx: CanvasRenderingContext2D) {
        this.drawer.draw(ctx);
    }
}