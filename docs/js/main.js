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
var Note = (function () {
    function Note(fretID) {
        this._y = 0;
        this._speed = 10;
        this._stop = false;
        this._noteBehaviour = new NoteHitBehaviour(this);
        this._element = document.createElement('div');
        this._fretID = fretID;
    }
    Note.prototype.update = function () {
        if (this._y < (this._fret.getBoundingClientRect().height - this.element.getBoundingClientRect().height)) {
            this._y += this._speed;
            this.element.style.transform = "translate(0px, " + this._y + "px)";
        }
        else {
            Game.getInstance().lowerScore(5);
            DOMHelper.removeNote(this);
        }
        this.checkPosition();
    };
    Note.prototype.checkPosition = function () {
        this._noteBehaviour.checkPosition();
    };
    Note.prototype.stopNote = function () {
        this._speed = 0;
        this._stop = true;
    };
    Note.prototype.registerScore = function () {
    };
    Note.prototype.changeBehaviour = function (behaviour) {
        this._noteBehaviour = behaviour;
    };
    Object.defineProperty(Note.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "fretID", {
        get: function () {
            return this._fretID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "stop", {
        get: function () {
            return this._stop;
        },
        enumerable: true,
        configurable: true
    });
    return Note;
}());
var BasicNote = (function (_super) {
    __extends(BasicNote, _super);
    function BasicNote(fretID) {
        var _this = _super.call(this, fretID) || this;
        var e = _this._element;
        e.style.backgroundImage = "url('images/dot.png')";
        e.classList.add('Note');
        _this._fret = document.getElementById('fret_' + _this._fretID);
        _this._fret.appendChild(e);
        return _this;
    }
    BasicNote.prototype.registerScore = function () {
        Game.getInstance().increaseScore(10);
    };
    return BasicNote;
}(Note));
var Creator = (function () {
    function Creator(track) {
        var _this = this;
        this.addToFile = function (index) {
            var time = Date.now() - _this.start;
            var beat = _this.getBeat(time);
            console.log("BEAT", beat);
            _this._sheet.notes.push({
                id: _this._last_id,
                beat: beat,
                fret: index
            });
            _this._last_id++;
        };
        this._track = track;
        this._last_id = 0;
        this._sheet = new Sheet(this._track.id, this._track.name);
        window.addEventListener("keydown", function () { _this.checkKeyPressEvents(event); }, false);
    }
    Creator.prototype.checkKeyPressEvents = function (e) {
        if (e instanceof KeyboardEvent) {
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
                    DOMHelper.downloadFile(JSON.stringify(this._sheet.getJSON()), this._track.name + '.json', 'application/json');
                    break;
            }
        }
    };
    Creator.prototype.getBeat = function (time) {
        var step = (60 / this._track.bpm) * 500;
        return Math.floor(time / step);
    };
    return Creator;
}());
var Game = (function () {
    function Game() {
        this._fps = 30;
        this._score = 0;
        this._fpsInterval = 1000 / this._fps;
        this._then = Date.now();
        this.gameLoop();
        var selector = Selector.getInstance();
        selector.show();
    }
    Game.getInstance = function () {
        if (!this._instance) {
            this._instance = new Game();
        }
        return this._instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
        var now = Date.now();
        var elapsed = now - this._then;
        if (elapsed > this._fpsInterval) {
            if (Game.level) {
                Game.level.update();
            }
            if (Game.notes) {
                Game.notes.forEach(function (note) {
                    note.update();
                });
            }
            this._then = now - (elapsed % this._fpsInterval);
        }
    };
    Game.prototype.increaseScore = function (score) {
        this._score += score;
    };
    Game.prototype.lowerScore = function (score) {
        this._score -= score;
    };
    Object.defineProperty(Game.prototype, "score", {
        get: function () {
            return this._score;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "fps", {
        get: function () {
            return this._fps;
        },
        enumerable: true,
        configurable: true
    });
    Game.notes = [];
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Level = (function () {
    function Level(track, creator) {
        if (creator === void 0) { creator = true; }
        this._track = track;
        this.show();
        if (creator) {
            this._creator = new Creator(track);
        }
    }
    Level.prototype.show = function () {
        var selector = Selector.getInstance();
        selector.hide();
        this._level = document.createElement('div');
        this._level.classList.add('Level');
        this._score = document.createElement('div');
        this._score.id = 'Score';
        this._score.innerText = 'Score: ' + Game.getInstance().score;
        this._fretBoard = document.createElement('div');
        this._fretBoard.id = 'FretBoard';
        this._fretBoard.appendChild(this._score);
        this._level.appendChild(this._fretBoard);
        for (var i = 0; i < 4; i++) {
            var fret = document.createElement('div');
            fret.classList.add('Fret');
            fret.id = 'fret_' + i;
            this._fretBoard.appendChild(fret);
        }
        document.body.appendChild(this._level);
        this._startScreen = DOMHelper.getStartScreen(this);
        this._level.appendChild(this._startScreen);
    };
    Level.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, audio;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this._startScreen.remove();
                        Game.level = this;
                        this._startTime = Date.now() - 1800;
                        _a = this;
                        _c = (_b = Sheet).createFromJSON;
                        return [4, Fetcher.fetchJSONFile("data/sheets/" + this.track.id + ".json")];
                    case 1:
                        _a._sheet = _c.apply(_b, [_d.sent()]);
                        audio = DOMHelper.createAudioElement('track_' + this._track.id, 'sound/tracks/' + this._track.id + '.mp3');
                        document.body.appendChild(audio);
                        audio.play();
                        if (this._creator) {
                            this._creator.start = Date.now();
                        }
                        console.log('START ' + this._track.name);
                        return [2];
                }
            });
        });
    };
    Level.prototype.update = function () {
        var step = (60 / this.track.bpm) * 500;
        if (this._sheet.notes.length !== 0) {
            if ((Date.now() - this._startTime) > (this._sheet.notes[0].beat * step)) {
                Game.notes.push(this.createNote(this._sheet.notes[0].fret));
                this._sheet.notes.shift();
            }
        }
        this.updateScore();
    };
    Level.prototype.createNote = function (fret) {
        var r = Math.floor(Math.random() * 100);
        if (r < 90) {
            return new BasicNote(fret);
        }
        else {
            return new PowerUpNote(fret);
        }
    };
    Level.prototype.updateScore = function () {
        this._score.innerText = 'Score: ' + Game.getInstance().score;
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
var PowerUpNote = (function (_super) {
    __extends(PowerUpNote, _super);
    function PowerUpNote(fretID) {
        var _this = _super.call(this, fretID) || this;
        var e = _this._element;
        e.style.backgroundImage = "url('images/special_dot.png')";
        e.classList.add('Note');
        _this._fret = document.getElementById('fret_' + _this._fretID);
        _this._fret.appendChild(e);
        return _this;
    }
    PowerUpNote.prototype.registerScore = function () {
        Game.getInstance().increaseScore(100);
    };
    return PowerUpNote;
}(Note));
var Selector = (function () {
    function Selector() {
        this._tracks = [];
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
                        this._selector = document.createElement('div');
                        this._selector.classList.add('Selector');
                        html = '<h1>Song Selection</h1>';
                        _a = html;
                        return [4, this.getTrackList()];
                    case 1:
                        html = _a + _b.sent();
                        this._selector.innerHTML = html;
                        document.body.appendChild(this._selector);
                        this.setListeners();
                        return [2];
                }
            });
        });
    };
    Selector.prototype.hide = function () {
        document.body.removeChild(this._selector);
    };
    Selector.prototype.getTrackList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Fetcher.fetchJSONFile('data/tracks.json')];
                    case 1:
                        json = _a.sent();
                        this._tracks = Track.createTracks(json);
                        html = "<div id=\"TracksSelector\">";
                        this._tracks.forEach(function (track) {
                            html += "<button class=\"SelectTrackButton\" id=\"track_" + track.id + "\">" + track.name + "</button>";
                        });
                        html += "</div>";
                        return [2, html];
                }
            });
        });
    };
    Selector.prototype.setListeners = function () {
        this._tracks.forEach(function (track) {
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
        this._notes = [];
        this._id = id;
        this._name = name;
    }
    Sheet.prototype.getJSON = function () {
        return {
            id: this._id,
            name: this._name,
            notes: this._notes
        };
    };
    Sheet.createFromJSON = function (json) {
        var s = new Sheet(json.id, json.name);
        s._notes = json.notes;
        return s;
    };
    Object.defineProperty(Sheet.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sheet.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sheet.prototype, "notes", {
        get: function () {
            return this._notes;
        },
        enumerable: true,
        configurable: true
    });
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
var NoteHitBehaviour = (function () {
    function NoteHitBehaviour(note) {
        var _this = this;
        this.now = false;
        this.note = note;
        window.addEventListener("keydown", function () { _this.checkHit(event, DOMHelper.getKeyFromFretId(_this.note.fretID)); }, false);
    }
    NoteHitBehaviour.prototype.checkPosition = function () {
        var y = this.note.y;
        this.now = y > 600 && y < 900;
    };
    NoteHitBehaviour.prototype.checkHit = function (e, keycode) {
        if (e instanceof KeyboardEvent) {
            if (this.now && e.keyCode === keycode) {
                this.register();
                this.now = false;
            }
        }
    };
    NoteHitBehaviour.prototype.register = function () {
        var _this = this;
        if (this.note.stop) {
            return;
        }
        this.note.element.style.backgroundImage = 'url(images/dot.png), url("images/small_explosion.gif")';
        this.note.stopNote();
        setTimeout(function () {
            DOMHelper.removeNote(_this.note);
        }, 200);
        this.note.registerScore();
    };
    return NoteHitBehaviour;
}());
var DOMHelper = (function () {
    function DOMHelper() {
    }
    DOMHelper.getStartScreen = function (level) {
        this._startScreen = document.createElement('div');
        this._startScreen.classList.add('StartScreen');
        var wrapper = document.createElement('div');
        wrapper.id = 'TracksSelector';
        this._startScreen.appendChild(wrapper);
        this._startButton = document.createElement('button');
        this._startButton.classList.add('SelectTrackButton');
        this._startButton.innerText = 'Start';
        this._startButton.addEventListener("click", function () {
            level.start();
        }, false);
        wrapper.appendChild(this._startButton);
        return this._startScreen;
    };
    DOMHelper.getKeyFromFretId = function (fretID) {
        switch (fretID) {
            case 0:
                return 90;
            case 1:
                return 67;
            case 2:
                return 66;
            case 3:
                return 77;
            default:
                break;
        }
    };
    DOMHelper.removeNote = function (note) {
        note.element.remove();
        var index = Game.notes.indexOf(note);
        if (index !== -1) {
            Game.notes.splice(index, 1);
        }
    };
    DOMHelper.downloadFile = function (content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    };
    DOMHelper.createAudioElement = function (id, source) {
        var audio = document.createElement('audio');
        audio.id = id;
        audio.src = source;
        return audio;
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