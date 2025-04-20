import {Boundary} from "../math/Boundary.js";

export interface SpawnerProperty {
    spawnInterval: number;
    spawnLimit: number;
    spawnArea: Boundary;
}