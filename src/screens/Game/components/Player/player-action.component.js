import React from 'react';
import {useWindowDimensions} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Card, CurrentCardWrapper} from '../Cards';
import cardImg from 'assets/cardImg';
import {DefaultButton, ActionButton, ActionButtonsWrapper} from 'components/UI';
import {actions} from 'store/slices';
import {PHASE_PLAY, DISCARD_PILE, PHASE_DRAW, PHASE_PEEKING} from 'constants';

const Wrapper = styled.View`
  width: 100%;
  max-width: 450px;
  padding: 40px 20px;
  align-items: center;
  justify-content: space-around;
`;

const PlayerAction = ({
  currentCard,
  discardPile,
  phase,
  playCard,
  swapHandler,
}) => {
  const deviceWidth = useWindowDimensions().width;
  const {value, suit} = currentCard;

  return (
    <Wrapper>
      <CurrentCardWrapper deviceWidth={deviceWidth}>
        <Card source={cardImg[suit][value]} />
      </CurrentCardWrapper>
      <ActionButtonsWrapper>
        <ActionButton
          onPress={() => {
            discardPile.unshift(currentCard);
            playCard(discardPile);
          }}
          width={'175px'}>
          PLAY
        </ActionButton>
        <ActionButton onPress={swapHandler}>SWAP</ActionButton>
      </ActionButtonsWrapper>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  phase: state.game.phase,
  currentCard: state.deck.currentCard,
  discardPile: [...state.deck[DISCARD_PILE]],
});

const mapDispatchToProps = (dispatch) => ({
  playCard: (stack) => dispatch(actions.playCard({stack})),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAction);
