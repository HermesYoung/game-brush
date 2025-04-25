import {Controller} from "./Controller";
import {GameObject} from "../entities";
import {Scene} from "../scenes";
import {MouseInput} from "./MouseInput";
import {MouseButton} from "./MouseButton";
import {Vector2D} from "../math";

export abstract class MouseController<TControllable extends GameObject | Scene> implements Controller<TControllable> {
    private mouseInput: MouseInput;

    protected constructor(canvas: HTMLCanvasElement) {
        this.mouseInput = new MouseInput(canvas);
    }
    abstract updateControllable(deltaTime: number, controllableObject: TControllable): void;

    update(deltaTime: number, gameObject: TControllable): void {
        this.updateControllable(deltaTime, gameObject);
        this.mouseInput.update();
    }

    protected isButtonPressed(action: MouseButton): boolean {
        if (action) {
            return this.mouseInput.isPressed(action);
        }
        return false;
    }

    protected isButtonHeld(action: MouseButton): boolean {
        if (action) {
            return this.mouseInput.isHeld(action);
        }
        return false;
    }

    protected getMousePosition(): Vector2D{
        return this.mouseInput.mousePosition;
    }
}