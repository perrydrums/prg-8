class Creator {

    public start:number;

    private _sheet:Sheet;

    private _last_id:number;

    private _track:Track;

    constructor(track:Track) {
        this._track = track;
        this._last_id = 0;
        this._sheet = new Sheet(this._track.id, this._track.name);

        window.addEventListener("keydown", () => {this.checkKeyPressEvents(event)}, false);
    }

    /**
     * Check what key is pressed and act accordingly.
     * 
     * @param {Event} e 
     */
    checkKeyPressEvents(e:Event) {
        if (e instanceof KeyboardEvent) {
            switch (e.keyCode) {
                case 90: // z
                    this.addToFile(0);
                    break;
                case 67: // c
                    this.addToFile(1);
                    break;
                case 66: // b
                    this.addToFile(2);
                    break;
                case 77: // m
                    this.addToFile(3);
                    break;
                case 13: // ENTER (Download the file)
                    DOMHelper.downloadFile(JSON.stringify(this._sheet.getJSON()), this._track.name + '.json', 'application/json');
                    break;
            }
        }
    }

    /**
     * Add one note to the sheet.
     * 
     * @param {number} index
     */
    private addToFile = (index:number) => {

        const time = Date.now() - this.start;
        const beat = this.getBeat(time);

        console.log("BEAT", beat);

        this._sheet.notes.push({
            id: this._last_id,
            beat: beat,
            fret: index
        });

        this._last_id ++;
    }

    /**
     * Convert time in ms to the correct half-beat.
     * 
     * @param {number} time 
     */
    private getBeat(time:number):number {
        // Check in what half beat the time is.
        // Floor the value to make sure the half beats are registered exactly on beat.

        const step = (60 / this._track.bpm) * 500;
        
        return Math.floor(time / step);
    }

}