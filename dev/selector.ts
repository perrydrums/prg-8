/**
 * @class Selector
 * 
 * Singleton
 */
class Selector {

    private static instance:Selector

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
     * Creates a song selection screen
     */
    public show() {
        // Create a Div Element with the selector class
        let selector = document.createElement('div')
        selector.classList.add('selector')

        // Insert HTML
        let html = '<h1>Song Selection</h1>'
        html += this.getTrackList()
        selector.innerHTML = html

        // Append selector to body
        document.body.appendChild(selector)
    }

    /**
     * Creates the HTML for the list of all available tracks
     * 
     * @returns string
     */
    private getTrackList():string {
        let tracks = ['Track 1', 'Track 2', 'Track 3']
        let trackList = '<ul>';
        tracks.forEach(element => {
            trackList += '<li>' + element + '</li>'
        });
        trackList += '</ul>'
        return trackList;
    }

}