/********************************************************************************************\
 * The Devil's Faire - COMP397 Assignment 2                                                 *
 * Author: Jay Clipperton                                                                   *
 * Last modified by: JHRC, Date last modified: Devil's Night 2015                           *
 * Program Description: Devilish Slot Machine made with CreateJS framework                  *
 * Feel an itch in your pocket and a whole lot of luck, try you turn at the Devil's Faire!  *
 * Revision History available at: https://github.com/JClipperton/The-Devil-s-Faire          *
\********************************************************************************************/
module objects {
    export class Button extends createjs.Bitmap {
        //PRIVATE INSTANCE VARIABLES
        width: number;
        height: number;
        //CONSTRUCTOR
        constructor(pathString:string, x:number, y: number) {
            super(assets.getResult(pathString));
            this.x = x;
            this.y = y; 

            this.width = 150;
            this.height = 50;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }

        // PRIVATE METHODS
        // Event Handler for mouse over
        overButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 0.7;
        }

        // Event Handler for mouse out
        outButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1.0;
        }


    }
} 