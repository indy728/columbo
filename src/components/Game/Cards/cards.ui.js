import styled from 'styled-components';
import {cardDimensionByRowCount, cardMarginsByRowCount} from 'util';
import {
  CARD_PIXEL_HEIGHT,
  CARD_PIXEL_WIDTH,
  CARD_SIZE_HAND_MULTIPLIER,
  SINGLE_CARD_SHADOW_OPACITY,
} from 'constants';

export const PlayerCardWrapper = styled.View`
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

export const HandColumnWrapper = styled.View`
  margin-left: ${({rows, index}) => cardMarginsByRowCount(rows, index, 20)};
`;

export const CurrentCardWrapper = styled.View`
  width: ${() => 2 * CARD_PIXEL_WIDTH + 'px'};
  height: ${() => 2 * CARD_PIXEL_HEIGHT + 'px'};
  background-color: ${({theme}) => theme.palette.grayscale[4]};
  shadow-opacity: ${({children}) =>
    children ? SINGLE_CARD_SHADOW_OPACITY : 0};
  align-items: center;
  justify-content: center;
`;
