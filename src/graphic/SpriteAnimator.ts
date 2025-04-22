import {SpriteSheet} from "./SpriteSheet";

export class SpriteAnimator {
  private spriteSheetsMap: Map<string, SpriteSheet> = new Map();
  private currentAnimation: string | null = null;
  private row: number = 0;

  addAnimation(name: string, spriteSheet: SpriteSheet): void {
    this.spriteSheetsMap.set(name, spriteSheet);
  }

  play(name: string, row: number): void {
    if (this.currentAnimation !== name || this.row !== row) {
      this.currentAnimation = name;
      this.row = row;
    }
  }

  update(deltaTime: number): void {
    if (!this.currentAnimation) return;
    const currentSpriteSheet = this.spriteSheetsMap.get(this.currentAnimation);
    if (!currentSpriteSheet) return;
      currentSpriteSheet.setRow(this.row);
      currentSpriteSheet.update(deltaTime)

  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.currentAnimation) return;
    const currentSpriteSheet = this.spriteSheetsMap.get(this.currentAnimation);
    if (!currentSpriteSheet) return;

    currentSpriteSheet.draw(ctx);
  }
}