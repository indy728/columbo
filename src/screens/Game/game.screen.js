import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import {Deck} from 'components/Game/Deck';
import {Player, PlayerHand, PlayerAction} from 'components/Game/Player';
import {DefaultButton, ActionButton} from 'components/UI';
import Modal from 'hoc/Modal';
import {actions} from 'store/slices';
import {DateTime} from 'luxon';
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
  PHASE_PLAY,
  PHASE_SWAP,
  PHASE_TAPPED,
  CARD_ACTION_PEEK_SELECT,
  CARD_ACTION_PEEKING,
  CARD_ACTION_SLAP,
  CARD_ACTION_SWAP,
  CARD_ACTION_TAPPED,
  GAME_STATUS_POST_GAME,
  MAX_CARD_POINTS,
  MAX_TURNS_POINTS,
  MAX_TIME_POINTS,
  CARD_POINTS_MULTIPLIER,
  TURNS_POINTS_MULTIPLIER,
  TIME_POINTS_MULTIPLIER,
  HOME_SCREEN,
} from 'constants';

const Wrapper = styled.View`
  flex: 1;
  padding-top: 50px;
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

class GameScreen extends Component {
  state = {
    selected: [],
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
    const {drawPile, player, dealCards} = this.props;
    const {hand} = player;
    const drawCopy = drawPile.map((a) => Object.assign({}, a));

    for (let i = 0; i < 4; i++) {
      let firstEmptyCardSlot = findFirstEmptyCardSlot(hand);
      let card = drawCopy.shift();

      if (!firstEmptyCardSlot) {
        hand.push([card, null]);
      } else {
        hand[firstEmptyCardSlot[0]][firstEmptyCardSlot[1]] = card;
      }
    }

    dealCards(drawCopy, hand);
  };

  swapCardsHandler = (cardLocationArray) => {
    const {player, discardPile, currentCard, swapCards} = this.props;
    const {hand} = player;
    const [col, row] = cardLocationArray;

    discardPile.unshift(hand[col][row]);
    hand[col][row] = currentCard;

    swapCards(discardPile, hand);
  };

  slapCardHandler = (cardLocationArray) => {
    const {player, discardPile, drawPile, slapCards, swapCards} = this.props;
    const {hand} = player;
    const [col, row] = cardLocationArray;
    const topCard = discardPile[0];

    if (hand[col][row] && hand[col][row].value === topCard.value) {
      discardPile.unshift(hand[col][row]);
      hand[col][row] = null;
      if (col === 0) {
        cleanUpHand(hand, true);
      }
      if (col === hand.length - 1) {
        cleanUpHand(hand, false);
      }
      slapCards(discardPile, hand);
    } else {
      for (let i = 0; i < 2; i++) {
        let firstEmptyCardSlot = findFirstEmptyCardSlot(hand);
        let card = drawPile.shift();

        if (!firstEmptyCardSlot) {
          hand.push([card, null]);
        } else {
          hand[firstEmptyCardSlot[0]][firstEmptyCardSlot[1]] = card;
        }
      }
      swapCards(drawPile, hand);
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

    console.log('[Game.screen] handCoordinates: ', handCoordinates);

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
    const {phase, updatePhase, launchRound, player} = this.props;
    let buttonPressed = () => updatePhase(PHASE_PEEKING);
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
    const {player, updatePhase, round} = this.props;

    switch (phase) {
      case PHASE_PEEK:
      case PHASE_PEEKING:
        return this.peekPhaseHandler();
      case PHASE_SWAP:
        return (
          <>
            <PlayerHand
              hand={player.hand}
              pressed={this.swapCardsHandler}
              cardAction={CARD_ACTION_SWAP}
            />
            <ActionButton onPress={() => updatePhase(PHASE_PLAY)}>
              Cancel
            </ActionButton>
          </>
        );
      case PHASE_TAPPED:
        return (
          <>
            {this.getRoundScoreDetails(round)}
            <PlayerHand hand={player.hand} cardAction={CARD_ACTION_TAPPED} />
            <ActionButton onPress={this.props.onEndRound}>
              next round
            </ActionButton>
            <ActionButton onPress={this.tappedHandler}>tap now</ActionButton>
          </>
        );
      default:
        return null;
    }
  };

  getRoundDuration = (round) => {
    return (+round.endTime - +round.startTime) / 1000;
  };

  getRoundScoreDetails = (round, index = 0) => {
    const {points, turns} = round;
    const roundDuration = this.getRoundDuration(round);
    const cardPoints = Math.max(
      0,
      (MAX_CARD_POINTS - (points > 4 ? points + (points - 4) * 5 : points)) *
        CARD_POINTS_MULTIPLIER,
    );
    const turnsPoints = MAX_TURNS_POINTS - turns * TURNS_POINTS_MULTIPLIER;
    const timePoints = MAX_TIME_POINTS - roundDuration * TIME_POINTS_MULTIPLIER;

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
    const {discardPile, drawPile, phase, gameStatus} = this.props;

    if (!this.props.isDealt) {
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
        <Modal visible={modalContent !== null}>{modalContent}</Modal>
        <Wrapper>
          <Deck
            discardPile={discardPile}
            drawPile={drawPile}
            pressed={this.pileClickedHandler}
            slapping={this.state.slapping}
          />
          <PlayerAction
            slapHandler={() => toggleBooleanStateHandler(this, 'slapping')}
          />
          <Player
            tappingHandler={() => toggleBooleanStateHandler(this, 'tapping')}
          />
        </Wrapper>
        <ActionButton onPress={this.props.onEndGame} />
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
  drawPile: deck[DRAW_PILE],
  discardPile: deck[DISCARD_PILE],
  currentCard: deck.currentCard,
});

const mapDispatchToProps = (dispatch) => ({
  drawCard: (pile) => dispatch(actions.drawCard({pile})),
  dealCards: (deck, hand) => {
    dispatch(actions.updatePlayerHand({hand}));
    dispatch(actions.updateDeck({pile: DRAW_PILE, deck}));
    dispatch(actions.updateGame({updatedAttributes: {isDealt: true}}));
  },
  swapCards: (deck, hand) => {
    dispatch(actions.updatePlayerHand({hand}));
    dispatch(actions.swapCards({pile: DISCARD_PILE, deck}));
  },
  slapCards: (deck) => {
    dispatch(actions.updateDeck({pile: DISCARD_PILE, deck}));
    dispatch(actions.updateGame({updatedAttributes: {slappable: false}}));
  },
  updatePhase: (phase, turns) => dispatch(actions.updatePhase({phase, turns})),
  rebuildDeck: (shuffledDeck) => dispatch(actions.rebuildDeck({shuffledDeck})),
  launchRound: () =>
    dispatch(actions.launchRound({startTime: DateTime.local()})),
  tapRound: () => {
    dispatch(actions.initDeck({initialDeck: createDeck()}));
    dispatch(actions.tapRound({endTime: DateTime.local()}));
  },
  endRound: (rounds) => dispatch(actions.endRound({rounds})),
  // onDrawCard: (card) => dispatch(actions.drawCard(card)),
  // onDealCards: (drawPile, player) =>
  //   dispatch(actions.dealCards(drawPile, player)),
  // onSwapCards: (discard, player) =>
  //   dispatch(actions.swapCards(discard, player)),
  // onSlapCards: (discard, player) => dispatch(actions.slapCard(discard, player)),
  // onUpdatePhase: (phase) => dispatch(actions.updatePhase(phase)),
  // onEmptyDrawPile: (discardPile) =>
  //   dispatch(actions.rebuildDrawPileFromDiscardPile(discardPile)),
  // onLaunchRound: (startTime) => dispatch(actions.launchRound(startTime)),
  // onTapRound: (endTime) => dispatch(actions.tapRound(endTime)),
  // onEndRound: () => dispatch(actions.endRound()),
  // onInitDeck: () => dispatch(actions.initDeck()),
  // onEndGame: () => dispatch(actions.endGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
