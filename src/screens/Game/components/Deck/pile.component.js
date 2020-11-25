import React from 'react';
import {useWindowDimensions} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Card} from 'components/Game/Cards';
import cardImg from 'assets/cardImg';
import {
  CARD_PIXEL_HEIGHT,
  CARD_PIXEL_WIDTH,
  DEVICE_MAX_WIDTH,
  PHASE_DRAW,
  DISCARD_PILE,
} from 'constants';
import {actions} from 'store/slices';

const Wrapper = styled.View`
  width: ${({deviceWidth}) => {
    const sizeMultiplier = (1.5 * +deviceWidth) / DEVICE_MAX_WIDTH;
    return sizeMultiplier * CARD_PIXEL_WIDTH + 'px';
  }};
  height: ${({deviceWidth}) => {
    const sizeMultiplier = (1.5 * +deviceWidth) / DEVICE_MAX_WIDTH;
    return sizeMultiplier * CARD_PIXEL_HEIGHT + 'px';
  }};
  background-color: ${({theme}) => theme.palette.emptyCardSlot};
  shadow-opacity: ${({length}) => 0.8 * (length / 36)};
  position: relative;
  /* transform: rotate(270deg); */
`;

const Pile = ({
  face = false,
  pile: pileName,
  deck,
  singlePlayer,
  phase,
  drawCard,
}) => {
  const renderPile = [];
  const pile = [...deck[pileName]];
  let cardSource = cardImg.back;
  const draw = () => {
    console.log('[pile.component] pileName: ', pileName);
    const drawable =
      phase === PHASE_DRAW && (!singlePlayer || pileName !== DISCARD_PILE);

    return drawable && drawCard(pileName);
  };

  pile.forEach((card) => {
    const {value, suit} = card;
    if (face) {
      cardSource = cardImg[suit][value];
    }

    renderPile.unshift(
      <Card key={`${value}-of-${suit}`} pressed={draw} source={cardSource} />,
    );
  });

  return (
    <Wrapper length={pile.length} deviceWidth={useWindowDimensions().width}>
      {renderPile}
    </Wrapper>
  );
};

const mapStateToProps = ({deck, game: {phase, singlePlayer}}) => ({
  deck,
  singlePlayer,
  phase,
});

const mapDispatchToProps = (dispatch) => ({
  drawCard: (pile) => dispatch(actions.drawCard({pile})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pile);
