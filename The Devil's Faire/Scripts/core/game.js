/********************************************************************************************\
 * The Devil's Faire - COMP397 Assignment 2                                                 *
 * Author: Jay Clipperton                                                                   *
 * Last modified by: JHRC, Date last modified: Devil's Night 2015                           *
 * Program Description: Devilish Slot Machine made with CreateJS framework                  *
 * Feel an itch in your pocket and a whole lot of luck, try your turn at the Devil's Faire! *
 * Revision History available at: https://github.com/JClipperton/The-Devil-s-Faire          *
\********************************************************************************************/
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
    { id: "background", src: "../../Assets/images/background.jpg" },
    { id: "background_fade", src: "../../Assets/images/background_fade.jpg" },
    { id: "gameStartScreen", src: "../../Assets/images/gameStartScreen.jpg" },
    { id: "gameOverScreen", src: "../../Assets/images/gameOverScreen.jpg" },
    { id: "gameover", src: "../../Assets/audio/gameover.mp3" },
    { id: "stageMusic", src: "../../Assets/audio/stageMusic.mp3" },
    { id: "introMusic", src: "../../Assets/audio/introMusic.mp3" },
    { id: "coin1", src: "../../Assets/audio/coin.wav" },
    { id: "coin2", src: "../../Assets/audio/coin2.wav" },
    { id: "success1", src: "../../Assets/audio/success.wav" },
    { id: "success2", src: "../../Assets/audio/success2.wav" },
    { id: "itemGet1", src: "../../Assets/audio/itemGet.wav" },
    { id: "itemGet2", src: "../../Assets/audio/itemGet2.wav" }
];
var data = {
    "images": [
        "../../Assets/images/atlas.png"
    ],
    "frames": [
        [2, 2, 475, 585, 0, 0, 0],
        [2, 589, 334, 63, 0, 0, 0],
        [338, 589, 88, 186, 0, 0, 0],
        [2, 654, 334, 63, 0, 0, 0],
        [2, 719, 143, 63, 0, 0, 0],
        [147, 719, 143, 63, 0, 0, 0],
        [292, 719, 43, 62, 0, -18, 0],
        [337, 777, 85, 67, 0, 0, 0],
        [424, 777, 52, 62, 0, -14, 0],
        [424, 841, 1, 1, 0, 0, 0],
        [428, 589, 49, 50, 0, 0, 0],
        [428, 641, 48, 49, 0, 0, 0],
        [428, 692, 48, 49, 0, 0, 0],
        [2, 784, 71, 62, 0, -4, 0],
        [75, 784, 57, 62, 0, -11, 0],
        [134, 784, 54, 62, 0, -13, 0],
        [190, 784, 46, 44, 0, 0, 0],
        [238, 784, 45, 45, 0, 0, 0]
    ],
    "animations": {
        "slotmachine": [0],
        "jackpotField": [1],
        "bars": [2],
        "jackpotField_winner": [3],
        "currentBetField": [4],
        "walletField": [5],
        "devil": [6],
        "spinButton": [7],
        "succubus": [8],
        "blank": [9],
        "bet125Button": [10],
        "bet25Button": [11],
        "bet5Button": [12],
        "imp": [13],
        "skull": [14],
        "cthulhu": [15],
        "resetButton": [16],
        "powerButton": [17]
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
}
//# sourceMappingURL=game.js.map