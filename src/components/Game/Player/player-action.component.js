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
  flex: 3;
  align-items: center;
  justify-content: space-around;
`;

const PlayerAction = ({
  currentCard,
  slappable,
  discardPile,
  phase,
  playCard,
  swapHandler,
  slapHandler,
}) => {
  const deviceWidth = useWindowDimensions().width;

  let currentCardRender = <CurrentCardWrapper deviceWidth={deviceWidth} />;
  let actionButton = (
    <ActionButton disabled={phase !== PHASE_PLAY} onPress={swapHandler}>
      SWAP
    </ActionButton>
  );

  if (slappable) {
    actionButton = <ActionButton onPress={slapHandler}>SLAP</ActionButton>;
  }

  if (currentCard) {
    const {value, suit} = currentCard;
    currentCardRender = (
      <CurrentCardWrapper deviceWidth={deviceWidth}>
        <Card source={cardImg[suit][value]} />
      </CurrentCardWrapper>
    );
  }

  return (
    <Wrapper>
      {currentCardRender}
      <ActionButtonsWrapper>
        <DefaultButton
          disabled={phase !== PHASE_PLAY}
          onPress={() => {
            discardPile.unshift(currentCard);
            playCard(discardPile);
          }}
          width={'175px'}>
          PLAY
        </DefaultButton>
        {actionButton}
      </ActionButtonsWrapper>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  phase: state.game.phase,
  currentCard: state.deck.currentCard,
  slappable: state.game.slappable,
  discardPile: [...state.deck[DISCARD_PILE]],
});

const mapDispatchToProps = (dispatch) => ({
  playCard: (stack) => dispatch(actions.playCard({stack})),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAction);
