var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/********************************************************************************************\
 * The Devil's Faire - COMP397 Assignment 2                                                 *
 * Author: Jay Clipperton                                                                   *
 * Last modified by: JHRC, Date last modified: Devil's Night 2015                           *
 * Program Description: Devilish Slot Machine made with CreateJS framework                  *
 * Feel an itch in your pocket and a whole lot of luck, try you turn at the Devil's Faire!  *
 * Revision History available at: https://github.com/JClipperton/The-Devil-s-Faire          *
\********************************************************************************************/
var objects;
(function (objects) {
    // SPRITE BUTTON CLASS
    var SpriteButton = (function (_super) {
        __extends(SpriteButton, _super);
        function SpriteButton(imageString, x, y) {
            _super.call(this, imageString, x, y);
            this.x = x;
            this.y = y;
            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }
        // PRIVATE METHODS
        // Event Handler for mouse over
        SpriteButton.prototype.overButton = function (event) {
            event.currentTarget.alpha = 0.7;
        };
        // Event Handler for mouse out
        SpriteButton.prototype.outButton = function (event) {
            event.currentTarget.alpha = 1.0;
        };
        return SpriteButton;
    })(objects.GameObject);
    objects.SpriteButton = SpriteButton;
})(objects || (objects = {}));
//# sourceMappingURL=spritebutton.js.map