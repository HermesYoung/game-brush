import {Boundary} from "../math";

export interface SpawnerProperty {
    spawnInterval: number;
    spawnLimit: number;
    spawnArea: Boundary;
}