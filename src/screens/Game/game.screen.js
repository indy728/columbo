import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import {Player, PlayerHand, PlayerAction} from './components/Player';
import {DefaultButton, ActionButton} from 'components/UI';
import {GameLayout} from './components';
import Modal from 'hoc/Modal';
import {actions} from 'store/slices';
import {DateTime} from 'luxon';
import {arrayImmutableReplace, arrayImmutablePush} from 'util';
import {EndGameModalContent} from './components/Modal';
import {
  shuffleCards,
  initDeck as createDeck,
  findFirstEmptyCardSlot,
  cleanUpHand,
  matchArrayInArray,
  toggleBooleanStateHandler,
} from 'util';
import {
  DRAW_PILE,
  DISCARD_PILE,
  PHASE_DRAW,
  PHASE_PEEK,
  PHASE_PEEKING,
  PHASE_END_GAME,
  CARD_ACTION_PEEK_SELECT,
  CARD_ACTION_PEEKING,
  CARD_ACTION_SLAP,
  CARD_ACTION_SWAP,
  GAME_STATUS_POST_GAME,
} from 'constants';

const Wrapper = styled.View`
  flex: 1;
  padding-top: 20px;
  background-color: ${({theme}) => theme.palette.grayscale[5]};
`;

const View = styled.View``;
const Text = styled.Text``;

// const RawScoreValues = ScoreText;
// const PointScore = ScoreText;

const replaceCardInHand = (hand, col, row, card) => {
  return arrayImmutableReplace(
    hand,
    col,
    arrayImmutableReplace(hand[col], row, card),
  );
};

class GameScreen extends Component {
  state = {
    selected: [],
    swapping: false,
    slapping: false,
    calling: false,
    endGameDetails: false,
  };

  componentDidUpdate() {
    const {drawPile, discardPile, rebuildDeck} = this.props;

    if (drawPile.length === 0) {
      rebuildDeck(shuffleCards(discardPile));
    }
  }

  dealCardsHandler = () => {
    const {drawPile, dealCards} = this.props;
    const hand = [[], []];

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        let card = drawPile.shift();
        hand[i][j] = card;
      }
    }
    dealCards(drawPile, hand);
  };

  swapCardsHandler = (cardLocationArray) => {
    const {
      player: {hand},
      discardPile,
      currentCard,
      swapCards,
      round,
    } = this.props;
    const [col, row] = cardLocationArray;

    discardPile.unshift(hand[col][row]);
    this.setState({swapping: false});
    swapCards(
      discardPile,
      replaceCardInHand(hand, col, row, currentCard),
      round.turns + 1,
    );
  };

  slapCardHandler = (cardLocationArray) => {
    const {
      player: {hand},
      discardPile,
      drawPile,
      slapCards,
    } = this.props;
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
    this.setState({slapping: false});
  };

  tappedHandler = () => {
    this.setState({calling: false});
    this.props.showGameSummary();
  };

  peekCardsHandler = (handCoordinates) => {
    const {selected} = this.state;
    const index = matchArrayInArray(selected, handCoordinates);

    if (index === -1) {
      if (selected.length === 2) {
        return;
      }
      selected.unshift(handCoordinates);
    } else {
      selected.splice(index, 1);
    }

    this.setState({selected});
  };

  peekPhaseHandler = () => {
    const {selected} = this.state;
    const {phase, updateGame, launchRound, player} = this.props;
    let buttonPressed = () => updateGame({phase: PHASE_PEEKING});
    let peekButtonText = 'reveal';
    let action = CARD_ACTION_PEEK_SELECT;

    if (phase === PHASE_PEEKING) {
      buttonPressed = () => {
        this.setState({selected: []});
        launchRound();
      };
      peekButtonText = 'ready';
      action = CARD_ACTION_PEEKING;
    }

    return (
      <>
        <PlayerHand
          hand={player.hand}
          selected={selected}
          pressed={this.peekCardsHandler}
          cardAction={action}
        />
        <DefaultButton onPress={buttonPressed} disabled={selected.length !== 2}>
          {peekButtonText}
        </DefaultButton>
      </>
    );
  };

  pileClickedHandler = (pile) => {
    const {phase, drawCard} = this.props;

    return phase === PHASE_DRAW && drawCard(pile);
  };

  modalContentByPhase = () => {
    const {
      player: {hand, rounds},
      round,
      endRound,
      phase,
    } = this.props;

    switch (phase) {
      case PHASE_PEEK:
      case PHASE_PEEKING:
        return this.peekPhaseHandler();
      case PHASE_END_GAME:
        return (
          <EndGameModalContent
            endRound={() => endRound(arrayImmutablePush(rounds, round))}
          />
        );
      default:
        return null;
    }
  };

  // setEndGameContent = () => {
  //   const {
  //     player,
  //     endRound,
  //     navigation: {navigate},
  //     round,
  //   } = this.props;
  //   const {rounds} = player;
  //   rounds.push(round);

  //   let endGameContent = (
  //     <>
  //       <FinalScore>
  //         <ScoreText>
  //           final score: {rounds.reduce((points, r) => points + r.points)}
  //         </ScoreText>
  //         <ScoreText>
  //           turns taken: {rounds.reduce((turns, r) => turns + r.turns)}
  //         </ScoreText>
  //         <ScoreText>
  //           time taken:{' '}
  //           {rounds.reduce(
  //             (duration, r) => duration + (+r.endTime - +r.startTime) / 1000,
  //           )}{' '}
  //           seconds
  //         </ScoreText>
  //         <ActionButton
  //           onPress={() => toggleBooleanStateHandler(this, 'endGameDetails')}>
  //           show round details
  //         </ActionButton>
  //       </FinalScore>
  //       <DefaultButton onPress={() => endRound(rounds)}>
  //         play again
  //       </DefaultButton>
  //       <DefaultButton
  //         onPress={() => {
  //           endRound();
  //           navigate(HOME_SCREEN);
  //         }}>
  //         home screen
  //       </DefaultButton>
  //     </>
  //   );

  //   if (this.state.endGameDetails) {
  //     endGameContent = (
  //       <>
  //         {rounds.map((r, i) => this.getRoundScoreDetails(r, i))}
  //         <ActionButton
  //           onPress={() => toggleBooleanStateHandler(this, 'endGameDetails')}>
  //           hide details
  //         </ActionButton>
  //       </>
  //     );
  //   }

  //   return endGameContent;
  // };

  getModalContent = () => {
    const {
      isDealt,
      gameStatus,
      currentCard,
      player: {hand},
    } = this.props;
    const {slapping, swapping, calling} = this.state;

    if (!isDealt) {
      return (
        <DefaultButton onPress={this.dealCardsHandler}>deal</DefaultButton>
      );
    } else if (gameStatus === GAME_STATUS_POST_GAME) {
      return this.setEndGameContent();
    } else if (slapping) {
      return (
        <>
          <PlayerHand
            hand={hand}
            pressed={this.slapCardHandler}
            cardAction={CARD_ACTION_SLAP}
          />
          <ActionButton
            onPress={() => toggleBooleanStateHandler(this, 'slapping')}>
            Cancel
          </ActionButton>
        </>
      );
    } else if (swapping) {
      return (
        <>
          <PlayerHand
            hand={hand}
            pressed={this.swapCardsHandler}
            cardAction={CARD_ACTION_SWAP}
          />
          <ActionButton onPress={() => this.setState({swapping: false})}>
            Cancel
          </ActionButton>
        </>
      );
    } else if (currentCard) {
      return (
        <PlayerAction
          swapHandler={() => toggleBooleanStateHandler(this, 'swapping')}
          slapHandler={() => toggleBooleanStateHandler(this, 'slapping')}
        />
      );
    } else if (calling) {
      return (
        <>
          <View>
            <Text>Are you sure?</Text>
          </View>
          <ActionButton onPress={this.tappedHandler}>call it</ActionButton>
          <ActionButton
            onPress={() => toggleBooleanStateHandler(this, 'calling')}>
            Cancel
          </ActionButton>
        </>
      );
    } else {
      return this.modalContentByPhase();
    }
  };

  render() {
    const modalContent = this.getModalContent();

    return (
      <>
        <Modal visible={!!modalContent}>{modalContent}</Modal>
        <GameLayout
          setAction={(action, value) => this.setState({[action]: value})}
        />
      </>
    );
  }
}

const mapStateToProps = ({
  game: {launched, phase, slappable, player, round, isDealt, gameStatus},
  deck,
}) => ({
  launched,
  phase,
  slappable,
  player,
  round,
  isDealt,
  gameStatus,
  drawPile: [...deck[DRAW_PILE]],
  discardPile: [...deck[DISCARD_PILE]],
  currentCard: deck.currentCard,
});

const mapDispatchToProps = (dispatch) => ({
  drawCard: (pile) => dispatch(actions.drawCard({pile})),
  dealCards: (stack, hand) => dispatch(actions.dealCards({stack, hand})),
  swapCards: (stack, hand) => dispatch(actions.swapCards({stack, hand})),
  slapCards: (stack, hand, success) =>
    dispatch(actions.slapCards({stack, hand, success})),
  rebuildDeck: (shuffledDeck) => dispatch(actions.rebuildDeck({shuffledDeck})),
  launchRound: () =>
    dispatch(actions.launchRound({startTime: DateTime.local()})),
  showGameSummary: () =>
    dispatch(actions.showGameSummary({endTime: DateTime.local()})),
  endRound: (rounds) =>
    dispatch(actions.endRound({rounds, initialDeck: createDeck()})),
  updateGame: (updatedAttributes) =>
    dispatch(actions.updateGame({updatedAttributes})),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
