var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/********************************************************************************************\
 * The Devil's Faire - COMP397 Assignment 2                                                 *
 * Author: Jay Clipperton                                                                   *
 * Last modified by: JHRC, Date last modified: Devil's Night 2015                           *
 * Program Description: Devilish Slot Machine made with CreateJS framework                  *
 * Feel an itch in your pocket and a whole lot of luck, try you turn at the Devil's Faire!  *
 * Revision History available at: https://github.com/JClipperton/The-Devil-s-Faire          *
\********************************************************************************************/
var states;
(function (states) {
    // MENU CLASS
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // CONSTRUCTOR
        function Menu() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Menu.prototype.start = function () {
            createjs.Sound.play("introMusic");
            this._container = new createjs.Container(); //wrap scene in container to fix y offset
            this._container.y = 2;
            // start button
            this._gameStartScreen = new createjs.Bitmap(assets.getResult("gameStartScreen")); // add background
            this._gameStartScreen.on("click", this._clickScreen, this); // event listener
            this._container.addChild(this._gameStartScreen); // add to stage
            this.addChild(this._container);
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Button Click
        Menu.prototype._clickScreen = function (event) {
            changeState(config.PLAY_STATE);
            createjs.Sound.play("itemGet1");
        };
        return Menu;
    })(objects.Scene);
    states.Menu = Menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map