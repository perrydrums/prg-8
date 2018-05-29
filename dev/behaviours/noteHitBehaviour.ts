class NoteHitBehaviour implements NoteBehaviour {

    _note:Note;
    _now:boolean = false;
    _hits:number = 0;

    constructor(note:Note) {
        this._note = note;
        window.addEventListener("keydown", () => {this.checkHit(event, DOMHelper.getKeyFromFretId(this._note.fretID))}, false);
    }

    checkPosition():void {
        const y = this._note.y;
        
        if (y > 600 && y < 900) {
            this._now = true;
        }
        else {
            this._now = false;
        }

    }

    checkHit(e:Event, keycode:number):void {
        if (e instanceof KeyboardEvent) {
            // If the note is playable now and the right key has been pressed.
            if (this._now && e.keyCode === keycode) {
                this.register();
                this._now = false;
            }
        }
    }

    register():void {
        this._hits ++;

        // Add lens flare image to note if hit
        let flare = document.createElement("img");
        flare.setAttribute("src", "images/flare.png");
        flare.setAttribute("height", "100px");
        flare.setAttribute("width", "100px");

        this._note.element.appendChild(flare);

        this._note.stop();

        console.log('HIT!');

        setTimeout(() => {
            DOMHelper.removeNote(this._note);
        }, 200);
        
        // TODO: Increase and keep track of score.
    }
    
}