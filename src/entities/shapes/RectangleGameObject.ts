import {PhysicsBasedObject} from "../PhysicsBasedObject.js";
import {CollisionBox} from "../../physics";

export abstract class RectangleGameObject extends PhysicsBasedObject{
    width: number;
    height: any;
    color: string;

    protected constructor(position: {x: number, y: number}, width: number, height: number, color: string,rotation: number ,collisionBoxes: CollisionBox[] = []) {
        super(position, rotation ,collisionBoxes);
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.physicsComponent.angular.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2,this.width, this.height);
        ctx.restore();
    }

    abstract update(deltaTime: number): void ;
}