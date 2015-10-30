var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            this._container = new createjs.Container(); //wrap scene in container to fix y offset
            this._container.y = 2;
            // game over screen
            this._gameOverScreen = new createjs.Bitmap(assets.getResult("gameOverScreen"));
            this._container.addChild(this._gameOverScreen);
            // back button
            this._backButton = new objects.Button("BackButton", 383, 526);
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