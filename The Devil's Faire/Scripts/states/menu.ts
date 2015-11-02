/********************************************************************************************\
 * The Devil's Faire - COMP397 Assignment 2                                                 *
 * Author: Jay Clipperton                                                                   *
 * Last modified by: JHRC, Date last modified: Devil's Night 2015                           *
 * Program Description: Devilish Slot Machine made with CreateJS framework                  *
 * Feel an itch in your pocket and a whole lot of luck, try your turn at the Devil's Faire! *
 * Revision History available at: https://github.com/JClipperton/The-Devil-s-Faire          *
\********************************************************************************************/
module states {
    // MENU CLASS
    export class Menu extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _container: createjs.Container;
        private _gameStartScreen: createjs.Bitmap;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            createjs.Sound.play("introMusic");
            this._container = new createjs.Container(); //wrap scene in container to fix y offset
            this._container.y = 2;

            // start button
            this._gameStartScreen = new createjs.Bitmap(assets.getResult("gameStartScreen")); // add background
            this._gameStartScreen.on("click", this._clickScreen, this); // event listener
            this._container.addChild(this._gameStartScreen); // add to stage

            this.addChild(this._container);
            stage.addChild(this);
        }


        public update(): void {
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Button Click
        private _clickScreen(event: createjs.MouseEvent): void {
            changeState(config.PLAY_STATE);
            createjs.Sound.play("itemGet1");
        }

    }


}