// HTML ELEMENTS
const CHIP_COUNT = document.getElementById('chip-count');
const CHIP_MENU = document.getElementById('chip-menu');

// CLASS NAMES
const CHIP_MENU_ELEMENT_CLASS = 'chip-menu-element';
const CHIP_VALUES = [1000, 500, 200, 100, 50, 20, 10];

let chipFields = [
    {
        id: 0,
        mainField: document.getElementById('chip-field1').getElementsByClassName('main-field')[0],
        clearButton: document.getElementById('chip-field1').getElementsByClassName('clear-button')[0],
        totalChipValue: 0,
    },
    {
        id: 1,
        mainField: document.getElementById('chip-field2').getElementsByClassName('main-field')[0],
        clearButton: document.getElementById('chip-field2').getElementsByClassName('clear-button')[0],
        totalChipValue: 0,
    },
    {
        id: 2,
        mainField: document.getElementById('chip-field3').getElementsByClassName('main-field')[0],
        clearButton: document.getElementById('chip-field3').getElementsByClassName('clear-button')[0],
        totalChipValue: 0,
    }
]

let chipCount = 1000;
let chosenChipValue = 0;
let chosenMenuElement = null;

function addChipsToField(chipField) {
    if (chosenChipValue != 0) {
        if (chipCount - chosenChipValue >= 0) {
            chipField.totalChipValue += chosenChipValue;
            chipCount -= chosenChipValue;
            chipField.mainField.textContent = chipField.totalChipValue.toString();
        }
        else {
            alert('Not enough chips');
        }
    }

    updateChipCount();
}

function clearChipField(chipField) {
    chipCount += chipField.totalChipValue;
    chipField.totalChipValue = 0;
    chipField.mainField.textContent = '';

    updateChipCount();
}

function updateChipCount() {
    CHIP_COUNT.textContent = chipCount;
}

function chooseChipValue(value) {
    chosenChipValue = value;

    // get the chosen chip menu element by searching through dataset property
    let chosenOne = document.querySelectorAll(`[data-chip-value='${ chosenChipValue }']`)[0];

    console.log(chosenOne);

    // change style of the previous one
    if (chosenMenuElement) chosenMenuElement.style.backgroundColor = '#888';

    // change style of current element
    chosenOne.style.backgroundColor = 'lightblue';
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
        item.mainField.addEventListener('click', () => addChipsToField(item))

        item.clearButton.addEventListener('click', () => clearChipField(item));
    })

    createChipMenu();
    updateChipCount();
}