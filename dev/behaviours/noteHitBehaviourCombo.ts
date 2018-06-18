class NoteHitBehaviourCombo extends NoteHitBehaviour {

    note:Note;
    now:boolean;

    constructor(note:Note) {
        super(note);
    }

    register() {
        if (this.note.stop) {
            return;
        }

        // Add the small_explosion gif to the background of the note element to indicate a successful hit.
        this.note.element.style.backgroundImage = 'url(images/dot.png), url("images/big_explosion.gif")';

        this.note.stopNote();

        // Remove the note after 200 ms, so the flare image will be visible for a split second.
        setTimeout(() => {
            DOMHelper.removeNote(this.note);
        }, 200);

        this.note.multiplier ++;

        // Increase the score by the notes score method.
        this.note.registerScore();
    }

}