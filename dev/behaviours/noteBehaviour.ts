interface NoteBehaviour {

    /**
     * The note that contains this behaviour
     */
    _note:Note;

    /**
     * True if the note can be played right now
     */
    _now:boolean;

    checkPosition():void;

    register():void;

}