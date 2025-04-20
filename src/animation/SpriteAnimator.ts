import { Animation } from './Animation.js';

import {Vector2D} from "../math/Vector2D";

export class SpriteAnimator {
  private animations: Map<string, Animation> = new Map();
  private currentAnimation: string | null = null;
  private currentFrame: number = 0;
  private elapsedTime: number = 0;

  addAnimation(name: string, animation: Animation): void {
    this.animations.set(name, animation);
  }

  play(name: string): void {
    if (this.currentAnimation !== name) {
      this.currentAnimation = name;
      this.currentFrame = 0;
      this.elapsedTime = 0;
    }
  }

  update(deltaTime: number): void {
    if (!this.currentAnimation) return;
    const animation = this.animations.get(this.currentAnimation);
    if (!animation) return;

    this.elapsedTime += deltaTime;
    if (this.elapsedTime >= animation.frameDuration) {
      this.currentFrame = (this.currentFrame + 1) % animation.frameCount;
      this.elapsedTime = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D, position: Vector2D): void {
    if (!this.currentAnimation) return;
    const animation = this.animations.get(this.currentAnimation);
    if (!animation) return;

    const sx = this.currentFrame * animation.frameWidth;
    ctx.drawImage(
      animation.image,
      sx,
      0,
      animation.frameWidth,
      animation.frameHeight,
      position.x,
      position.y,
      animation.frameWidth,
      animation.frameHeight
    );
  }
}