class Note {
    
    /**
     * Specifies how the note should be played
     */
    private _noteBehaviour : NoteBehaviour;

    private _element:HTMLElement;

    private _fretID:number;

    private _fret:HTMLElement;

    private _y:number = 0;

    private _speed:number = 10;

    private _stop:boolean = false;

    constructor(fretID:number) {
        this._noteBehaviour = new NoteHitBehaviour(this);

        this._element = document.createElement('div');
        this._fretID = fretID;
        let e = this._element;

        e.style.backgroundImage = "url('images/dot.png')";
        e.classList.add('Kick');
        this._fret = document.getElementById('fret_' + this._fretID);
        this._fret.appendChild(e);
    }

    /**
     * This runs every game tick
     */
    update():void {
        // Move the note down
        if (this._y < (this._fret.getBoundingClientRect().height - this.element.getBoundingClientRect().height)) {
            this._y += this._speed;
            this.element.style.transform = `translate(0px, ${this._y}px)` 
        }
        // Remove the note if it's outside of the fret bounds
        else {
            Game.getInstance().lowerScore(1);

            // Remove the DOMElement and the reference to this instance
            DOMHelper.removeNote(this);
        }

        this.checkPosition();
    }

    /**
     * Check if the note can be played right now.
     */
    checkPosition():void {
        this._noteBehaviour.checkPosition();
    }

    /**
     * Stops the note from moving.
     * Also hits cannot be registered after calling this function.
     */
    stopNote():void {
        this._speed = 0;
        this._stop = true;
    }

    get element():HTMLElement {
        return this._element;
    }

    get y():number {
        return this._y;
    }

    get fretID():number {
        return this._fretID;
    }

    get stop():boolean {
        return this._stop;
    }

}