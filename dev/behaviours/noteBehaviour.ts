interface NoteBehaviour {

    /**
     * The note that contains this behaviour.
     */
    note:Note;

    /**
     * True if the note can be played right now.
     */
    now:boolean;

    /**
     * Should check if the note can be played at a time.
     */
    checkPosition():void;

    /**
     * Should run when a note is played correctly.
     */
    register():void;

}