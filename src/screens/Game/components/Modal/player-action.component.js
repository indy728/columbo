/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {connect} from 'react-redux';
import {Card, CurrentCardWrapper} from '../Cards';
import cardImg from 'assets/cardImg';
import {ActionButton} from 'components/UI';
import {actions} from 'store/slices';
import {
  ModalContentWrapper,
  ModalCardsWrapper,
  ModalButtonsWrapper,
} from './styles';
import {DISCARD_PILE} from 'constants';

const PlayerAction = ({currentCard, discardPile, playCard, swapHandler}) => {
  const deviceWidth = useWindowDimensions().width;
  const {value, suit} = currentCard;
  const buttons = [
    {
      text: 'play',
      action: () => {
        discardPile.unshift(currentCard);
        playCard(discardPile);
      },
      color: 'yellow',
    },
    {
      text: 'swap',
      action: swapHandler,
      color: 'blue',
    },
  ];

  return (
    <ModalContentWrapper>
      <ModalCardsWrapper>
        <CurrentCardWrapper deviceWidth={deviceWidth}>
          <Card source={cardImg[suit][value]} />
        </CurrentCardWrapper>
      </ModalCardsWrapper>
      <ModalButtonsWrapper>
        {buttons.map(({text, action, color}) => (
          <ActionButton
            key={text}
            onPress={action}
            styleProps={{
              width: '175px',
              color,
            }}>
            {text}
          </ActionButton>
        ))}
      </ModalButtonsWrapper>
    </ModalContentWrapper>
  );
};

const mapStateToProps = (state) => ({
  currentCard: state.deck.currentCard,
  discardPile: [...state.deck[DISCARD_PILE]],
});

const mapDispatchToProps = (dispatch) => ({
  playCard: (stack) => dispatch(actions.playCard({stack})),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAction);
