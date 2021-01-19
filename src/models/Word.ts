import {Howl} from "howler";

export class Word {
    private _word:  string      = "";
    private _sound!: Howl;

    constructor(word: string, sound: string) {
        this.word = word;
        this.sound = sound;
    }

    set word(word: string) {
        this._word = word;
    }

    get word(): string {
        return this._word;
    }

    set sound(sound: string) {
        this._sound = new Howl({src: sound, volume: 1});
    }

    play() {
        this._sound.play();
    }
}