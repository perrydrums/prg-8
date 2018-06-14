abstract class Note implements Observer {
    
    /**
     * Specifies how the note should be played
     */
    protected _noteBehaviour : NoteBehaviour;

    protected _element:HTMLElement;

    protected _fretID:number;

    protected _fret:HTMLElement;

    protected _y:number = 0;

    protected _speed:number = 10;

    protected _stop:boolean = false;

    public now:boolean = false;

    public subject:Subject;

    constructor(fretID:number, level:Subject) {
        this._noteBehaviour = new NoteHitBehaviour(this);
        this.subject = level;
        level.registerObserver(this);

        this._element = document.createElement('div');
        this._fretID = fretID;
        
        // Element styling should be handled in child class.
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
            Game.getInstance().lowerScore(5);

            // Remove the observer from the subject
            this.subject.removeObserver(this);
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

    /**
     * Increase score.
     */
    registerScore():void {
        // Should be handled in the child classes.
    }

    protected changeBehaviour(behaviour:NoteBehaviour):void {
        this._noteBehaviour = behaviour;
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