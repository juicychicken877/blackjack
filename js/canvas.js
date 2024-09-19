const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 500;

// coordinates of cards to draw
const X_COOR_MULTIPLIER = 30;
const Y_COOR_MULTIPLIER = 30;
const CHIP_FIELD_X_COOR = [285, 672, 1055];
const CHIP_FIELD_Y_COOR = 350;

// card settings
const CARD_WIDTH = 100;
const CARD_HEIGHT = 125;

const CARD_COLOR = 'green';

export function drawNthCard(n, chipFieldIndex) {
    let yCoor = 350;
    let xCoor = CHIP_FIELD_X_COOR[chipFieldIndex];

    if (n == 1) { 
        yCoor = CHIP_FIELD_Y_COOR; 
        xCoor = CHIP_FIELD_X_COOR[chipFieldIndex];
    }
    else { 
        yCoor = CHIP_FIELD_Y_COOR - (Y_COOR_MULTIPLIER * (n-1)); 
        xCoor = CHIP_FIELD_X_COOR[chipFieldIndex] + (X_COOR_MULTIPLIER * (n-1));
    }

    ctx.fillStyle = CARD_COLOR;
    ctx.fillRect(xCoor, yCoor, CARD_WIDTH, CARD_HEIGHT);
}