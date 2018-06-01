class Sheet {

    private _id: number;
    private _name: string;
    private _notes: any[] = [];

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    /**
     * Get this instance as a JSON object
     * 
     * @returns {object}
     */
    public getJSON():object {
        return {
            id : this._id,
            name : this._name,
            notes : this._notes
        }
    }

    /**
     * Create a new Sheet instance from a JSON file.
     * 
     * @param json
     * 
     * @returns {Sheet}
     */
    public static createFromJSON(json:any):Sheet {

        let s = new Sheet(json.id, json.name);
        s._notes = json.notes;

        return s;
    }

    public get id():number {
        return this._id;
    }

    public get name():string {
        return this._name;
    }

    public get notes():any[] {
        return this._notes;
    }
}