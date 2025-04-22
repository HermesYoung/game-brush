import {Transform2D, Vector2D} from "../math";
import {Drawable} from "./Drawable";

export class SpriteSheet implements Drawable {
    transform: Transform2D;
    currentFrame: Vector2D = {x: 0, y: 0};
    image: HTMLImageElement;
    dimension: {
        rows: number;
        columns: number;
    };
    frameDuration: number;

    private elapsedTime: number = 0;
    private frameSize: { width: number, height: number } = {width: 0, height: 0};
    private renderSize: { width: number, height: number } = {width: 0, height: 0};

    constructor(transform: Transform2D, image: HTMLImageElement, dimension: {
        rows: number,
        columns: number
    }, frameDuration: number) {
        this.transform = transform;
        this.image = image;
        this.dimension = dimension;
        this.frameDuration = frameDuration;
        image.onload = () => {
            this.frameSize.width = image.naturalWidth / dimension.columns;
            this.frameSize.height = image.naturalHeight / dimension.rows;
            this.renderSize.width = this.frameSize.width;
            this.renderSize.height = this.frameSize.height;
        }
    }

    setTransform(transform: Transform2D): void {
        this.transform = transform;
    }

    update(deltaTime: number): void {
        this.elapsedTime += deltaTime;
        if (this.elapsedTime >= this.frameDuration) {
            this.currentFrame.x = (this.currentFrame.x + 1) % this.dimension.columns;
            this.elapsedTime = 0;
        }
    }

    setRow(row: number): void {
        this.currentFrame.y = row;
    }

    setRenderSize(width: number, height: number): void {
        this.renderSize.width = width;
        this.renderSize.height = height;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.transform.position.x, this.transform.position.y);
        ctx.rotate(this.transform.rotation);

        ctx.drawImage(
            this.image,
            this.currentFrame.x * this.frameSize.width,
            this.currentFrame.y * this.frameSize.height,
            this.frameSize.width,
            this.frameSize.height,
            -this.renderSize.width / 2,
            -this.renderSize.height / 2,
            this.renderSize.width,
            this.renderSize.height
        );

        ctx.restore();
    }
}