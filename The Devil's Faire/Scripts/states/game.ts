module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES

        // UI OBJECTS ++++++++++++++++++++++++++++++++++++++
        private _playField: createjs.Container;
        private _background: createjs.Bitmap;
        private _slotmachine: objects.GameObject;
        private _bet5Button: objects.SpriteButton;
        private _bet25Button: objects.SpriteButton;
        private _bet125Button: objects.SpriteButton;
        private _spinButton: objects.SpriteButton;

        private _tile1: objects.GameObject;
        private _tile2: objects.GameObject;
        private _tile3: objects.GameObject;

        private _bars: objects.GameObject;

        // GAME VARIABLES

        private _spinResult: string[];

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
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
        }


        public update(): void {
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        private _clickBet1Button(event: createjs.MouseEvent): void {
            console.log("bet 1");
        }

        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value:number, lowerBounds:number, upperBounds:number):number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }

        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        private _reels(): string[] {
        var betLine: string[] = [" ", " ", " "];
        var outCome: number[] = [0, 0, 0];

        for (var reel = 0; reel < 3; reel++) {
            outCome[reel] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[reel]) {
                case this._checkRange(outCome[reel], 1, 27):  // 41.5% probability
                    betLine[reel] = "blank";
                    //blanks++;
                    break;
                case this._checkRange(outCome[reel], 28, 37): // 15.4% probability
                    betLine[reel] = "grapes";
                    //grapes++;
                    break;
                case this._checkRange(outCome[reel], 38, 46): // 13.8% probability
                    betLine[reel] = "banana";
                   // bananas++;
                    break;
                case this._checkRange(outCome[reel], 47, 54): // 12.3% probability
                    betLine[reel] = "orange";
                    //oranges++;
                    break;
                case this._checkRange(outCome[reel], 55, 59): //  7.7% probability
                    betLine[reel] = "cherry";
                    //cherries++;
                    break;
                case this._checkRange(outCome[reel], 60, 62): //  4.6% probability
                    betLine[reel] = "bar";
                    //bars++;
                    break;
                case this._checkRange(outCome[reel], 63, 64): //  3.1% probability
                    betLine[reel] = "bell";
                    //bells++;
                    break;
                case this._checkRange(outCome[reel], 65, 65): //  1.5% probability
                    betLine[reel] = "seven";
                    //sevens++;
                    break;
            }
        }
        return betLine;
    }



        //WORKHORSE OF THE GAME
        private _spinButtonClick(event: createjs.MouseEvent): void {
            this._spinResult = this._reels();

            this._tile1.gotoAndStop(this._spinResult[0]);
            this._tile2.gotoAndStop(this._spinResult[1]);
            this._tile3.gotoAndStop(this._spinResult[2]);


            console.log(this._spinResult[0] + " - " + this._spinResult[1] + " - " + this._spinResult[2]);
        }


    }


} 