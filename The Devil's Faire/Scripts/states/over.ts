/********************************************************************************************\
 * The Devil's Faire - COMP397 Assignment 2                                                 *
 * Author: Jay Clipperton                                                                   *
 * Last modified by: JHRC, Date last modified: Devil's Night 2015                           *
 * Program Description: Devilish Slot Machine made with CreateJS framework                  *
 * Feel an itch in your pocket and a whole lot of luck, try you turn at the Devil's Faire!  *
 * Revision History available at: https://github.com/JClipperton/The-Devil-s-Faire          *
\********************************************************************************************/
module states {
    // OVER CLASS
    export class Over extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _container: createjs.Container;
        private _gameOverScreen: createjs.Bitmap;
        private _backButton: objects.GameObject;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
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

        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        private _clickBackButton(event: createjs.MouseEvent): void {
            changeState(config.MENU_STATE); // back to menu screen
        }


    }


}  