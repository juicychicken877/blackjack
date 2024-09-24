import { CARDS } from "./cardsObject.js";

function shuffleDeck(cards) {
    // coolaj86's code for shuffling an array Stackoverflow

    let deck = cards;

    let currentIndex = deck.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex], deck[currentIndex]];
    }

    // return deck object with functions
    return {
        deck: deck,

        getCard() {
            let random = Math.round(Math.random() * deck.length);

            let itemToReturn = deck[random];

            // remove card from deck
            deck = deck.filter(item => {
                return item !== itemToReturn;
            })

            return itemToReturn;
        }
    }
}

export function getShuffledDeck() {
    return shuffleDeck(CARDS);
}