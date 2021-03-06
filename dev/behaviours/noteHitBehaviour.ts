class NoteHitBehaviour implements NoteBehaviour {

    public note:Note;
    public now:boolean = false;

    constructor(note:Note) {
        this.note = note;
        window.addEventListener("keydown", () => {this.checkHit(event, DOMHelper.getKeyFromFretId(this.note.fretID))}, false);
    }

    /**
     * Check if the note can be played right now.
     */
    checkPosition():void {
        this.now = this.note.now;
    }

    /**
     * Check if the player has hit the right key at the right time.
     * 
     * @param e 
     * @param keycode 
     */
    checkHit(e:Event, keycode:number):void {
        if (e instanceof KeyboardEvent) {
            // If the note is playable now and the right key has been pressed.
            if (this.now && e.keyCode === keycode) {
                this.register();
                this.now = false;
                Game.getInstance().hits ++;
            }
        }
    }

    /**
     * Register a successful hit.
     */
    register():void {
        
        if (this.note.stop) {
            return;
        }

        // Add the small_explosion gif to the background of the note element to indicate a successful hit.
        this.note.element.style.backgroundImage = 'url(images/dot.png), url("images/small_explosion.gif")';

        this.note.stopNote();

        // Remove the note after 200 ms, so the flare image will be visible for a split second.
        setTimeout(() => {
            DOMHelper.removeNote(this.note);
        }, 200);

        // Increase the score by the notes score method.
        this.note.registerScore();
    }
    
}
