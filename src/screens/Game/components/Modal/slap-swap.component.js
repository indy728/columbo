/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {
  ModalContentWrapper,
  ModalCardsWrapper,
  ModalButtonsWrapper,
} from './styles';
import {ActionButton} from 'components/UI';
import {PlayerHand} from '../Player';
import {CARD_ACTION_SWAP, DISCARD_PILE, DRAW_PILE} from 'constants';
import {
  arrayImmutableReplace,
  arrayImmutablePush,
  cleanUpHand,
  findFirstEmptyCardSlot,
} from 'util';
import {actions} from 'store/slices';

const replaceCardInHand = (hand, col, row, card) => {
  return arrayImmutableReplace(
    hand,
    col,
    arrayImmutableReplace(hand[col], row, card),
  );
};

const SlapSwapModalContent = ({
  actionType,
  toggleState,
  hand,
  discardPile,
  drawPile,
  currentCard,
  round,
  slapCards,
  swapCards,
}) => {
  const slapCardHandler = (cardLocationArray) => {
    const [col, row] = cardLocationArray;
    const topCard = discardPile[0];
    let newHand;
    const slappedCard = hand[col][row];

    if (slappedCard && slappedCard.value === topCard.value) {
      discardPile.unshift(slappedCard);
      newHand = replaceCardInHand(hand, col, row, null);
      if (col === 0) {
        cleanUpHand(newHand, true);
      }
      if (col === newHand.length - 1) {
        cleanUpHand(newHand, false);
      }
      slapCards(discardPile, newHand, true);
    } else {
      const firstEmptyCardSlot = findFirstEmptyCardSlot(hand);
      let card = drawPile.shift();

      if (!firstEmptyCardSlot) {
        newHand = arrayImmutablePush(hand, [card, null]);
      } else {
        const [i, j] = firstEmptyCardSlot;
        newHand = replaceCardInHand(hand, i, j, card);
      }
      slapCards(drawPile, newHand, false);
    }
    toggleState();
  };
  const swapCardsHandler = (cardLocationArray) => {
    const [col, row] = cardLocationArray;

    discardPile.unshift(hand[col][row]);
    swapCards(
      discardPile,
      replaceCardInHand(hand, col, row, currentCard),
      round.turns + 1,
    );
    toggleState();
  };

  const action =
    actionType === CARD_ACTION_SWAP ? swapCardsHandler : slapCardHandler;

  return (
    <ModalContentWrapper>
      <ModalCardsWrapper>
        <PlayerHand pressed={action} cardAction={actionType} />
      </ModalCardsWrapper>
      <ModalButtonsWrapper>
        <ActionButton
          onPress={toggleState}
          styleProps={{
            color: 'red',
          }}>
          Cancel
        </ActionButton>
      </ModalButtonsWrapper>
    </ModalContentWrapper>
  );
};

const mapStateToProps = ({
  game: {
    player: {hand},
    round,
  },
  deck,
}) => ({
  round,
  hand,
  drawPile: [...deck[DRAW_PILE]],
  discardPile: [...deck[DISCARD_PILE]],
  currentCard: deck.currentCard,
});

const mapDispatchToProps = (dispatch) => ({
  swapCards: (stack, hand) => dispatch(actions.swapCards({stack, hand})),
  slapCards: (stack, hand, success) =>
    dispatch(actions.slapCards({stack, hand, success})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SlapSwapModalContent);
