import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Card from '../../Cards/Card/Card';
import cardImg from 'assets/cardImg';
import {DefaultButton, ActionButton} from '@UI';
import * as actions from '@store/actions';
import * as storeVariables from '@store/storeVariables';

const Wrapper = styled.View`
  flex: 3;
  align-items: center;
  justify-content: space-around;
`;

const CurrentCardWrapper = styled.View`
  width: ${() => 2 * storeVariables.CARD_PIXEL_WIDTH + 'px'};
  height: ${() => 2 * storeVariables.CARD_PIXEL_HEIGHT + 'px'};
  background-color: ${({theme}) => theme.palette.grayscale[4]};
  shadow-opacity: ${({children}) =>
    children ? storeVariables.SINGLE_CARD_SHADOW_OPACITY : 0};
  align-items: center;
  justify-content: center;
`;

const ActionButtonsWrapper = styled.View`
  width: 100%;
  flex-flow: row;
  justify-content: space-around;
`;

class PlayerAction extends Component {
  render() {
    const {currentCard, slappable} = this.props;
    let currentCardRender = <CurrentCardWrapper />;
    let actionButton = (
      <ActionButton
        disabled={this.props.phase !== storeVariables.PHASE_PLAY}
        onPress={() => this.props.onUpdatePhase(storeVariables.PHASE_SWAP)}>
        SWAP
      </ActionButton>
    );

    if (slappable) {
      actionButton = (
        <ActionButton onPress={() => this.props.slapHandler()}>
          SLAP
        </ActionButton>
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
            disabled={this.props.phase !== storeVariables.PHASE_PLAY}
            onPress={() => this.props.onPlay(currentCard)}
            width={175}>
            PLAY
          </DefaultButton>
          {actionButton}
        </ActionButtonsWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    phase: state.game.phase,
    currentCard: state.deck.currentCard,
    slappable: state.game.slappable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePhase: (phase) => dispatch(actions.updatePhase(phase)),
    onPlay: (card) => dispatch(actions.playCard(card)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAction);
