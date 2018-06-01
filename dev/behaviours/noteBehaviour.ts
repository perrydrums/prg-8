interface NoteBehaviour {

    /**
     * The note that contains this behaviour
     */
    note:Note;

    /**
     * True if the note can be played right now
     */
    now:boolean;

    checkPosition():void;

    register():void;

}