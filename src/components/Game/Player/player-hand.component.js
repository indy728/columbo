import React from 'react';
import {Card, peekPhaseCard, swapPhaseCard} from '../Cards';
import styled from 'styled-components';
import cardImg from 'assets/cardImg';
import {cardDimensionByRowCount, cardMarginsByRowCount} from 'util';
import {
  CARD_ACTION_TAPPED,
  CARD_ACTION_SLAP,
  CARD_ACTION_SWAP,
  CARD_ACTION_PEEKING,
  CARD_ACTION_PEEK_SELECT,
  CARD_PIXEL_HEIGHT,
  CARD_PIXEL_WIDTH,
  CARD_SIZE_HAND_MULTIPLIER,
  SINGLE_CARD_SHADOW_OPACITY,
} from 'constants';

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
`;

const PlayerCardWrapper = styled.View`
  width: ${({rows}) =>
    cardDimensionByRowCount(
      rows,
      CARD_PIXEL_WIDTH * CARD_SIZE_HAND_MULTIPLIER,
    )};
  height: ${({rows}) =>
    cardDimensionByRowCount(
      rows,
      CARD_PIXEL_HEIGHT * CARD_SIZE_HAND_MULTIPLIER,
    )};
  margin-top: ${({rows, index}) => cardMarginsByRowCount(rows, index, 35)};
  background-color: ${({theme}) => theme.palette.grayscale[4]};
  shadow-opacity: ${({children}) =>
    children ? SINGLE_CARD_SHADOW_OPACITY : 0};
`;

const HandColumnWrapper = styled.View`
  margin-left: ${({rows, index}) => cardMarginsByRowCount(rows, index, 20)};
`;

const playerHand = (props) => {
  const {hand, pressed, cardAction, selected} = props;
  console.log('[PlayerHand] hand: ', hand);

  const columns = hand.map((column, i) => {
    return (
      <HandColumnWrapper key={'column' + i} index={i} rows={hand.length}>
        {column.map((card, j) => {
          let key = 'column' + column + 'card' + card;
          let cardDisplay = null;

          if (card) {
            const {value, suit} = card;

            key = value + suit;
            const source = cardImg[suit][value];
            // const source = cardImg.back;
            switch (cardAction) {
              // source = cardImg[suit][value]
              case CARD_ACTION_SWAP:
              case CARD_ACTION_SLAP:
                cardDisplay = swapPhaseCard(() => pressed([i, j]));
                break;
              case CARD_ACTION_PEEK_SELECT:
                cardDisplay = peekPhaseCard(() => pressed([i, j]), selected, [
                  i,
                  j,
                ]);
                break;
              case CARD_ACTION_PEEKING:
                cardDisplay = peekPhaseCard(null, selected, [i, j], source);
                break;
              case CARD_ACTION_TAPPED:
                cardDisplay = <Card source={source} />;
                break;
              default:
                cardDisplay = <Card source={cardImg.back} />;
                break;
            }
          }
          return (
            <PlayerCardWrapper key={key} index={j} rows={hand.length}>
              {cardDisplay}
            </PlayerCardWrapper>
          );
        })}
      </HandColumnWrapper>
    );
  });

  return <Wrapper>{columns}</Wrapper>;
};

export default playerHand;
