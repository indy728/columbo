import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import {Deck} from 'components/Game/Deck';
import {Player, PlayerHand, PlayerAction} from 'components/Game/Player';
import {DefaultButton, ActionButton} from 'components/UI';
import {GameLayout} from './components';
import Modal from 'hoc/Modal';
import {actions} from 'store/slices';
import {DateTime} from 'luxon';
import {arrayImmutableReplace, arrayImmutablePush} from 'util';
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
  PHASE_TAPPED,
  CARD_ACTION_PEEK_SELECT,
  CARD_ACTION_PEEKING,
  CARD_ACTION_SLAP,
  CARD_ACTION_SWAP,
  CARD_ACTION_TAPPED,
  GAME_STATUS_POST_GAME,
  MAX_TURNS_POINTS,
  MAX_TIME_POINTS,
  CARD_POINTS_MULTIPLIER,
  TURNS_POINTS_MULTIPLIER,
  TIME_POINTS_MULTIPLIER,
  HOME_SCREEN,
} from 'constants';

const Wrapper = styled.View`
  flex: 1;
  padding-top: 20px;
  background-color: ${({theme}) => theme.palette.grayscale[5]};
`;

const FinalScore = styled.View`
  width: 90%;
  padding: 30px 10px;
  margin-bottom: 50px;
  background-color: ${({theme}) => theme.palette.grayscale[1]};
  align-items: center;
`;

const ScoreDetails = styled.View`
  height: 100%;
`;

const Points = styled.View`
  height: 100%;
`;

const ScoreText = styled.Text`
  font-size: 16px;
  text-transform: uppercase;
  color: ${({theme}) => theme.palette.white[0]};
  text-align: center;
`;

const ScoreRow = styled.View`
  width: 100%;
  margin: 10px 0;
  padding: 0 15px;

  flex-flow: row;
  justify-content: space-between;
`;

const RawScoreValues = ScoreText;
const PointScore = ScoreText;

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
    tapping: false,
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
    this.setState({tapping: false});
    this.props.tapRound();
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

  modalContentByPhase = (phase) => {
    const {
      player: {hand, rounds},
      round,
      endRound,
    } = this.props;

    switch (phase) {
      case PHASE_PEEK:
      case PHASE_PEEKING:
        return this.peekPhaseHandler();
      case PHASE_TAPPED:
        return (
          <>
            {this.getRoundScoreDetails()}
            <PlayerHand hand={hand} cardAction={CARD_ACTION_TAPPED} />
            <ActionButton
              onPress={() => endRound(arrayImmutablePush(rounds, round))}>
              next round
            </ActionButton>
            <ActionButton onPress={this.tappedHandler}>tap now</ActionButton>
          </>
        );
      default:
        return null;
    }
  };

  getRoundDuration = () => {
    const {round} = this.props;
    return (+round.endTime - +round.startTime) / 1000;
  };

  getHandValue = () => {
    const {
      player: {hand},
    } = this.props;

    return hand.flat().reduce((p, card) => {
      if (!card) {
        return p;
      }
      return p + +card.points;
    }, 0);
  };

  getRoundScoreDetails = (index = 0) => {
    const {
      round: {turns},
    } = this.props;
    const roundDuration = this.getRoundDuration();
    const points = this.getHandValue();
    const cardPoints = (4 - points) * CARD_POINTS_MULTIPLIER;
    const turnsPoints =
      points > 4 ? 0 : MAX_TURNS_POINTS - turns * TURNS_POINTS_MULTIPLIER;
    const timePoints =
      points > 4 ? 0 : MAX_TIME_POINTS - roundDuration * TIME_POINTS_MULTIPLIER;

    return (
      <FinalScore key={index}>
        <ScoreRow>
          <RawScoreValues>hand value: {points}</RawScoreValues>
          <PointScore>{cardPoints}</PointScore>
        </ScoreRow>
        <ScoreRow>
          <RawScoreValues>turns taken: {turns}</RawScoreValues>
          <PointScore>{turnsPoints}</PointScore>
        </ScoreRow>
        <ScoreRow>
          <RawScoreValues>
            time: {Math.floor(roundDuration)} seconds
          </RawScoreValues>
          <PointScore>{timePoints}</PointScore>
        </ScoreRow>
        <ScoreRow>
          <ScoreText>
            Total Points: {cardPoints + turnsPoints + timePoints}
          </ScoreText>
        </ScoreRow>
      </FinalScore>
    );
  };

  setEndGameContent = () => {
    const {
      player,
      endRound,
      navigation: {navigate},
      round,
    } = this.props;
    const {rounds} = player;
    rounds.push(round);

    let endGameContent = (
      <>
        <FinalScore>
          <ScoreText>
            final score: {rounds.reduce((points, r) => points + r.points)}
          </ScoreText>
          <ScoreText>
            turns taken: {rounds.reduce((turns, r) => turns + r.turns)}
          </ScoreText>
          <ScoreText>
            time taken:{' '}
            {rounds.reduce(
              (duration, r) => duration + (+r.endTime - +r.startTime) / 1000,
            )}{' '}
            seconds
          </ScoreText>
          <ActionButton
            onPress={() => toggleBooleanStateHandler(this, 'endGameDetails')}>
            show round details
          </ActionButton>
        </FinalScore>
        <DefaultButton onPress={() => endRound(rounds)}>
          play again
        </DefaultButton>
        <DefaultButton
          onPress={() => {
            endRound();
            navigate(HOME_SCREEN);
          }}>
          home screen
        </DefaultButton>
      </>
    );

    if (this.state.endGameDetails) {
      endGameContent = (
        <>
          {rounds.map((r, i) => this.getRoundScoreDetails(r, i))}
          <ActionButton
            onPress={() => toggleBooleanStateHandler(this, 'endGameDetails')}>
            hide details
          </ActionButton>
        </>
      );
    }

    return endGameContent;
  };

  render() {
    let modalContent = null;
    const {
      discardPile,
      drawPile,
      phase,
      gameStatus,
      player,
      isDealt,
    } = this.props;

    if (!isDealt) {
      modalContent = (
        <DefaultButton onPress={this.dealCardsHandler}>deal</DefaultButton>
      );
    } else if (gameStatus === GAME_STATUS_POST_GAME) {
      modalContent = this.setEndGameContent();
    } else if (this.state.slapping) {
      modalContent = (
        <>
          <PlayerHand
            hand={this.props.player.hand}
            pressed={this.slapCardHandler}
            cardAction={CARD_ACTION_SLAP}
          />
          <ActionButton
            onPress={() => toggleBooleanStateHandler(this, 'slapping')}>
            Cancel
          </ActionButton>
        </>
      );
    } else if (this.state.swapping) {
      modalContent = (
        <>
          <PlayerHand
            hand={player.hand}
            pressed={this.swapCardsHandler}
            cardAction={CARD_ACTION_SWAP}
          />
          <ActionButton onPress={() => this.setState({swapping: false})}>
            Cancel
          </ActionButton>
        </>
      );
    } else if (this.state.tapping) {
      modalContent = (
        <>
          <ActionButton onPress={this.tappedHandler}>tap now</ActionButton>
          <ActionButton
            onPress={() => toggleBooleanStateHandler(this, 'tapping')}>
            Cancel
          </ActionButton>
        </>
      );
    } else {
      modalContent = this.modalContentByPhase(phase);
    }

    return (
      <>
        <Modal visible={!!modalContent}>{modalContent}</Modal>
        {/* <Wrapper>
          <Deck
            discardPile={discardPile}
            drawPile={drawPile}
            pressed={this.pileClickedHandler}
            slapping={this.state.slapping}
          />
          <PlayerAction
            swapHandler={() => toggleBooleanStateHandler(this, 'swapping')}
            slapHandler={() => toggleBooleanStateHandler(this, 'slapping')}
          />
          <Player
            tappingHandler={() => toggleBooleanStateHandler(this, 'tapping')}
          />
        </Wrapper>
        <ActionButton onPress={this.props.onEndGame} /> */}
        <GameLayout />
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
  tapRound: () => dispatch(actions.tapRound({endTime: DateTime.local()})),
  endRound: (rounds) =>
    dispatch(actions.endRound({rounds, initialDeck: createDeck()})),
  updateGame: (updatedAttributes) =>
    dispatch(actions.updateGame({updatedAttributes})),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
