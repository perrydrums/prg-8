# Hardcore Hero

### Perry Janssen 0924208
Hogeschool Rotterdam CMGT - PRG-08

## Live preview
[Deze repo op github pages](https://perrydrums.github.io/prg-8)

## Installatieintructies

Volg deze instructies om deze game lokaal te installeren:

1. Clone deze repository.
2. In de root van deze repo, run `http-server -o` *[1] om het project in de browser te openen.
3. Navigeer naar het mapje `docs` op de geopende pagina in de browser.

*[1]: Als het commando niet wordt herkend, installeer de [http-server module](https://www.npmjs.com/package/http-server) globaal.

## Pull Request

Ik heb voor Arno's project een verandering gemaakt in zijn Game class. Ik zag dat Arno zijn Game instance mee geeft aan een Car class. Om te voorkomen dat de Game class constant moet worden doorgegeven aan andere classen, heb ik besloten van de Game class een singleton te maken, aangezien er sowieso altijd maar 1 instance van Game mag zijn.

[Pull Request voor Arno's project](https://github.com/arnojong/prg08/pull/1)

## Peer Review

Ik heb voor het project van Carin een Peer Review geschreven waarnaar ik kijk of de onderdelen Strategy, Observer, Singleton en Polymorfisme zijn geimplementeerd.

[Peer Review](https://github.com/carinhansen/typescript-game/issues/2)

## Klassendiagram UML
Hier mijn klassendiagram.
De DOMHelper en Fetcher class hebben geen relatie met de andere classes omdat deze dienen als Helper classes. Ze bevatten enkel public static functions.

`Note` is een abstracte class en kan geen instantie van worden gemaakt.

![Klassendiagram UML](/uml.png "Klassendiagram")

## Singleton

Ik gebruik op twee plaatsen een Singleton class: In `Game` en `Selector`. Hiervan zullen er altijd maar 1 instantie mogen zijn. Het maakt het, vooral voor `Game`, ook erg makkelijk properties en methods van de Game class aan te kunnen spreken. Dit wordt in vele classes namelijk gedaan, en zo hoef ik niet de `Game` mee te geven als parameters bij een class.

```typescript
/**
 * Make the constructor private.
 */
private constructor() {
    this._fpsInterval = 1000 / this._fps;
    this._then = Date.now();
    setInterval(() => this.gameLoop(), 1);
    let selector = Selector.getInstance();
    selector.show();
}

/**
 * There can always only be one Game instance.
 * 
 * @returns {Game}
 */
public static getInstance() {
    if (!this._instance) {
        this._instance = new Game();
    }
    return this._instance;
}
```

## Polymorfisme

Het gebruik van Polymorfisme kan je terugzien in de `Level` en `Game` classes. Hier worden arrays van `Note` gemaakt terwijl deze met `BasicNote` of `PowerUpNote` worden gevuld. Deze twee classes verschillen enkel qua uiterlijk en puntentelling. Van de `Note` class kan trouwens geen instantie worden gemaakt, deze is abstract.

*Voorbeeld hoe met kansberekening een `BasicNote` of `PowerUpNote` wordt gemaakt:*
```typescript
/**
 * Create a new Note based on chance.
 */
private createNote(fret:number):Note {
    const r = Math.floor(Math.random() * 100);
    if (r < 90) {
        return new BasicNote(fret);
    }
    else {
        return new PowerUpNote(fret);
    }
}
```

Nu kan ik ook makkelijk beide soorten Note classes aanspreken door een array van `Note` te gebruiken.

```typescript
if (Game.notes) {
    Game.notes.forEach(note => {
        note.update();
    });
}
```

## Strategy

Ik gebruik het Strategy patroon in mijn 'behaviours': een interface `NoteBehaviour` die door `NoteHitBehaviour` en `NoteHitBehaviourCombi` worden geimplementeerd. Deze vertellen aan de `Note` hoe het moet worden 'gespeeld' door de player. (Dit is verschillend voor beide behaviours) In `NoteHitBehaviourCombo` wordt een combo streak bijgehouden en de hit animatie veranderd.

```typescript
interface NoteBehaviour {

    /**
     * The note that contains this behaviour.
     */
    note:Note;

    /**
     * True if the note can be played right now.
     */
    now:boolean;

    /**
     * Should check if the note can be played at a time.
     */
    checkPosition():void;

    /**
     * Should run when a note is played correctly.
     */
    register():void;

}
```

## Observer

Ik gebruik het Observer patroon in `Level` en `Note`, waarbij `Note` de observer is. `Level` geeft aan de observer door wanneer de Note gespeeld kan worden.

*De Subject interface:*
```typescript
interface Subject {

    registerObserver(observer:Observer):void;

    removeObserver(observer:Observer):void;

    notifyObservers():void;

}
```

*In Level:*
```typescript
public notifyObservers() {
    for (let observer of this._observers) {
        if (observer instanceof Note) {
            if (observer.y > 600 && observer.y < 900) {
                observer.now = true;
            }
            else {
                observer.now = false;
            }
        }
    }
}
```
