export class AudioManager {
    private context: AudioContext;
    private buffers: Map<string, AudioBuffer> = new Map();

    private readonly musicGain: GainNode;
    private readonly sfxGain: GainNode;

    constructor() {
        this.context = new AudioContext();

        this.musicGain = this.context.createGain();
        this.sfxGain = this.context.createGain();

        this.musicGain.connect(this.context.destination);
        this.sfxGain.connect(this.context.destination);
    }

    async load(name: string, url: string): Promise<void> {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
        this.buffers.set(name, audioBuffer);
    }

    playMusic(name: string, volume: number = 1, loop: boolean = true): void {
        this.play(name, volume, loop, this.musicGain);
    }

    playSFX(name: string, volume: number = 1): void {
        this.play(name, volume, false, this.sfxGain);
    }

    private play(name: string, volume: number, loop: boolean, output: GainNode): void {
        const buffer = this.buffers.get(name);
        if (!buffer) return;

        const source = this.context.createBufferSource();
        const gain = this.context.createGain();

        source.buffer = buffer;
        source.loop = loop;

        gain.gain.value = volume;
        source.connect(gain).connect(output);
        source.start(0);
    }

    setMusicVolume(value: number): void {
        this.musicGain.gain.value = value;
    }

    setSFXVolume(value: number): void {
        this.sfxGain.gain.value = value;
    }
}
