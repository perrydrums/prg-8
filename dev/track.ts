class Track {

    private _id:number;
    private _name:string;
    private _artist:string;
    private _description:string;
    private _duration:number;
    private _bpm:number;
    private _difficulty:number;

    constructor(id:number, name:string, artist:string, description:string, duration:number, bpm:number, difficulty:number) {
        this._id = id;
        this._name = name;
        this._artist = artist;
        this._description = description;
        this._duration = duration;
        this._bpm = bpm;
        this._difficulty = difficulty;
    }

    /**
     * Create Track objects based on an JSON array with tracks
     * 
     * @param tracks 
     */
    public static createTracks(tracks:any):Track[] {
        let t:Track[] = [];
        for (let i = 0; i < tracks.length; i ++) {
            t.push(new Track(tracks[i].id, tracks[i].name, tracks[i].artist, tracks[i].description, tracks[i].duration, tracks[i].bpm, tracks[i].difficulty))
        }
        return t
    }

    public get id() {
        return this._id
    }

    public get name() {
        return this._name
    }

    public get artist() {
        return this._artist
    }

    public get description() {
        return this._description
    }

    public get duration() {
        return this._duration
    }

    public get bpm() {
        return this._bpm
    }

    public get difficulty() {
        return this._difficulty
    }
}
