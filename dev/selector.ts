/**
 * @class Selector
 *
 * Handles the display and interactions of the Track Selection screen
 *
 * Singleton class
 */
class Selector {

    private static instance: Selector;

    private tracks:Track[] = [];

    private selector:HTMLElement;

    /**
     * Make the constructor private
     */
    private constructor() {}

    /**
     * There can only be one Selector
     * 
     * @returns Selector
     */
    public static getInstance() {
        if (!this.instance) {
            this.instance = new Selector()
        }
        return this.instance
    }

    /**
     * Creates a track selection screen
     */
    public async show() {
        // Create a Div Element with the selector class
        this.selector = document.createElement('div');
        this.selector.classList.add('Selector');

        // Insert HTML
        let html = '<h1>Song Selection</h1>';
        html += await this.getTrackList();

        this.selector.innerHTML = html;

        // Append selector to body
        document.body.appendChild(this.selector);

        this.setListeners();
    }

    public hide() {
        document.body.removeChild(this.selector);
    }

    /**
     * Creates the HTML for the list of all available tracks
     * 
     * @returns string
     */
    private async getTrackList() {

        /** @const Promise json */
        const json = await Fetcher.fetchJSONFile('data/tracks.json');

        this.tracks = Track.createTracks(json);
        let html:string = `<div id="TracksSelector">`;

        this.tracks.forEach(track => {
            html += `<button class="SelectTrackButton" id="track_${track.id}">${track.name}</button>`;
        });

        html += `</div>`;
        return html
    }

    /**
     * Set an EventListener on each track button
     */
    private setListeners() {
        this.tracks.forEach(track => {
            let button = document.getElementById("track_" + track.id);
            button.addEventListener("click", () => {
                new Level(track);
            }, false);
        });
    }

}
