/**
 * @class DOMHelper
 *
 * Contains helper functions related to the DOM
 */
class DOMHelper {

    private static startScreen:HTMLElement;
    private static startButton:HTMLElement;
    
    /**
     * Returns a startscreen HTML element
     * 
     * @param level
     * 
     * @returns HTMLElement
     */
    public static getStartScreen(level:Level):HTMLElement {
        // Create a Div Element with the StartScreen class
        this.startScreen = document.createElement('div');
        this.startScreen.classList.add('StartScreen');

        // Create a wrapper element to center button
        const wrapper = document.createElement('div');
        wrapper.id = 'TracksSelector';
        this.startScreen.appendChild(wrapper);

        // Create the start button
        this.startButton = document.createElement('button');
        this.startButton.classList.add('SelectTrackButton');
        this.startButton.innerText = 'Start';

        // Add the EventListener
        this.startButton.addEventListener("click", () => {
            level.start();
        }, false);

        wrapper.appendChild(this.startButton);

        return this.startScreen;
    }

}
