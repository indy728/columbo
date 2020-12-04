import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {GameScore} from './components';
import {CARD_ACTION_TAPPED, HOME_SCREEN} from 'constants';
import {PlayerHand} from '../Player';
import {ActionButton} from 'components/UI';
import {actions} from 'store/slices';
import {initDeck as createDeck} from 'util';

const EndGameModalContent = ({
  endRound,
  hand,
  gamesPerRound,
  rounds,
  quitGame,
}) => {
  const navigation = useNavigation();
  const guitAndGoHome = () => {
    quitGame();
    navigation.navigate(HOME_SCREEN);
  };

  return (
    <>
      <GameScore />
      <PlayerHand cardAction={CARD_ACTION_TAPPED} />
      {gamesPerRound - rounds.length !== 1 && (
        <ActionButton onPress={null}>next game</ActionButton>
      )}
      <ActionButton onPress={quitGame}>restart</ActionButton>
      <ActionButton onPress={guitAndGoHome}>quit</ActionButton>
    </>
  );
};

const mapStateToProps = ({settings, game}) => ({
  gamesPerRound: settings.gamesPerRound,
  rounds: game.player.rounds,
});

const mapDispatchToProps = (dispatch) => ({
  quitGame: () => dispatch(actions.quitGame({initialDeck: createDeck()})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EndGameModalContent);
