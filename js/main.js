import { drawNthCard } from "./canvas.js";

// HTML ELEMENTS
const CHIP_COUNT = document.getElementById('chip-count');
const CHIP_MENU = document.getElementById('chip-menu');
const DEAL_BUTTON = document.getElementById('deal-button');

// CLASS NAMES
const CHIP_MENU_ELEMENT_CLASS = 'chip-menu-element';
const SELECTED_MENU_ELEMENT_COLOR = 'lightblue';
const DEFAULT_MENU_ELEMENT_COLOR = '#888';

const CHIP_VALUES = [1000, 500, 250, 100, 50, 25, 10];

let chipFields = [
    {
        index: 0,
        MAIN_FIELD: document.getElementById('chip-field1').getElementsByClassName('main-field')[0],
        CLEAR_BUTTON: document.getElementById('chip-field1').getElementsByClassName('clear-button')[0],
        totalChipValue: 0,
    },
    {
        index: 1,
        MAIN_FIELD: document.getElementById('chip-field2').getElementsByClassName('main-field')[0],
        CLEAR_BUTTON: document.getElementById('chip-field2').getElementsByClassName('clear-button')[0],
        totalChipValue: 0,
    },
    {
        index: 2,
        MAIN_FIELD: document.getElementById('chip-field3').getElementsByClassName('main-field')[0],
        CLEAR_BUTTON: document.getElementById('chip-field3').getElementsByClassName('clear-button')[0],
        totalChipValue: 0,
    }
]

let chipCount = 1000;
let chosenChipValue = 0;
let chosenMenuElement = null;

// a function that starts the game fr
function dealCards() {
    // disable all the chip fields from adding chips, chip menu from selecting, clear buttons from clearing
    DEAL_BUTTON.style.display = 'none';
    CHIP_MENU.style.pointerEvents = 'none';

    chipFields.forEach(chipField => {
        chipField.MAIN_FIELD.style.pointerEvents = 'none';
        chipField.CLEAR_BUTTON.disabled = true;
    })

    chosenMenuElement.style.backgroundColor = DEFAULT_MENU_ELEMENT_COLOR;
    chosenMenuElement = null;
    chosenChipValue = 0;

    // deal first card
    chipFields.forEach(chipField => {
        if (chipField.totalChipValue > 0) {
            drawNthCard(1, chipField.index);
        }
    })

    // deal second card
    chipFields.forEach(chipField => {
        if (chipField.totalChipValue > 0) {
            drawNthCard(2, chipField.index);
        }
    })
}

function addChipsToField(chipField) {
    if (chosenChipValue != 0) {
        if (chipCount - chosenChipValue >= 0) {
            chipField.totalChipValue += chosenChipValue;
            chipCount -= chosenChipValue;
            chipField.MAIN_FIELD.textContent = chipField.totalChipValue;
        }
        else {
            alert('Not enough chips');
        }
    }

    updateChipCount();
    updateDealButton();
}

function clearChipField(chipField) {
    chipCount += chipField.totalChipValue;
    chipField.totalChipValue = 0;
    chipField.MAIN_FIELD.textContent = '';

    updateChipCount();
    updateDealButton();
}

function updateChipCount() {
    CHIP_COUNT.textContent = chipCount;
}

function updateDealButton() {
    // if all fields are empty, deal button shall not be displayed
    let areChipFieldsEmpty = true;

    chipFields.forEach(chipField => {
        if (chipField.totalChipValue > 0)
            areChipFieldsEmpty = false;
    })

    switch (areChipFieldsEmpty) {
        case true: DEAL_BUTTON.style.display = 'none'; break;
        case false: DEAL_BUTTON.style.display = 'block'; break;
    }
}


function chooseChipValue(value) {
    chosenChipValue = value;

    // get the chosen chip menu element by searching through dataset property
    let chosenOne = document.querySelectorAll(`[data-chip-value='${ chosenChipValue }']`)[0];

    // change style of the previous one
    if (chosenMenuElement) chosenMenuElement.style.backgroundColor = DEFAULT_MENU_ELEMENT_COLOR;

    // change style of current element
    chosenOne.style.backgroundColor = SELECTED_MENU_ELEMENT_COLOR;
    chosenMenuElement = chosenOne;
}

function createChipMenu() {
    // create chip menu field for every chip value there is
    CHIP_VALUES.forEach(chipValue => {
        let menuElement = document.createElement('div');

        menuElement.classList.add(CHIP_MENU_ELEMENT_CLASS);
        menuElement.addEventListener('click', () => chooseChipValue(chipValue));
        menuElement.textContent = chipValue;

        // add an id
        menuElement.dataset.chipValue = chipValue;

        CHIP_MENU.appendChild(menuElement);
    })
}

function start() {
    // add events to chip fields
    chipFields.forEach(item => {
        item.MAIN_FIELD.addEventListener('click', () => addChipsToField(item))

        item.CLEAR_BUTTON.addEventListener('click', () => clearChipField(item));
    })

    DEAL_BUTTON.addEventListener('click', () => dealCards());

    createChipMenu();
    updateChipCount();
}

window.onload = start;