import {Controller} from "./Controller.js";
import {KeyboardInput} from "./KeyboardInput.js";
import {GameObject, PhysicsBasedObject} from "../entities";

export abstract class KeyBoardController<TGameObject extends GameObject> implements Controller<TGameObject> {
    protected keyMap: Map<string, string[]>;
    private readonly defaultKeyMap: Map<string, string[]>;
    protected keyboardInput: KeyboardInput = new KeyboardInput();
    protected constructor(keyMap: Map<string, string[]>) {
        this.keyMap = keyMap;
        this.defaultKeyMap = new Map(keyMap);
    }

    abstract update(deltaTime: number, gameObject: TGameObject): void;

    defineNewKey(action: string, key: string): void {
        if (this.keyMap.has(action)) {
            let keys = this.keyMap.get(action)!;
            if(!keys === undefined && !keys!.includes(key))
                this.keyMap.set(action, [...keys!, key]);
        }
    }

    resetKey(action: string): void {
       this.keyMap.set(action, [...this.defaultKeyMap.get(action)!]);
    }

    resetAllKeys(): void {
        this.keyMap = new Map(this.defaultKeyMap);
    }
}