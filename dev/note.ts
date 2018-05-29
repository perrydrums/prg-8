class Note {
    
    /**
     * Specifies how the note should be played
     */
    private noteBehaviour : NoteBehaviour;

    private _element:HTMLElement;

    private _fretID:number;
    private fret:HTMLElement;

    private _y:number = 0;

    private speed:number = 10;

    constructor(fretID:number) {

        this.noteBehaviour = new NoteHitBehaviour(this);

        this._element = document.createElement('div');
        this._fretID = fretID;
        let e = this._element;

        e.style.backgroundImage = "url('images/dot.png')";
        e.classList.add('Kick');
        this.fret = document.getElementById('fret_' + this._fretID);
        this.fret.appendChild(e);
    }

    /**
     * This runs every game tick
     */
    update():void {
        // Move the note down
        if (this._y < (this.fret.getBoundingClientRect().height - this.element.getBoundingClientRect().height)) {
            this._y += this.speed;
            this.element.style.transform = `translate(0px, ${this._y}px)` 
        }
        // Remove the note if it's outside of the fret bounds
        else {
            //TODO: LOWER SCORE

            // Remove the DOMElement and the reference to this instance
            DOMHelper.removeNote(this);
        }

        this.checkPosition();
    }

    checkPosition():void {
        this.noteBehaviour.checkPosition();
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

    public stop() {
        this.speed = 0;
    }

}