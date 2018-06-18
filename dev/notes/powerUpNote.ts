/// <reference path="./note" />

class PowerUpNote extends Note {

    constructor(fretID:number, level:Subject) {
        super(fretID, level);

        let e = this._element;

        e.style.backgroundImage = "url('images/special_dot.png')";
        e.classList.add('Note');
        this._fret = document.getElementById('fret_' + this._fretID);
        this._fret.appendChild(e);
    }

    registerScore() {
        Game.getInstance().increaseScore(100 * this.multiplier);
    }

}