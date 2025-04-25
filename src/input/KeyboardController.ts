import {Controller} from "./Controller.js";
import {KeyboardInput} from "./KeyboardInput.js";
import {GameObject} from "../entities";
import {Scene} from "../scenes";

export abstract class KeyboardController<TControllable extends GameObject | Scene> implements Controller<TControllable> {
    protected keyMap: Map<string, string[]>;
    private readonly defaultKeyMap: Map<string, string[]>;
    private keyboardInput: KeyboardInput = new KeyboardInput();

    protected constructor(keyMap: Map<string, string[]>) {
        this.keyMap = keyMap;
        this.defaultKeyMap = new Map(keyMap);
    }

    abstract updateControllable(deltaTime: number, controllableObject: TControllable): void;

    update(deltaTime: number, controllableObject: TControllable): void {
        this.updateControllable(deltaTime, controllableObject)
        this.keyboardInput.update();
    }

    defineNewKey(action: string, key: string): void {
        if (this.keyMap.has(action)) {
            let keys = this.keyMap.get(action)!;
            if (!keys === undefined && !keys!.includes(key))
                this.keyMap.set(action, [...keys!, key]);
        }
    }

    protected isActionKeyPressed(action: string): boolean {
        let keys = this.keyMap.get(action);
        if (keys) {
            return this.keyboardInput.isAnyPressed(keys);
        }
        return false;
    }

    protected isActionKeyHeld(action: string): boolean {
        let keys = this.keyMap.get(action);
        if (keys) {
            return this.keyboardInput.isAnyHeld(keys);
        }
        return false;
    }

    resetKey(action: string): void {
        this.keyMap.set(action, [...this.defaultKeyMap.get(action)!]);
    }

    resetAllKeys(): void {
        this.keyMap = new Map(this.defaultKeyMap);
    }
}