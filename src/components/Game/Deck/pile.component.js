import React from 'react';
import styled from 'styled-components';
import {Card} from '../Cards';
import cardImg from 'assets/cardImg';
import {CARD_PIXEL_HEIGHT, CARD_PIXEL_WIDTH} from 'constants';

const Wrapper = styled.View`
  width: ${() => 1.5 * CARD_PIXEL_WIDTH + 'px'};
  height: ${() => 1.5 * CARD_PIXEL_HEIGHT + 'px'};
  background-color: ${({theme}) => theme.palette.emptyCardSlot};
  shadow-opacity: ${({length}) => 0.8 * (length / 36)};
  position: relative;
  transform: rotate(270deg);
`;

const Pile = ({face, pile, pressed}) => {
  const renderPile = [];
  let cardSource = cardImg.back;

  pile.forEach((card) => {
    const {value, suit} = card;
    if (face) {
      cardSource = cardImg[suit][value];
    }

    renderPile.unshift(
      <Card
        key={`${value}-of-${suit}`}
        pressed={pressed}
        source={cardSource}
      />,
    );
  });

  return <Wrapper length={pile.length}>{renderPile}</Wrapper>;
};

export default Pile;
