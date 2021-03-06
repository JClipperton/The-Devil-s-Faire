/********************************************************************************************\
 * The Devil's Faire - COMP397 Assignment 2                                                 *
 * Author: Jay Clipperton                                                                   *
 * Last modified by: JHRC, Date last modified: Devil's Night 2015                           *
 * Program Description: Devilish Slot Machine made with CreateJS framework                  *
 * Feel an itch in your pocket and a whole lot of luck, try your turn at the Devil's Faire!  *
 * Revision History available at: https://github.com/JClipperton/The-Devil-s-Faire          *
\********************************************************************************************/
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
            this._jackpotField_winner = new objects.GameObject("jackpotField_winner", 218, 80);
            this._symbolTally = {
                blanks: 0,
                skulls: 0,
                imps: 0,
                cthulhi: 0,
                succubus: 0,
                devils: 0
            };
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            // update variable values
            this._cash = 100;
            this._bet = 0;
            this._jackpot = 1000;
            // create playfield to circumvent y offset
            this._playField = new createjs.Container();
            this._playField.y = 2;
            this._background = new createjs.Bitmap(assets.getResult("background"));
            this._playField.addChild(this._background); // add background image
            this._slotmachine = new objects.GameObject("slotmachine", 130, 11);
            this._playField.addChild(this._slotmachine); // add slot machine base image
            // GUI
            this._powerButton = new objects.SpriteButton("powerButton", 743, 532);
            this._playField.addChild(this._powerButton);
            this._resetButton = new objects.SpriteButton("resetButton", 680, 532);
            this._playField.addChild(this._resetButton);
            this._currentBetField = new objects.GameObject("currentBetField", 6, 17);
            this._playField.addChild(this._currentBetField);
            this._walletField = new objects.GameObject("walletField", 651, 17);
            this._playField.addChild(this._walletField);
            this._jackpotField = new objects.GameObject("jackpotField", 218, 80);
            this._playField.addChild(this._jackpotField);
            this._bet5Button = new objects.SpriteButton("bet5Button", 273, 375);
            this._playField.addChild(this._bet5Button);
            this._bet25Button = new objects.SpriteButton("bet25Button", 443, 376);
            this._playField.addChild(this._bet25Button);
            this._bet125Button = new objects.SpriteButton("bet125Button", 357, 395);
            this._playField.addChild(this._bet125Button);
            this._spinButton = new objects.SpriteButton("spinButton", 341, 491);
            this._playField.addChild(this._spinButton);
            // Labels
            this._currentBetText = new objects.Label(String(this._bet), "20px Arial", "#F8EA3D", 42, 27, false);
            this._playField.addChild(this._currentBetText);
            this._walletText = new objects.Label(String(this._cash), "20px Arial", "#F8EA3D", 688, 27, false);
            this._playField.addChild(this._walletText);
            this._jackpotText = new objects.Label(String(this._jackpot), "20px Arial", "#793700", 365, 90, false);
            this._playField.addChild(this._jackpotText);
            // Reels
            this._tile1 = new objects.GameObject("blank", 259, 242);
            this._playField.addChild(this._tile1);
            this._tile2 = new objects.GameObject("blank", 343, 242);
            this._playField.addChild(this._tile2);
            this._tile3 = new objects.GameObject("blank", 427, 242);
            this._playField.addChild(this._tile3);
            this._bars = new objects.GameObject("bars", 339, 180);
            this._playField.addChild(this._bars); // reel separators
            this.addChild(this._playField);
            stage.addChild(this); // add playfield container to scene
            // add event listeners
            this._bet5Button.on("click", this._clickBet5Button, this);
            this._bet25Button.on("click", this._clickBet25Button, this);
            this._bet125Button.on("click", this._clickBet125Button, this);
            this._spinButton.on("click", this._clickSpinButton, this);
            this._powerButton.on("click", this._clickPowerButton, this);
            this._resetButton.on("click", this._clickResetButton, this);
        };
        Game.prototype.update = function () {
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        Game.prototype._updateBet = function () {
            this._currentBetText.text = String(this._bet);
        };
        Game.prototype._updateWallet = function () {
            this._walletText.text = String(this._cash);
        };
        Game.prototype._updateJackpot = function () {
            this._jackpotText.text = String(this._jackpot);
        };
        // Callback function / Event Handlers for Bet Button Clicks
        // Bet 5 Function
        Game.prototype._clickBet5Button = function (event) {
            var betAmount = 5;
            if (this._cash >= betAmount) {
                this._bet += betAmount;
                this._cash -= betAmount;
                this._updateBet();
                this._updateWallet();
                createjs.Sound.play("coin2");
            }
            else {
            }
        };
        // Bet 25 Function
        Game.prototype._clickBet25Button = function (event) {
            var betAmount = 25;
            if (this._cash >= betAmount) {
                this._bet += betAmount;
                this._cash -= betAmount;
                this._updateBet();
                this._updateWallet();
                createjs.Sound.play("coin2");
            }
            else {
            }
        };
        // Bet 125 Function
        Game.prototype._clickBet125Button = function (event) {
            var betAmount = 125;
            if (this._cash >= betAmount) {
                this._bet += betAmount;
                this._cash -= betAmount;
                this._updateBet();
                this._updateWallet();
                createjs.Sound.play("coin1");
            }
            else {
            }
        };
        // Power Button event handler --> Ends Game
        Game.prototype._clickPowerButton = function (event) {
            changeState(config.OVER_STATE);
        };
        // Reset Button event handler --> Resets game
        Game.prototype._clickResetButton = function (event) {
            changeState(config.PLAY_STATE);
        };
        /* Utility function to check if a value falls within a range of bounds */
        Game.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* Function determines the betLine results.
        e.g. imp - skull - blank */
        Game.prototype._reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var reel = 0; reel < 3; reel++) {
                outCome[reel] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[reel]) {
                    case this._checkRange(outCome[reel], 1, 25):
                        betLine[reel] = "blank";
                        this._symbolTally.blanks++;
                        break;
                    case this._checkRange(outCome[reel], 26, 39):
                        betLine[reel] = "skull";
                        this._symbolTally.skulls++;
                        break;
                    case this._checkRange(outCome[reel], 40, 49):
                        betLine[reel] = "imp";
                        this._symbolTally.imps++;
                        break;
                    case this._checkRange(outCome[reel], 50, 56):
                        betLine[reel] = "cthulhu";
                        this._symbolTally.cthulhi++;
                        break;
                    case this._checkRange(outCome[reel], 57, 62):
                        betLine[reel] = "succubus";
                        this._symbolTally.succubus++;
                        break;
                    case this._checkRange(outCome[reel], 63, 65):
                        betLine[reel] = "devil";
                        this._symbolTally.devils++;
                        break;
                }
            }
            return betLine;
        };
        // Check to see if the player won the jackpot
        Game.prototype._checkJackpot = function () {
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                this._jackpotField.gotoAndStop(3);
                this._cash += this._jackpot;
                this._jackpot = 0;
                this._updateJackpot();
                this._updateWallet();
                createjs.Sound.play("success2");
            }
        };
        // adds payouts to players total winnings
        Game.prototype._deliverPayout = function (payoutAmount) {
            this._cash += payoutAmount;
            this._updateWallet();
            if (this._cash <= 0) {
                changeState(config.OVER_STATE); // ends the game if player has 0 cash left after payout
            }
            this._bet = 0; // resets bet amount for next round of play
            this._updateBet();
            this._checkJackpot();
        };
        // Function to check if spin wins or loses, and by how much
        Game.prototype._determineResults = function () {
            // check tiles for winning combinations
            if (this._symbolTally.blanks == 0) {
                /*debug
                console.log("ZERO BLANKS, we should win: " + this._bet + " times any multipliers");
                console.log(this._spinResult[0] + " - " + this._spinResult[1] + " - " + this._spinResult[2]);
                for (var tile in this._symbolTally) {
                    console.log(tile + " - > " + this._symbolTally[tile]);
                } */
                createjs.Sound.play("success1");
                if (this._symbolTally.skulls == 3) {
                    this._deliverPayout(this._bet * 10);
                }
                else if (this._symbolTally.imps == 3) {
                    this._deliverPayout(this._bet * 20);
                }
                else if (this._symbolTally.cthulhi == 3) {
                    this._deliverPayout(this._bet * 30);
                }
                else if (this._symbolTally.succubus == 3) {
                    this._deliverPayout(this._bet * 50);
                }
                else if (this._symbolTally.devils == 3) {
                    this._deliverPayout(this._bet * 100);
                }
                else if (this._symbolTally.skulls == 2) {
                    this._deliverPayout(this._bet * 2);
                }
                else if (this._symbolTally.imps == 2) {
                    this._deliverPayout(this._bet * 3);
                }
                else if (this._symbolTally.cthulhi == 2) {
                    this._deliverPayout(this._bet * 5);
                }
                else if (this._symbolTally.succubus == 2) {
                    this._deliverPayout(this._bet * 10);
                }
                else if (this._symbolTally.devils == 2) {
                    this._deliverPayout(this._bet * 20);
                }
                else if (this._symbolTally.devils == 1) {
                    this._deliverPayout(this._bet * 5);
                }
                else {
                    this._deliverPayout(this._bet * 1);
                }
            }
            else {
                this._jackpot += this._bet;
                this._updateJackpot();
                this._deliverPayout(0);
            }
        };
        // sets all properties of symbolTally to 0
        Game.prototype._resetSymbolTally = function () {
            for (var tile in this._symbolTally) {
                this._symbolTally[tile] = 0;
            }
        };
        //WORKHORSE OF THE GAME
        Game.prototype._clickSpinButton = function (event) {
            if (this._bet > 0) {
                createjs.Sound.play("itemGet2");
                this._resetSymbolTally();
                this._spinResult = this._reels();
                // assigns proper pictures to the reels tiles
                this._tile1.gotoAndStop(this._spinResult[0]);
                this._tile2.gotoAndStop(this._spinResult[1]);
                this._tile3.gotoAndStop(this._spinResult[2]);
                this._determineResults();
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map