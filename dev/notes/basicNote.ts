/// <reference path="./note" />

class BasicNote extends Note {

    constructor(fretID:number, level:Subject) {
        super(fretID, level);

        let e = this._element;

        e.style.backgroundImage = "url('images/dot.png')";
        e.classList.add('Note');
        this._fret = document.getElementById('fret_' + this._fretID);
        this._fret.appendChild(e);
    }

    /**
     * Add 10 points to score
     */
    registerScore():void {
        Game.getInstance().increaseScore(10 * this.multiplier);
    }

}