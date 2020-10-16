import React from 'react';
import {Card} from './card.component';
import {peekPhaseCard, swapPhaseCard} from './card-phase.component';
import cardImg from 'assets/cardImg';
import {
  CARD_ACTION_TAPPED,
  CARD_ACTION_SLAP,
  CARD_ACTION_SWAP,
  CARD_ACTION_PEEKING,
  CARD_ACTION_PEEK_SELECT,
} from 'constants';

export const getCardDisplay = (card, cardAction, coords, selected, pressed) => {
  if (!card) {
    return null;
  }

  const [i, j] = coords;
  const {value, suit} = card;
  const source = cardImg[suit][value];

  switch (cardAction) {
    case CARD_ACTION_SWAP:
    case CARD_ACTION_SLAP:
      return swapPhaseCard(() => pressed([i, j]));
    case CARD_ACTION_PEEK_SELECT:
      return peekPhaseCard(() => pressed([i, j]), selected, [i, j]);
    case CARD_ACTION_PEEKING:
      return peekPhaseCard(null, selected, [i, j], source);
    case CARD_ACTION_TAPPED:
      return <Card source={source} />;
    default:
      return <Card source={cardImg.back} />;
  }
};
