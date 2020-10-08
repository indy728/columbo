import * as storeVariables from 'constants';

const suits = [
  'spades',
  'hearts',
  'diamonds',
  'clubs',
];

const cardValues = [
  'ace', '2', '3', '4', '5', '6', '7', '8', '9',
  '10', 'jack', 'queen', 'king',
];

const initCards = (s) => {
  const makeCardObj = (value, points, suit, action, actionSP = null) => ({
    value, points, suit, action, actionSP,
  });

  const cards = [];
  cardValues.forEach((cardValue, i) => {
    let thisCard = {};

    switch (cardValue) {
      case '3':
      case '4':
        thisCard = makeCardObj(cardValue, +i + 1, s, null, storeVariables.PEEK_HAND);
        break;
      case '5':
      case '6':
        thisCard = makeCardObj(cardValue, +i + 1, s, null, storeVariables.PEEK_POINTS);
        break;
      case '7':
      case '8':
        thisCard = makeCardObj(cardValue, +i + 1, s, 'look at somone\'s');
        break;
      case '9':
      case '10':
        thisCard = makeCardObj(cardValue, +i + 1, s, 'look at your own');
        break;
      case 'jack':
        thisCard = makeCardObj(cardValue, 11, s, 'blind swap');
        break;
      case 'queen':
        thisCard = makeCardObj(cardValue, 12, s, 'look and swap');
        break;
      case 'king':
        thisCard = makeCardObj(cardValue, s === 'hearts' ? -1 : 13, s, null);
        break;
      default:
        thisCard = makeCardObj(cardValue, +i + 1, s, null);
        break;
    }
    cards.push(thisCard);
  });
  return cards;
};

export const shuffleCards = (deck) => {
  const dup = [...deck];

  for (let i = dup.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const temp = dup[i];
    dup[i] = dup[j];
    dup[j] = temp;
  }

  return dup;
};

export const initDeck = () => {
  let drawPile = [];

  suits.forEach((suit) => {
    drawPile = drawPile.concat(initCards(suit));
  });
  return shuffleCards(drawPile);
};
