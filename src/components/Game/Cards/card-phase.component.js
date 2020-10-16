import React from 'react';
import {matchArrayInArray} from 'util';

export const swapPhaseCard = (pressed) => {
  return <Card source={cardImg.back} onPress={pressed} />;
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

  return <Card selected={isSelected} source={source} onPress={pressed} />;
};
