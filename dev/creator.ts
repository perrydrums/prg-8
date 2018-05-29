class Creator {

    private sheet:Sheet;

    public start:number;

    private last_id:number;

    private track:Track;

    constructor(track:Track) {

        this.track = track;

        this.last_id = 0;

        this.sheet = new Sheet(this.track.id, this.track.name);

        window.addEventListener("keydown", () => {this.checkKeyPressEvents(event)}, false);
    }

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
                case 13: // ENTER
                    this.saveFile(JSON.stringify(this.sheet.getJSON()), this.track.name + '.json', 'application/json');
                    break;
            }
        }
    }

    /**
     * Add one note to the sheet
     */
    private addToFile = (index:number) => {

        const time = Date.now() - this.start;

        console.log("BEAT", this.getBeat(time));

        this.sheet.kicks.push({
            id: this.last_id,
            beat: this.getBeat(time),
            fret: index
        });

        this.last_id ++;
    }

    private getBeat(time:number):number {
        // Check in what half beat the time is.
        // Floor the value to make sure the half beats are registered exactly on beat.

        const step = (60 / this.track.bpm) * 500;
        
        return Math.floor(time / step);
    }

    private saveFile(content:string, fileName:string, contentType:string) {
        // TODO: Create a download/save button
        let a = document.createElement("a");
        let file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

}