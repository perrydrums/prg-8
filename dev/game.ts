/**
 * @class Game
 * 
 * Singleton class
 */
class Game {

    private static _instance:Game;

    /**
     * The speed, in frames per second, the game runs at.
     */
    private _fps:number = 30;

    private _fpsInterval:number;

    private _then:number;

    private _score:number = 0;

    public static notes:Note[] = [];

    public static level:Level;

    /**
     * Make the constructor private.
     */
    private constructor() {
        this._fpsInterval = 1000 / this._fps;
        this._then = Date.now();
        this.gameLoop();
        let selector = Selector.getInstance();
        selector.show();
    }

    /**
     * There can always only be one Game instance.
     * 
     * @returns Game
     */
    public static getInstance() {
        if (!this._instance) {
           this._instance = new Game();
        }
        return this._instance;
    }
    
    /**
     * Runs approx. {this._fps} times a second.
     */
    gameLoop() {
        requestAnimationFrame(() => this.gameLoop());
    
        // Calculate elepsed time
        let now = Date.now();
        let elapsed = now - this._then;
     
        // If enough time has elapsed, draw the next frame
        if (elapsed > this._fpsInterval) {

            if (Game.level) {
                Game.level.update();
            }

            if (Game.notes) {
                Game.notes.forEach(note => {
                    note.update();
                });
            }

            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            this._then = now - (elapsed % this._fpsInterval);
        }
    }

    increaseScore(score:number):void {
        this._score += score;
    }

    lowerScore(score:number):void {
        this._score -= score;
    }

    get score():number {
        return this._score;
    }

    get fps():number {
        return this._fps;
    }

}

window.addEventListener("load", () => {
    Game.getInstance()
});
