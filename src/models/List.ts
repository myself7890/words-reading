import {Word} from "./Word";

export class List {
    private _name:  string      = "";
    private _words: Array<Word> = [];

    constructor(name: string, words: Array<Word>) {
        this.name = name;
        this.words = words;
    }

    set name(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set words(words: Array<Word>) {
        this._words = words;
    }

    get words(): Array<Word> {
        return this._words;
    }
}