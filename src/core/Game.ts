import {Scene, SceneManager} from "../scenes";
import {MouseInput} from "../input/MouseInput";

export class Game {
    private readonly ctx: CanvasRenderingContext2D;
    private lastTime: number = 0;
    private fps: number = 60;
    private timestep: number = 1000 / this.fps;
    private accumulator: number = 0;
    private readonly sceneManager: SceneManager;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!;
        this.sceneManager = new SceneManager();
        MouseInput.initialize(canvas);
    }

    start(startScene: string): void {
        this.sceneManager.changeScene(startScene)
        requestAnimationFrame(this.loop);
    }

    addScene(scene: Scene): void {
        this.sceneManager.register(scene);
    }

    setTargetFPS(fps: number){
        this.fps = fps;
        this.timestep = 1000 / fps;
    }

    private loop = (timestamp: number): void => {
        if(!this.lastTime) this.lastTime = timestamp;

        const delta = timestamp - this.lastTime;
        this.accumulator += delta;

        if(this.accumulator >= this.timestep)
        {
            const deltaTime = this.timestep / 1000;
            this.accumulator -= this.timestep;
            this.sceneManager.update(deltaTime);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.sceneManager.draw(this.ctx);

            this.accumulator = 0;
            this.lastTime = timestamp;
        }

        requestAnimationFrame(this.loop);
    };
}