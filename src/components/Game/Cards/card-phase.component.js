import React from 'react';
import {matchArrayInArray} from 'util';
import Card from './card.component';
import cardImg from 'assets/cardImg';

export const swapPhaseCard = (pressed) => {
  return <Card source={cardImg.back} pressed={pressed} />;
};

export const peekPhaseCard = (
  pressed,
  selected,
  cardCoordinates,
  imgSource,
) => {
  let isSelected = matchArrayInArray(selected, cardCoordinates) !== -1;
  let source = cardImg.back;

  if (!pressed) {
    if (isSelected) {
      source = imgSource;
    }
    isSelected = false;
  }

  return <Card selected={isSelected} source={source} pressed={pressed} />;
};
