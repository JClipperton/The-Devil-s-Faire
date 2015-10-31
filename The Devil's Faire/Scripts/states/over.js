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
    // OVER CLASS
    var Over = (function (_super) {
        __extends(Over, _super);
        // CONSTRUCTOR
        function Over() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Over.prototype.start = function () {
            createjs.Sound.play("gameover");
            this._container = new createjs.Container(); //wrap scene in container to fix y offset
            this._container.y = 2;
            // game over screen
            this._gameOverScreen = new createjs.Bitmap(assets.getResult("gameOverScreen"));
            this._container.addChild(this._gameOverScreen);
            // back button
            this._backButton = new objects.GameObject("resetButton", 360, 505);
            this._backButton.on("click", this._clickBackButton, this); // event listener
            this._container.addChild(this._backButton);
            this.addChild(this._container);
            stage.addChild(this);
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        Over.prototype._clickBackButton = function (event) {
            changeState(config.MENU_STATE); // back to menu screen
        };
        return Over;
    })(objects.Scene);
    states.Over = Over;
})(states || (states = {}));
//# sourceMappingURL=over.js.map