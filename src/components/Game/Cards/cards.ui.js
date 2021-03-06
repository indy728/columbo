import styled from 'styled-components';
import {cardDimensionByRowCount, cardMarginsByRowCount} from 'util';
import {
  CARD_PIXEL_HEIGHT,
  CARD_PIXEL_WIDTH,
  CARD_SIZE_HAND_MULTIPLIER,
  DEVICE_MAX_WIDTH,
  SINGLE_CARD_SHADOW_OPACITY,
} from 'constants';

export const PlayerCardWrapper = styled.View`
  width: ${({rows, deviceWidth}) => {
    const sizeMultiplier = +deviceWidth / DEVICE_MAX_WIDTH;

    return cardDimensionByRowCount(
      rows,
      sizeMultiplier * CARD_PIXEL_WIDTH * CARD_SIZE_HAND_MULTIPLIER,
    );
  }};
  height: ${({rows, deviceWidth}) => {
    const sizeMultiplier = +deviceWidth / DEVICE_MAX_WIDTH;

    return cardDimensionByRowCount(
      rows,
      sizeMultiplier * CARD_PIXEL_HEIGHT * CARD_SIZE_HAND_MULTIPLIER,
    );
  }};
  margin-top: ${({rows, index}) => cardMarginsByRowCount(rows, index, 20)};
  background-color: ${({theme}) => theme.palette.grayscale[4]};
  shadow-opacity: ${({children}) =>
    children ? SINGLE_CARD_SHADOW_OPACITY : 0};
`;

export const HandColumnWrapper = styled.View`
  margin-left: ${({rows, index}) => cardMarginsByRowCount(rows, index, 20)};
`;

export const CurrentCardWrapper = styled.View`
  width: ${({deviceWidth}) => {
    const sizeMultiplier = (2 * +deviceWidth) / DEVICE_MAX_WIDTH;
    return sizeMultiplier * CARD_PIXEL_WIDTH + 'px';
  }};
  height: ${({deviceWidth}) => {
    const sizeMultiplier = (2 * +deviceWidth) / DEVICE_MAX_WIDTH;
    return sizeMultiplier * CARD_PIXEL_HEIGHT + 'px';
  }};
  background-color: ${({theme}) => theme.palette.grayscale[4]};
  shadow-opacity: ${({children}) =>
    children ? SINGLE_CARD_SHADOW_OPACITY : 0};
  align-items: center;
  justify-content: center;
`;

export const SelectedCardOverlay = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 2px;
  left: 1px;
  background-color: rgba(216, 7, 88, 0.3);
  display: ${({selected}) => (selected ? 'flex' : 'none')};
  z-index: 499;
`;

export const CardImage = styled.Image`
  flex: 1;
  height: undefined;
  width: undefined;
`;
