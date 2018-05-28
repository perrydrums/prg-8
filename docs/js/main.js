"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Creator = (function () {
    function Creator(track) {
        var _this = this;
        this.addToFile = function (index) {
            var time = Date.now() - _this.start;
            _this.file.kicks.push({
                id: _this.last_id,
                time: time,
                fret: index
            });
            _this.last_id++;
        };
        this.track = track;
        this.start = Date.now();
        this.last_id = 0;
        this.file = new Sheet(this.track.id, this.track.name);
        window.addEventListener("keydown", function () { _this.setKeyPressEvents(event, _this); }, false);
    }
    Creator.prototype.setKeyPressEvents = function (e, self) {
        switch (e.keyCode) {
            case 90:
                this.addToFile(0);
                break;
            case 67:
                this.addToFile(1);
                break;
            case 66:
                this.addToFile(2);
                break;
            case 77:
                this.addToFile(3);
                break;
            case 13:
                this.saveFile(JSON.stringify(this.file.getJSON()), this.track.name + '.json', 'application/json');
                break;
        }
    };
    Creator.prototype.saveFile = function (content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    };
    return Creator;
}());
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
            if (Game.level) {
                Game.level.update();
            }
            if (Game.kicks) {
                Game.kicks.forEach(function (kick) {
                    kick.update();
                });
            }
            this.then = now - (elapsed % this.fpsInterval);
        }
    };
    Game.prototype.getFPS = function () {
        return this.fps;
    };
    Game.kicks = [];
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Note = (function () {
    function Note() {
    }
    return Note;
}());
var Kick = (function (_super) {
    __extends(Kick, _super);
    function Kick(letter, fretID) {
        var _this = _super.call(this) || this;
        _this.y = 0;
        _this.speed = 10;
        _this._element = document.createElement('div');
        _this.fretID = fretID;
        var e = _this._element;
        e.style.backgroundImage = "url('images/dot.png')";
        e.classList.add('Kick');
        _this.fret = document.getElementById('fret_' + _this.fretID);
        _this.fret.appendChild(e);
        return _this;
    }
    Kick.prototype.update = function () {
        if (this.y < (this.fret.getBoundingClientRect().height - this.element.getBoundingClientRect().height)) {
            this.y += this.speed;
            this.element.style.transform = "translate(0px, " + this.y + "px)";
        }
        else {
            this.element.remove();
            var index = Game.kicks.indexOf(this);
            if (index !== -1) {
                Game.kicks.splice(index, 1);
            }
        }
    };
    Object.defineProperty(Kick.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    return Kick;
}(Note));
var Level = (function () {
    function Level(track, creator) {
        if (creator === void 0) { creator = true; }
        this._track = track;
        this.show();
        if (creator) {
            var c = new Creator(track);
        }
    }
    Level.prototype.show = function () {
        var selector = Selector.getInstance();
        selector.hide();
        this.level = document.createElement('div');
        this.level.classList.add('Level');
        this.level.innerHTML = this._track.name;
        this.fretBoard = document.createElement('div');
        this.fretBoard.id = 'FretBoard';
        this.level.appendChild(this.fretBoard);
        for (var i = 0; i < 4; i++) {
            var fret = document.createElement('div');
            fret.classList.add('Fret');
            fret.id = 'fret_' + i;
            this.fretBoard.appendChild(fret);
        }
        document.body.appendChild(this.level);
        this.startScreen = DOMHelper.getStartScreen(this);
        this.level.appendChild(this.startScreen);
    };
    Level.prototype.start = function () {
        this.startScreen.remove();
        Game.level = this;
        this.timer = 0;
        document.getElementById("music1").play();
        console.log('START ' + this._track.name);
    };
    Level.prototype.update = function () {
        var bpm = this.track.bpm;
        var fps = Game.getInstance().getFPS();
        var step = Math.round(fps / (bpm / 60));
        if (this.timer === step) {
            Game.kicks.push(new Kick('a', Math.floor(Math.random() * 4)));
            this.timer = 0;
        }
        else {
            this.timer++;
        }
    };
    Object.defineProperty(Level.prototype, "track", {
        get: function () {
            return this._track;
        },
        enumerable: true,
        configurable: true
    });
    return Level;
}());
var Selector = (function () {
    function Selector() {
        this.tracks = [];
    }
    Selector.getInstance = function () {
        if (!this.instance) {
            this.instance = new Selector();
        }
        return this.instance;
    };
    Selector.prototype.show = function () {
        return __awaiter(this, void 0, void 0, function () {
            var html, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.selector = document.createElement('div');
                        this.selector.classList.add('Selector');
                        html = '<h1>Song Selection</h1>';
                        _a = html;
                        return [4, this.getTrackList()];
                    case 1:
                        html = _a + _b.sent();
                        this.selector.innerHTML = html;
                        document.body.appendChild(this.selector);
                        this.setListeners();
                        return [2];
                }
            });
        });
    };
    Selector.prototype.hide = function () {
        document.body.removeChild(this.selector);
    };
    Selector.prototype.getTrackList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Fetcher.fetchJSONFile('data/tracks.json')];
                    case 1:
                        json = _a.sent();
                        this.tracks = Track.createTracks(json);
                        html = "<div id=\"TracksSelector\">";
                        this.tracks.forEach(function (track) {
                            html += "<button class=\"SelectTrackButton\" id=\"track_" + track.id + "\">" + track.name + "</button>";
                        });
                        html += "</div>";
                        return [2, html];
                }
            });
        });
    };
    Selector.prototype.setListeners = function () {
        this.tracks.forEach(function (track) {
            var button = document.getElementById("track_" + track.id);
            button.addEventListener("click", function () {
                new Level(track);
            }, false);
        });
    };
    return Selector;
}());
var Sheet = (function () {
    function Sheet(id, name) {
        this.kicks = [];
        this.id = id;
        this.name = name;
    }
    Sheet.prototype.getJSON = function () {
        return {
            id: this.id,
            name: this.name,
            kicks: this.kicks
        };
    };
    return Sheet;
}());
var Track = (function () {
    function Track(id, name, artist, description, duration, bpm, difficulty) {
        this._id = id;
        this._name = name;
        this._artist = artist;
        this._description = description;
        this._duration = duration;
        this._bpm = bpm;
        this._difficulty = difficulty;
    }
    Track.createTracks = function (tracks) {
        var t = [];
        for (var i = 0; i < tracks.length; i++) {
            t.push(new Track(tracks[i].id, tracks[i].name, tracks[i].artist, tracks[i].description, tracks[i].duration, tracks[i].bpm, tracks[i].difficulty));
        }
        return t;
    };
    Object.defineProperty(Track.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Track.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Track.prototype, "artist", {
        get: function () {
            return this._artist;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Track.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Track.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Track.prototype, "bpm", {
        get: function () {
            return this._bpm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Track.prototype, "difficulty", {
        get: function () {
            return this._difficulty;
        },
        enumerable: true,
        configurable: true
    });
    return Track;
}());
var DOMHelper = (function () {
    function DOMHelper() {
    }
    DOMHelper.getStartScreen = function (level) {
        this.startScreen = document.createElement('div');
        this.startScreen.classList.add('StartScreen');
        var wrapper = document.createElement('div');
        wrapper.id = 'TracksSelector';
        this.startScreen.appendChild(wrapper);
        this.startButton = document.createElement('button');
        this.startButton.classList.add('SelectTrackButton');
        this.startButton.innerText = 'Start';
        this.startButton.addEventListener("click", function () {
            level.start();
        }, false);
        wrapper.appendChild(this.startButton);
        return this.startScreen;
    };
    return DOMHelper;
}());
var Fetcher = (function () {
    function Fetcher() {
    }
    Fetcher.fetchJSONFile = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(path)];
                    case 1:
                        response = _a.sent();
                        return [4, response.json()];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    return Fetcher;
}());
//# sourceMappingURL=main.js.map