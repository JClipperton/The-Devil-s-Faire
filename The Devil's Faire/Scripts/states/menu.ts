﻿module states {
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
        }

    }


}