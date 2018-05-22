class Level {

    startScreen:HTMLElement;

    track:Track;

    constructor(track:Track) {
        this.track = track;
        this.show();
    }

    show() {
        let selector = Selector.getInstance();
        selector.hide();

        // Create a Div Element with the selector class
        this.startScreen = document.createElement('div');
        this.startScreen.classList.add('StartScreen');
        this.startScreen.innerHTML = this.track.name;

        document.body.appendChild(this.startScreen);
    }

}