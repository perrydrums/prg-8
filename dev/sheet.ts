class Sheet {

    private id: number;
    private name: string;
    public kicks: object[] = [];

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
}