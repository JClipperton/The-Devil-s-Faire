var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // GAME CLASS
    var Game = (function (_super) {
        __extends(Game, _super);
        // CONSTRUCTOR
        function Game() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            this._playField = new createjs.Container();
            this._playField.y = 2;
            this._background = new createjs.Bitmap(assets.getResult("background"));
            this._playField.addChild(this._background); // add background image
            this._slotmachine = new objects.GameObject("slotmachine", 130, 11);
            this._playField.addChild(this._slotmachine); // add slot machine base image
            // UI
            this._bet5Button = new objects.SpriteButton("bet5Button", 273, 375);
            this._playField.addChild(this._bet5Button);
            this._bet25Button = new objects.SpriteButton("bet25Button", 443, 376);
            this._playField.addChild(this._bet25Button);
            this._bet125Button = new objects.SpriteButton("bet125Button", 357, 395);
            this._playField.addChild(this._bet125Button);
            this._spinButton = new objects.SpriteButton("spinButton", 341, 491);
            this._playField.addChild(this._spinButton);
            // Reels
            this._tile1 = new objects.GameObject("blank", 259, 180);
            this._playField.addChild(this._tile1);
            this._tile2 = new objects.GameObject("blank", 343, 180);
            this._playField.addChild(this._tile2);
            this._tile3 = new objects.GameObject("blank", 427, 180);
            this._playField.addChild(this._tile3);
            this._bars = new objects.GameObject("bars", 339, 180);
            this._playField.addChild(this._bars);
            this.addChild(this._playField);
            stage.addChild(this);
            // add event listeners
            this._bet5Button.on("click", this._clickBet1Button, this);
            this._spinButton.on("click", this._spinButtonClick, this);
        };
        Game.prototype.update = function () {
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        Game.prototype._clickBet1Button = function (event) {
            console.log("bet 1");
        };
        /* Utility function to check if a value falls within a range of bounds */
        Game.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        Game.prototype._reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var reel = 0; reel < 3; reel++) {
                outCome[reel] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[reel]) {
                    case this._checkRange(outCome[reel], 1, 27):
                        betLine[reel] = "blank";
                        //blanks++;
                        break;
                    case this._checkRange(outCome[reel], 28, 37):
                        betLine[reel] = "grapes";
                        //grapes++;
                        break;
                    case this._checkRange(outCome[reel], 38, 46):
                        betLine[reel] = "banana";
                        // bananas++;
                        break;
                    case this._checkRange(outCome[reel], 47, 54):
                        betLine[reel] = "orange";
                        //oranges++;
                        break;
                    case this._checkRange(outCome[reel], 55, 59):
                        betLine[reel] = "cherry";
                        //cherries++;
                        break;
                    case this._checkRange(outCome[reel], 60, 62):
                        betLine[reel] = "bar";
                        //bars++;
                        break;
                    case this._checkRange(outCome[reel], 63, 64):
                        betLine[reel] = "bell";
                        //bells++;
                        break;
                    case this._checkRange(outCome[reel], 65, 65):
                        betLine[reel] = "seven";
                        //sevens++;
                        break;
                }
            }
            return betLine;
        };
        //WORKHORSE OF THE GAME
        Game.prototype._spinButtonClick = function (event) {
            this._spinResult = this._reels();
            this._tile1.gotoAndStop(this._spinResult[0]);
            this._tile2.gotoAndStop(this._spinResult[1]);
            this._tile3.gotoAndStop(this._spinResult[2]);
            console.log(this._spinResult[0] + " - " + this._spinResult[1] + " - " + this._spinResult[2]);
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map