/**
 * @class Game
 * 
 * Singleton class
 */
class Game {

    private static instance:Game;

    /**
     * The speed, in frames per second, the game runs at
     */
    private fps:number = 30;

    private fpsInterval:number;

    private then:number;

    public static kicks:Kick[] = [];

    public static level:Level;

    /**
     * Make the constructor private
     */
    private constructor() {
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.gameLoop();
        let selector = Selector.getInstance();
        selector.show();
    }

    /**
     * There can only be one Game
     * 
     * @returns Game
     */
    public static getInstance() {
        if (!this.instance) {
           this.instance = new Game()
        }
        return this.instance
    }
    
    gameLoop() {
        requestAnimationFrame(() => this.gameLoop());
    
        // Calculate elepsed time
        let now = Date.now();
        let elapsed = now - this.then;
     
        // If enough time has elapsed, draw the next frame
        if (elapsed > this.fpsInterval) {

            if (Game.level) {
                Game.level.update();
            }

            if (Game.kicks) {
                Game.kicks.forEach(kick => {
                    kick.update();
                });
            }

            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            this.then = now - (elapsed % this.fpsInterval);
        }
    }

    getFPS():number {
        return this.fps;
    }

}

window.addEventListener("load", () => {
    Game.getInstance()
});
