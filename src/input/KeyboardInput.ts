export class KeyboardInput {
  private keys: Set<string> = new Set();
  private pressed: Set<string> = new Set();

  constructor() {
    window.addEventListener('keydown', (e) => {

      if (!this.keys.has(e.key)) {
        this.pressed.add(e.key);
      }
      this.keys.add(e.key);
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key);
      this.pressed.delete(e.key);
    });
  }

  isPressed(key: string): boolean {
    return this.pressed.has(key);
  }

  isAnyPressed(keys: string[]|undefined): boolean {
    if (!keys) return false;
    return keys.some(key => this.isPressed(key));
  }

  isHeld(key: string): boolean {
    return this.keys.has(key);
  }

  isAnyHeld(keys: string[]|undefined): boolean {
    if (!keys) return false;
    return keys.some(key => this.isHeld(key));
  }

  update(): void {
    this.pressed.clear();
  }
}