module states {
    // OVER CLASS
    export class Over extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _container: createjs.Container;
        private _gameOverScreen: createjs.Bitmap;
        private _backButton: objects.Button;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {

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

        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        private _clickBackButton(event: createjs.MouseEvent): void {
            changeState(config.MENU_STATE); // back to menu screen
        }


    }


}  