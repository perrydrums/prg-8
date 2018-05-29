class Level {

    private level:HTMLElement;

    private fretBoard:HTMLElement;

    private _track:Track;

    private startScreen:HTMLElement;

    private sheet:Sheet;

    private startTime:number;

    private creator:Creator;

    constructor(track:Track, creator:boolean = true) {
        this._track = track;
        this.show();
        if (creator) {
            this.creator = new Creator(track);
        }
    }

    /**
     * Creates all DOM Elements needed
     */
    show():void {
        let selector = Selector.getInstance();
        selector.hide();

        // Create a Div Element with the Level class
        this.level = document.createElement('div');
        this.level.classList.add('Level');
        this.level.innerHTML = this._track.name;

        // Create a Div Element with the FretBoard class
        this.fretBoard = document.createElement('div');
        this.fretBoard.id = 'FretBoard';
        this.level.appendChild(this.fretBoard);

        // Create 4 frets for in the fretboard
        for (let i = 0; i < 4; i ++) {
            let fret = document.createElement('div');
            fret.classList.add('Fret');
            fret.id = 'fret_' + i;
            this.fretBoard.appendChild(fret);
        }

        document.body.appendChild(this.level);
        this.startScreen = DOMHelper.getStartScreen(this);
        this.level.appendChild(this.startScreen);
    }

    /**
     * Starts the level
     */
    public async start() {
        // Remove the startScreen
        this.startScreen.remove();
        Game.level = this;

        // Make the notes fall 2 seconds earlier so they reach the bottom at the right time.
        this.startTime = Date.now() - 2000;

        this.sheet = Sheet.createFromJSON(await Fetcher.fetchJSONFile("data/sheets/" + this.track.id + ".json"));

        document.getElementById("music1").play();
        if (this.creator) {
            this.creator.start = Date.now();
        }

        console.log('START ' + this._track.name);
    }

    update() {
        // Read the notes from the sheet and play them back at the right time.
        const step = (60 / this.track.bpm) * 500;

        if (this.sheet.kicks.length !== 0) {
            if ((Date.now() - this.startTime) > (this.sheet.kicks[0].beat * step)) {
            
                Game.notes.push(new Note(this.sheet.kicks[0].fret));
    
                this.sheet.kicks.shift();
            }
        }

        
    }

    public get track():Track {
        return this._track;
    }

}
