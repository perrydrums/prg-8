/**
 * @class DOMHelper
 *
 * Contains helper functions related to the DOM.
 */
class DOMHelper {

    private static _startScreen:HTMLElement;
    private static _startButton:HTMLElement;
    
    /**
     * Returns a startscreen HTML element.
     * 
     * @param {Level} level
     * 
     * @returns {HTMLElement}
     */
    public static getStartScreen(level:Level):HTMLElement {
        // Create a Div Element with the StartScreen class
        this._startScreen = document.createElement('div');
        this._startScreen.classList.add('StartScreen');

        // Create a wrapper element to center button
        const wrapper = document.createElement('div');
        wrapper.id = 'TracksSelector';
        this._startScreen.appendChild(wrapper);

        // Create the start button
        this._startButton = document.createElement('button');
        this._startButton.classList.add('SelectTrackButton');
        this._startButton.innerText = 'Start';

        // Add the EventListener
        this._startButton.addEventListener("click", () => {
            level.start();
        }, false);

        wrapper.appendChild(this._startButton);

        return this._startScreen;
    }

    /**
     * Returns the keydown keycode for a given fretID.
     * 
     * @param {number} fretID
     *
     * @returns {number}
     */
    public static getKeyFromFretId(fretID:number):number {
        switch (fretID) {
            case 0: // z
                return 90;
            case 1: // c
                return 67;
            case 2: // b
                return 66;
            case 3: // m
                return 77;
            default:
                break;
        }
    }

    /**
     * Removes the note from the DOM and the reference to the instance.
     * 
     * @param {Note} note
     */
    public static removeNote(note:Note):void {
        note.element.remove();
        let index = Game.notes.indexOf(note);
        if (index !== -1) {
            Game.notes.splice(index, 1);
        }
    }

    /**
     * Automatically download a file with content.
     * 
     * @param {string} content 
     * @param {string} fileName 
     * @param {string} contentType 
     */
    public static downloadFile(content:string, fileName:string, contentType:string) {
        // TODO: Create a download/save button
        let a = document.createElement("a");
        let file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    /**
     * 
     * @param {string} id
     * @param {string} source
     * 
     * @returns {HTMLAudioElement} 
     */
    public static createAudioElement(id:string, source:string):HTMLAudioElement {
        let audio = document.createElement('audio');
        audio.id  = id;
        audio.src = source;
        return audio;
    }

}
