class Level {

    private _level:HTMLElement;

    private _score:HTMLElement;

    private _fretBoard:HTMLElement;

    private _track:Track;

    private _startScreen:HTMLElement;

    private _sheet:Sheet;

    private _startTime:number;

    private _creator:Creator;

    constructor(track:Track, creator:boolean = true) {
        this._track = track;
        this.show();
        if (creator) {
            this._creator = new Creator(track);
        }
    }

    /**
     * Creates all DOM Elements needed
     */
    show():void {
        let selector = Selector.getInstance();
        selector.hide();

        // Create a Div Element with the Level class
        this._level = document.createElement('div');
        this._level.classList.add('Level');

        // Create a Div Element with Score
        this._score = document.createElement('div');
        this._score.id = 'Score';
        this._score.innerText = 'Score: ' + Game.getInstance().score;

        // Create a Div Element with the FretBoard class
        this._fretBoard = document.createElement('div');
        this._fretBoard.id = 'FretBoard';
        this._fretBoard.appendChild(this._score);
        this._level.appendChild(this._fretBoard);

        // Create 4 frets for in the fretboard
        for (let i = 0; i < 4; i ++) {
            let fret = document.createElement('div');
            fret.classList.add('Fret');
            fret.id = 'fret_' + i;
            this._fretBoard.appendChild(fret);
        }

        document.body.appendChild(this._level);
        this._startScreen = DOMHelper.getStartScreen(this);
        this._level.appendChild(this._startScreen);
    }

    /**
     * Starts the level
     */
    public async start() {
        // Remove the startScreen.
        this._startScreen.remove();
        Game.level = this;

        // Make the notes fall +/- 2 seconds earlier so they reach the bottom at the right time.
        this._startTime = Date.now() - 1800;

        this._sheet = Sheet.createFromJSON(await Fetcher.fetchJSONFile("data/sheets/" + this.track.id + ".json"));

        // Start the music.
        let audio = DOMHelper.createAudioElement('track_' + this._track.id, 'sound/tracks/' + this._track.id + '.mp3');
        document.body.appendChild(audio);
        audio.play();
        
        if (this._creator) {
            this._creator.start = Date.now();
        }

        console.log('START ' + this._track.name);
    }

    /**
     * Runs every game tick.
     */
    update() {
        // Read the notes from the sheet and play them back at the right time.
        const step = (60 / this.track.bpm) * 500;

        if (this._sheet.notes.length !== 0) {
            if ((Date.now() - this._startTime) > (this._sheet.notes[0].beat * step)) {
            
                Game.notes.push(this.createNote(this._sheet.notes[0].fret));
    
                this._sheet.notes.shift();
            }
        }

        this.updateScore();
    }

    /**
     * Create a new Note based on chance.
     */
    private createNote(fret:number):Note {
        const r = Math.floor(Math.random() * 100);
        if (r < 90) {
            return new BasicNote(fret);
        }
        else {
            return new PowerUpNote(fret);
        }
    }

    private updateScore():void {
        this._score.innerText = 'Score: ' + Game.getInstance().score;
    }

    public get track():Track {
        return this._track;
    }

}
