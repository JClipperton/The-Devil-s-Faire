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

        private _bet5Button: objects.SpriteButton;
        private _bet25Button: objects.SpriteButton;
        private _bet125Button: objects.SpriteButton;
        private _spinButton: objects.SpriteButton;
        private _powerButton: objects.SpriteButton;
        private _resetButton: objects.SpriteButton; // forgot to upload this one, get it after next commit

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

            this._powerButton = new objects.SpriteButton("powerButton", 743, 532);
            this._playField.addChild(this._powerButton);

            this._currentBetField = new objects.GameObject("currentBetField", 6, 17);
            this._playField.addChild(this._currentBetField);

            this._walletField = new objects.GameObject("walletField", 651, 17);
            this._playField.addChild(this._walletField);

            this._jackpotField = new objects.GameObject("jackpotField", 218, 80);
            this._playField.addChild(this._jackpotField);

            // GUI
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

            this._jackpotText = new objects.Label(String(this._jackpot), "20px Arial", "#D49414", 345, 90, false);
            this._playField.addChild(this._jackpotText);

            // Reels
            this._tile1 = new objects.GameObject("blank", 259, 242);
            this._playField.addChild(this._tile1);

            this._tile2 = new objects.GameObject("blank", 343, 242);
            this._playField.addChild(this._tile2);

            this._tile3 = new objects.GameObject("blank", 427, 242);
            this._playField.addChild(this._tile3);

            this._bars = new objects.GameObject("bars", 339, 180);
            this._playField.addChild(this._bars); // reel seperator

            this.addChild(this._playField);
            stage.addChild(this); // add playfield container to scene

            // add event listeners
            this._bet5Button.on("click", this._clickBet5Button, this);
            this._bet25Button.on("click", this._clickBet25Button, this);
            this._bet125Button.on("click", this._clickBet125Button, this);
            
            this._spinButton.on("click", this._clickSpinButton, this);

            this._powerButton.on("click", this._clickPowerButton, this);            
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
        
        // Callback function / Event Handlers for Bet Button Clicks
        private _clickBet5Button(event: createjs.MouseEvent): void {
            var betAmount = 5;
            if (this._cash >= betAmount) {
                this._bet += betAmount;
                this._cash -= betAmount;
                this._updateBet()
                this._updateWallet();
            }
            else {
                // do nothing
            }
        }
        private _clickBet25Button(event: createjs.MouseEvent): void {
            var betAmount = 25;
            if (this._cash >= betAmount) {
                this._bet += betAmount;
                this._cash -= betAmount;
                this._updateBet()
                this._updateWallet();
            }
            else {
                // do nothing
            }
        }
        private _clickBet125Button(event: createjs.MouseEvent): void {
            var betAmount = 125;
            if (this._cash >= betAmount) {
                this._bet += betAmount;
                this._cash -= betAmount;
                this._updateBet()
                this._updateWallet();
            }
            else {
                // do nothing
            }
        }

        private _clickPowerButton(event: createjs.MouseEvent): void {
            changeState(config.OVER_STATE);
        }

        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value:number, lowerBounds:number, upperBounds:number):number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }

        /* When this function is called it determines the betLine results.
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

        // adds payouts to players total winnings
        private _deliverPayout(payoutAmount: number): void {
            this._cash += payoutAmount;
            this._updateWallet
            this._bet = 0; // resets bet amount for next round of play
            this._updateBet();
        }

        private _determineResults(): void {
            // check tiles for winning combinations
            for (var tile = 0; tile < 6; tile++) {
                if ((this._symbolTally[tile] == 2) && (this._symbolTally.blanks == 0)) {
                    this._deliverPayout(this._bet);
                    break;
                }
                else {
                    this._deliverPayout(0);
                }
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
            this._resetSymbolTally();
            this._spinResult = this._reels();

            // assigns proper pictures to the reels tiles
            this._tile1.gotoAndStop(this._spinResult[0]);
            this._tile2.gotoAndStop(this._spinResult[1]);
            this._tile3.gotoAndStop(this._spinResult[2]);

            this._determineResults();

            //debug
            console.log(this._spinResult[0] + " - " + this._spinResult[1] + " - " + this._spinResult[2]);
            for (var tile in this._symbolTally) {
                console.log(tile +  " - > " + this._symbolTally[tile]);
            } 
        }
    }
} 