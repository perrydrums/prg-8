/// <reference path="./note.ts" />

class Kick extends Note {

    private _element:HTMLElement;

    private fretID:number;
    private fret:HTMLElement;

    private y:number = 0;

    private speed:number = 10;

    constructor(letter:String, fretID:number) {
        super();

        this._element = document.createElement('div');
        this.fretID = fretID;
        let e = this._element;

        // e.style.backgroundImage = "url('images/LetterPack/" + letter + ".png')";
        e.style.backgroundImage = "url('images/dot.png')";
        e.classList.add('Kick');
        this.fret = document.getElementById('fret_' + this.fretID);
        this.fret.appendChild(e);
    }

    /**
     * This runs every game tick
     */
    update() {
        // Move the kick down
        if (this.y < (this.fret.getBoundingClientRect().height - this.element.getBoundingClientRect().height)) {
            this.y += this.speed;
            this.element.style.transform = `translate(0px, ${this.y}px)` 
        }
        // Remove the kick if it's outside of the fret bounds
        else {

            this.element.remove();

            // Remove the reference to this instance
            let index = Game.kicks.indexOf(this);
            if (index !== -1) {
                Game.kicks.splice(index, 1);
            }
            // const origAudio = document.getElementById("audio_kick_1");
            // const newAudio = origAudio.cloneNode();
            // newAudio.play();
        }
        
    }

    public get element():HTMLElement {
        return this._element;
    }

}
