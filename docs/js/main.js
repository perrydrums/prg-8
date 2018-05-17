"use strict";
var Game = (function () {
    function Game() {
        this.fps = 30;
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.gameLoop();
        var selector = Selector.getInstance();
        selector.show();
    }
    Game.getInstance = function () {
        if (!this.instance) {
            this.instance = new Game();
        }
        return this.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
        var now = Date.now();
        var elapsed = now - this.then;
        if (elapsed > this.fpsInterval) {
            console.log('Gameloop!');
            this.then = now - (elapsed % this.fpsInterval);
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Selector = (function () {
    function Selector() {
    }
    Selector.getInstance = function () {
        if (!this.instance) {
            this.instance = new Selector();
        }
        return this.instance;
    };
    Selector.prototype.show = function () {
        var selector = document.createElement('div');
        selector.classList.add('selector');
        var html = '<h1>Song Selection</h1>';
        html += this.getTrackList();
        selector.innerHTML = html;
        document.body.appendChild(selector);
    };
    Selector.prototype.getTrackList = function () {
        var tracks = ['Track 1', 'Track 2', 'Track 3'];
        var trackList = '<ul>';
        tracks.forEach(function (element) {
            trackList += '<li>' + element + '</li>';
        });
        trackList += '</ul>';
        return trackList;
    };
    return Selector;
}());
var DOMHelper = (function () {
    function DOMHelper() {
    }
    return DOMHelper;
}());
//# sourceMappingURL=main.js.map