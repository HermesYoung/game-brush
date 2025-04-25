import {Vector2D} from "../math";
import {MouseButton} from "./MouseButton";

export class MouseInput {
    private buttons: Set<MouseButton> = new Set();
    private pressed: Set<MouseButton> = new Set();

    public scrollDelta: number = 0;
    public mousePosition: Vector2D = {x: 0, y: 0};

    constructor(private canvas : HTMLCanvasElement) {
        canvas.addEventListener('mousemove', this.onMouseMove);
        canvas.addEventListener('mousedown', this.onMouseDown);
        canvas.addEventListener('mouseup', this.onMouseUp);
        canvas.addEventListener('wheel', this.onWheel);
        canvas.addEventListener('contextmenu', (e) => {e.preventDefault();});
    }
    private onMouseMove = (e: MouseEvent) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mousePosition = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }
    private onMouseDown = (e: MouseEvent) => {
        this.buttons.add(e.button);
        this.pressed.add(e.button);
    }
    private onMouseUp = (e: MouseEvent) => {
        this.buttons.delete(e.button);
        this.pressed.delete(e.button);
    }
    private onWheel = (e: WheelEvent) => {
        this.scrollDelta = e.deltaY;
    }

    isPressed(button: MouseButton): boolean {
        return this.pressed.has(button);
    }

    isAnyPressed(buttons: MouseButton[]|undefined): boolean {
        if (!buttons) return false;
        return buttons.some(button => this.isPressed(button));
    }

    isHeld(button: MouseButton): boolean {
        return this.buttons.has(button);
    }

    isAnyHeld(buttons: MouseButton[]|undefined): boolean {
        if (!buttons) return false;
        return buttons.some(button => this.isHeld(button));
    }

    update(){
        this.pressed.clear();
    }
}

