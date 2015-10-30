/// <reference path="../config/config.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/stats/stats.d.ts" />
/// <reference path="../typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../typings/easeljs/easeljs.d.ts" />
/// <reference path="../typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../typings/soundjs/soundjs.d.ts" />
/// <reference path="../typings/preloadjs/preloadjs.d.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/spritebutton.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/scene.ts" />
/// <reference path="../states/over.ts" />
/// <reference path="../states/game.ts" />
/// <reference path="../states/menu.ts" />
// GLOBAL GAME FRAMEWORK VARIABLES
var assets;
var canvas;
var stage;
var stats;
var state;
var currentState; // alias for our current state
var atlas;
// GAME OBJECTS
var menu;
var game;
var over;
// manifest of all our assets
var manifest = [
    { id: "BackButton", src: "../../Assets/images/BackButton.png" },
    { id: "NextButton", src: "../../Assets/images/NextButton.png" },
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "background", src: "../../Assets/images/background.jpg" },
    { id: "background_fade", src: "../../Assets/images/background_fade.jpg" },
    { id: "gameStartScreen", src: "../../Assets/images/gameStartScreen.jpg" },
    { id: "gameOverScreen", src: "../../Assets/images/gameOverScreen.jpg" },
    { id: "yay", src: "../../Assets/audio/yay.ogg" }
];
var data = {
    "images": [
        "../../Assets/images/atlas.png"
    ],
    "frames": [
        [2, 2, 475, 585, 0, 0, 0],
        [2, 589, 392, 190, 0, 0, 0],
        [396, 589, 71, 62, 0, -4, 0],
        [469, 589, 1, 1, 0, 0, 0],
        [396, 653, 57, 62, 0, -11, 0],
        [396, 717, 54, 62, 0, -13, 0],
        [2, 781, 320, 509, 0, 0, 0],
        [324, 781, 143, 63, 0, 0, 0],
        [324, 846, 143, 63, 0, 0, 0],
        [2, 1292, 85, 67, 0, 0, 0],
        [2, 1361, 49, 50, 0, 0, 0],
        [53, 1361, 48, 49, 0, 0, 0],
        [89, 1292, 334, 63, 0, 0, 0],
        [103, 1357, 334, 63, 0, 0, 0],
        [425, 911, 52, 62, 0, -14, 0],
        [425, 975, 48, 49, 0, 0, 0],
        [425, 1026, 45, 45, 0, 0, 0],
        [425, 1073, 43, 62, 0, -18, 0],
        [324, 911, 88, 186, 0, 0, 0]
    ],
    "animations": {
        "slotmachine": [0],
        "gameOverText": [1],
        "imp": [2],
        "blank": [3],
        "skull": [4],
        "cthulhu": [5],
        "demonOverlay": [6],
        "currentBetField": [7],
        "walletField": [8],
        "spinButton": [9],
        "bet125Button": [10],
        "bet25Button": [11],
        "jackpotField": [12],
        "jackpotField_winner": [13],
        "succubus": [14],
        "bet5Button": [15],
        "powerButton": [16],
        "devil": [17],
        "bars": [18]
    },
};
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    atlas = new createjs.SpriteSheet(data);
}
function init() {
    canvas = document.getElementById("canvas"); // reference to canvas element
    stage = new createjs.Stage(canvas); // passing canvas to stage
    stage.enableMouseOver(20); // enable mouse events
    createjs.Ticker.setFPS(60); // set frame rate to 60 fps
    createjs.Ticker.on("tick", gameLoop); // update gameLoop every frame
    setupStats(); // sets up our stats counting
    state = config.MENU_STATE;
    changeState(state);
}
// Main Game Loop
function gameLoop(event) {
    stats.begin(); // start counting
    currentState.update(); // calling State's update method
    stage.update(); // redraw/refresh stage every frame
    stats.end(); // stop counting
}
// Setup Game Stats
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
// state machine prep
function changeState(state) {
    // Launch various scenes
    switch (state) {
        case config.MENU_STATE:
            // show the menu scene
            stage.removeAllChildren();
            menu = new states.Menu();
            currentState = menu;
            break;
        case config.PLAY_STATE:
            // show the play scene
            stage.removeAllChildren();
            game = new states.Game();
            currentState = game;
            break;
        case config.OVER_STATE:
            // show the game over scene
            stage.removeAllChildren();
            over = new states.Over();
            currentState = over;
            break;
    }
    currentState.start();
    console.log(currentState.numChildren);
}
//# sourceMappingURL=game.js.map