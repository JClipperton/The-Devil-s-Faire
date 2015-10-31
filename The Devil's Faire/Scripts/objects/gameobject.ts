/********************************************************************************************\
 * The Devil's Faire - COMP397 Assignment 2                                                 *
 * Author: Jay Clipperton                                                                   *
 * Last modified by: JHRC, Date last modified: Devil's Night 2015                           *
 * Program Description: Devilish Slot Machine made with CreateJS framework                  *
 * Feel an itch in your pocket and a whole lot of luck, try you turn at the Devil's Faire!  *
 * Revision History available at: https://github.com/JClipperton/The-Devil-s-Faire          *
\********************************************************************************************/
module objects {
    // GAMEOBJECT CLASS
    export class GameObject extends createjs.Sprite {
        // CONSTRUCTOR 
        constructor(imageString:string, x: number, y: number) {
            super(atlas, imageString);
            this.x = x;
            this.y = y;

        }
    }
}