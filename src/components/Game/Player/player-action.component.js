import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Card, CurrentCardWrapper} from '../Cards';
import cardImg from 'assets/cardImg';
import {DefaultButton, ActionButton, ActionButtonsWrapper} from 'components/UI';
import {actions} from 'store/slices';
import {
  PHASE_PLAY,
  PHASE_SWAP,
  DISCARD_PILE,
  PHASE_DRAW,
  PHASE_PEEKING,
} from 'constants';

const Wrapper = styled.View`
  flex: 3;
  align-items: center;
  justify-content: space-around;
`;

const PlayerAction = ({
  currentCard,
  slappable,
  turns,
  discardPile,
  phase,
  updatePhase,
  playCard,
  slapHandler,
}) => {
  let currentCardRender = <CurrentCardWrapper />;
  let actionButton = (
    <ActionButton
      disabled={phase !== PHASE_PLAY}
      onPress={() => updatePhase(PHASE_SWAP)}>
      SWAP
    </ActionButton>
  );

  if (slappable) {
    actionButton = (
      <ActionButton onPress={() => slapHandler()}>SLAP</ActionButton>
    );
  }

  if (currentCard) {
    const {value, suit} = currentCard;
    currentCardRender = (
      <CurrentCardWrapper>
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
            playCard(
              PHASE_DRAW,
              turns + 1,
              discardPile,
              phase === PHASE_PEEKING,
            );
          }}
          width={175}>
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
  turns: state.game.round.turns,
  discardPile: [...state.deck[DISCARD_PILE]],
});

const mapDispatchToProps = (dispatch) => ({
  updatePhase: (phase) => dispatch(actions.updatePhase({phase})),
  playCard: (phase, turns, deck, slappable) => {
    dispatch(
      actions.updatePhase({
        phase,
        turns,
        slappable,
      }),
    );
    console.log('[player-action.component] deck: ', deck);
    dispatch(actions.playCard({pile: DISCARD_PILE, deck}));
  },
  onPlay: (card) => dispatch(actions.playCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAction);
