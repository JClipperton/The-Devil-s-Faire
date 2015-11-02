/********************************************************************************************\
 * The Devil's Faire - COMP397 Assignment 2                                                 *
 * Author: Jay Clipperton                                                                   *
 * Last modified by: JHRC, Date last modified: Devil's Night 2015                           *
 * Program Description: Devilish Slot Machine made with CreateJS framework                  *
 * Feel an itch in your pocket and a whole lot of luck, try your turn at the Devil's Faire! *
 * Revision History available at: https://github.com/JClipperton/The-Devil-s-Faire          *
\********************************************************************************************/

module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        // UI OBJECTS ++++++++++++++++++++++++++++++++++++++
        private _playField: createjs.Container;
        private _background: createjs.Bitmap;

        private _slotmachine: objects.GameObject;
        private _currentBetField: objects.GameObject;
        private _walletField: objects.GameObject;
        private _jackpotField: objects.GameObject;
        private _jackpotField_winner: objects.GameObject = new objects.GameObject("jackpotField_winner", 218, 80);

        private _bet5Button: objects.SpriteButton;
        private _bet25Button: objects.SpriteButton;
        private _bet125Button: objects.SpriteButton;
        private _spinButton: objects.SpriteButton;
        private _powerButton: objects.SpriteButton;
        private _resetButton: objects.SpriteButton;

        private _tile1: objects.GameObject;
        private _tile2: objects.GameObject;
        private _tile3: objects.GameObject;

        private _currentBetText: objects.Label;
        private _walletText: objects.Label;
        private _jackpotText: objects.Label;

        private _bars: objects.GameObject;

        // GAME VARIABLES
        private _cash: number;
        private _bet: number;
        private _jackpot: number;
        private _spinResult: string[];
        private _symbolTally: { // keeps track of amounts of each symbol
            blanks: number,
            skulls: number,
            imps: number,
            cthulhi: number, // the plural of chtulhu?
            succubus: number,
            devils: number
        } = {
            blanks: 0,
            skulls: 0,
            imps: 0,
            cthulhi: 0,
            succubus: 0,
            devils: 0
        };

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
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
        }


        public update(): void {
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        private _updateBet(): void { // refresh current bet GUI
            this._currentBetText.text = String(this._bet);
        }
        private _updateWallet(): void { // refresh wallet GUI
            this._walletText.text = String(this._cash);
        }
        private _updateJackpot(): void { // refresh jackpot GUI
            this._jackpotText.text = String(this._jackpot);
        }
        
        // Callback function / Event Handlers for Bet Button Clicks
        // Bet 5 Function
        private _clickBet5Button(event: createjs.MouseEvent): void {
            var betAmount = 5;
            if (this._cash >= betAmount) {
                this._bet += betAmount;
                this._cash -= betAmount;
                this._updateBet()
                this._updateWallet();
                createjs.Sound.play("coin2");
            }
            else {
                // do nothing
            }
        }
        // Bet 25 Function
        private _clickBet25Button(event: createjs.MouseEvent): void {
            var betAmount = 25;
            if (this._cash >= betAmount) {
                this._bet += betAmount;
                this._cash -= betAmount;
                this._updateBet()
                this._updateWallet();
                createjs.Sound.play("coin2");
            }
            else {
                // do nothing
            }
        }
        // Bet 125 Function
        private _clickBet125Button(event: createjs.MouseEvent): void {
            var betAmount = 125;
            if (this._cash >= betAmount) {
                this._bet += betAmount;
                this._cash -= betAmount;
                this._updateBet()
                this._updateWallet();
                createjs.Sound.play("coin1");
            }
            else {
                // do nothing
            }
        }

        // Power Button event handler --> Ends Game
        private _clickPowerButton(event: createjs.MouseEvent): void {
            changeState(config.OVER_STATE);
        }
        // Reset Button event handler --> Resets game
        private _clickResetButton(event: createjs.MouseEvent): void {
            changeState(config.PLAY_STATE);
        }

        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value: number, lowerBounds: number, upperBounds: number): number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }

        /* Function determines the betLine results.
        e.g. imp - skull - blank */
        private _reels(): string[] {
            var betLine: string[] = [" ", " ", " "];
            var outCome: number[] = [0, 0, 0];

            for (var reel = 0; reel < 3; reel++) {
                outCome[reel] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[reel]) {
                    case this._checkRange(outCome[reel], 1, 25):  // 36.9% probability
                        betLine[reel] = "blank";
                        this._symbolTally.blanks++;
                        break;
                    case this._checkRange(outCome[reel], 26, 39): // 20.0% probability
                        betLine[reel] = "skull";
                        this._symbolTally.skulls++;
                        break;
                    case this._checkRange(outCome[reel], 40, 49): // 15.4% probability
                        betLine[reel] = "imp";
                        this._symbolTally.imps++;
                        break;
                    case this._checkRange(outCome[reel], 50, 56): // 10.7% probability
                        betLine[reel] = "cthulhu";
                        this._symbolTally.cthulhi++;
                        break;
                    case this._checkRange(outCome[reel], 57, 62): //  9.2% probability
                        betLine[reel] = "succubus";
                        this._symbolTally.succubus++;
                        break;
                    case this._checkRange(outCome[reel], 63, 65): //  4.6% probability
                        betLine[reel] = "devil";
                        this._symbolTally.devils++;
                        break;
                }
            }
            return betLine;
        }

        // Check to see if the player won the jackpot
        private _checkJackpot(): void {
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) { // compare two random values
                this._jackpotField.gotoAndStop(3);
                this._cash += this._jackpot;
                this._jackpot = 0;
                this._updateJackpot();
                this._updateWallet();
                createjs.Sound.play("success2");
            }
        }

        // adds payouts to players total winnings
        private _deliverPayout(payoutAmount: number): void {

            this._cash += payoutAmount;
            this._updateWallet();
            if (this._cash <= 0) {
                changeState(config.OVER_STATE); // ends the game if player has 0 cash left after payout
            }
            this._bet = 0; // resets bet amount for next round of play
            this._updateBet();
            this._checkJackpot();
        }

        // Function to check if spin wins or loses, and by how much
        private _determineResults(): void {
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
            } else {
                this._jackpot += this._bet;
                this._updateJackpot();
                this._deliverPayout(0);
                /*debug
                console.log("BLANKS AHOY!, we shouldn't get anything back!");
                console.log(this._spinResult[0] + " - " + this._spinResult[1] + " - " + this._spinResult[2]);
                for (var tile in this._symbolTally) {
                    console.log(tile + " - > " + this._symbolTally[tile]);
                }  */
            }
        }

        // sets all properties of symbolTally to 0
        private _resetSymbolTally(): void {
            for (var tile in this._symbolTally) {
                this._symbolTally[tile] = 0;
            }
        }

        //WORKHORSE OF THE GAME
        private _clickSpinButton(event: createjs.MouseEvent): void {
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
        }
    }
} 