class Level {

    private level:HTMLElement;

    private fretBoard:HTMLElement;

    private _track:Track;

    private startScreen:HTMLElement;

    private timer:number;

    constructor(track:Track, creator:boolean = true) {
        this._track = track;
        this.show();
        if (creator) {
            let c = new Creator(track);
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
    public start() {
        // Remove the startScreen
        this.startScreen.remove();
        Game.level = this;
        this.timer = 0;

        document.getElementById("music1").play();

        console.log('START ' + this._track.name);
    }

    update() {
        const bpm = this.track.bpm;
        const fps = Game.getInstance().getFPS();

        let step = Math.round(fps / (bpm / 60));
        
        if (this.timer === step) {
            Game.kicks.push(new Kick('a', Math.floor(Math.random() * 4)));
            this.timer = 0;
        }
        else {
            this.timer ++;
        }
        
    }

    public get track():Track {
        return this._track;
    }

}
