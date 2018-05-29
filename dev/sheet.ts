class Sheet {

    private id: number;
    private name: string;
    public kicks: any[] = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public getJSON() {
        return {
            id : this.id,
            name : this.name,
            kicks : this.kicks
        }
    }

    public static createFromJSON(json:any):Sheet {

        let s = new Sheet(json.id, json.name);
        s.kicks = json.kicks;

        return s;
    }
}