import {Controller} from "./Controller";
import {GameObject} from "../entities";
import {Scene} from "../scenes";
import {MouseInput} from "./MouseInput";
import {MouseButton} from "./MouseButton";
import {Vector2D} from "../math";

export abstract class MouseController<TControllable extends GameObject | Scene> implements Controller<TControllable> {
    private mouseInput: MouseInput;

    protected constructor() {
        this.mouseInput = MouseInput.instance;
    }

    abstract updateControllable(deltaTime: number, controllableObject: TControllable): void;

    update(deltaTime: number, gameObject: TControllable): void {
        this.updateControllable(deltaTime, gameObject);
        this.mouseInput.update();
    }

    protected isButtonPressed(action: MouseButton): boolean {
        return this.mouseInput.isPressed(action);
    }

    protected isButtonHeld(action: MouseButton): boolean {
        return this.mouseInput.isHeld(action);
    }

    protected getMousePosition(): Vector2D {
        return this.mouseInput.mousePosition;
    }
}