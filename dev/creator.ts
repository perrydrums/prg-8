class Creator {

    private file:object;

    private start:number;

    private last_id:number;

    private track:Track;

    constructor(track:Track) {

        this.track = track;

        this.start = Date.now();

        this.last_id = 0;

        this.file = {
            id: track.id,
            name: track.name,
            kicks: []
        };
        window.addEventListener("keydown", () => {this.setKeyPressEvents(event, this)}, false);
    }

    setKeyPressEvents(e:KeyboardEvent, self:Creator) {
        
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
                this.saveFile(JSON.stringify(this.file), this.track.name + '.json', 'application/json');
                break;
        }
        
    }

    private addToFile = (index:number) => {

        const time = Date.now() - this.start;

        this.file.kicks.push({
            id: this.last_id,
            time: time,
            fret: index
        });

        this.last_id ++;
    }

    private saveFile(content:string, fileName:string, contentType:string) {
        let a = document.createElement("a");
        let file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

}