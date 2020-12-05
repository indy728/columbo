import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DefaultButton, ActionButton} from 'components/UI';
import {GameLayout} from './components';
import Modal from 'hoc/Modal';
import {actions} from 'store/slices';
import {DateTime} from 'luxon';
import {arrayImmutableReplace, arrayImmutablePush} from 'util';
import {
  EndGameModalContent,
  PeekPhaseModalContent,
  PlayerActionModalContent,
  SlapSwapModalContent,
  CallingModalContent,
} from './components/Modal';
import {
  shuffleCards,
  initDeck as createDeck,
  toggleBooleanStateHandler,
} from 'util';
import {
  DRAW_PILE,
  DISCARD_PILE,
  PHASE_DRAW,
  PHASE_PEEK,
  PHASE_PEEKING,
  PHASE_END_GAME,
  CARD_ACTION_SLAP,
  CARD_ACTION_SWAP,
  GAME_STATUS_POST_GAME,
} from 'constants';

// const View = styled.View``;
// const Text = styled.Text``;

// const RawScoreValues = ScoreText;
// const PointScore = ScoreText;

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

  tappedHandler = () => {
    this.setState({calling: false});
    this.props.showGameSummary();
  };

  modalContentByPhase = () => {
    const {
      player: {rounds},
      round,
      endRound,
      phase,
      updateGame,
      launchRound,
    } = this.props;

    switch (phase) {
      case PHASE_PEEK:
      case PHASE_PEEKING:
        return (
          <PeekPhaseModalContent
            phase={phase}
            updateGame={updateGame}
            launchRound={launchRound}
          />
        );
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
    const {isDealt, gameStatus, currentCard, showGameSummary} = this.props;
    const {slapping, swapping, calling} = this.state;

    if (!isDealt) {
      return (
        <DefaultButton onPress={this.dealCardsHandler}>deal</DefaultButton>
      );
    } else if (gameStatus === GAME_STATUS_POST_GAME) {
      return this.setEndGameContent();
    } else if (slapping || swapping) {
      return (
        <SlapSwapModalContent
          actionType={slapping ? CARD_ACTION_SLAP : CARD_ACTION_SWAP}
          toggleState={() =>
            toggleBooleanStateHandler(this, slapping ? 'slapping' : 'swapping')
          }
        />
      );
    } else if (currentCard) {
      return (
        <PlayerActionModalContent
          swapHandler={() => toggleBooleanStateHandler(this, 'swapping')}
          slapHandler={() => toggleBooleanStateHandler(this, 'slapping')}
        />
      );
    } else if (calling) {
      return (
        <CallingModalContent
          call={showGameSummary}
          cancel={() => toggleBooleanStateHandler(this, 'calling')}
        />
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
