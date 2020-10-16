import React from 'react';
import {updateObject} from 'util';
import Card from 'components/Deck/Card/Card';

const suits = ['spades', 'hearts', 'diamonds', 'clubs'];

const cardValues = [
  'ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
];

const initCards = (suit) => {
  const makeCardObj = (value, points, suit, action) => {
    return {value, points, suit, action};
  };
  const cards = [];

  for (let i in cardValues) {
    let thisCard = {};
    switch (cardValues[i]) {
      case '7':
      case '8':
        thisCard = makeCardObj(cardValues[i], +i + 1, suit, "look at somone's");
        break;
      case '9':
      case '10':
        thisCard = makeCardObj(cardValues[i], +i + 1, suit, 'look at your own');
        break;
      case 'jack':
        thisCard = makeCardObj(cardValues[i], 11, suit, 'blind swap');
        break;
      case 'queen':
        thisCard = makeCardObj(cardValues[i], 12, suit, 'look and swap');
        break;
      case 'king':
        thisCard = makeCardObj(
          cardValues[i],
          suit === 'hearts' ? -1 : 13,
          suit,
          'none',
        );
        break;
      default:
        thisCard = makeCardObj(cardValues[i], +i + 1, suit, 'none');
        break;
    }
    cards.push(thisCard);
  }
  return cards;
};

export const initDeck = (suit) => {
  let drawPile = [];

  suits.forEach((suit) => {
    drawPile = drawPile.concat(initCards(suit));
  });

  return drawPile;
};

export const shuffleCards = (deck) => {
  const dup = [...deck];

  for (let i = dup.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = dup[i];
    dup[i] = dup[j];
    dup[j] = temp;
  }

  return dup;
};
