const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 500;

let halfWidth = Math.round(canvas.width / 2);

// coordinates of cards to draw
const X_COOR_MULTIPLIER = 30;
const Y_COOR_MULTIPLIER = 30;
const CARD_FIELD_X_COOR = [285, 672, 1055];
const CARD_FIELD_Y_COOR = 375;

// dealer coors
const DEALER_X_COOR = halfWidth - 100;
const DEALER_X_COOR_MULTIPLIER = 100;
const DEALER_Y_COOR = 20;

// card settings
const CARD_WIDTH = 90;
const CARD_HEIGHT = 125;

const CARD_COLOR = 'green';

export function drawNthCard(n, cardFieldIndex, imageSrc) {
    let xCoor = 0;
    let yCoor = 0;
    // cardfieldindex 0 is dealer's card field
    if (cardFieldIndex != 0) {
        yCoor = 350;
        xCoor = CARD_FIELD_X_COOR[cardFieldIndex-1];

        // card fields
        if (n == 1) { 
            yCoor = CARD_FIELD_Y_COOR; 
            xCoor = CARD_FIELD_X_COOR[cardFieldIndex-1];
        }
        else { 
            yCoor = CARD_FIELD_Y_COOR - (Y_COOR_MULTIPLIER * (n-1)); 
            xCoor = CARD_FIELD_X_COOR[cardFieldIndex-1] + (X_COOR_MULTIPLIER * (n-1));
        }
    } else {
        // dealer
        yCoor = DEALER_Y_COOR;
        xCoor = DEALER_X_COOR + (DEALER_X_COOR_MULTIPLIER * (n-1));
    }

    let imageHTMLObject = new Image();

    imageHTMLObject.onload = function() {
        ctx.drawImage(this, xCoor, yCoor, CARD_WIDTH, CARD_HEIGHT);
    }

    imageHTMLObject.src = imageSrc;
}