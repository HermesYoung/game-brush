import {PhysicsBasedObject} from "../PhysicsBasedObject";

export abstract class EllipseGameObject extends PhysicsBasedObject{

    radiusX: number;
    radiusY: number;
    rotation: number;
    protected constructor(position: {x: number, y: number}, radiusX: number, radiusY: number, rotation: number, collisionBoxes: [] = []) {
        super(position, rotation ,collisionBoxes);
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
    }

    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.restore();
    }

}