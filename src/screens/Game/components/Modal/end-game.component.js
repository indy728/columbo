import React from 'react';
import {GameScore} from './components';
import {CARD_ACTION_TAPPED} from 'constants';
import {PlayerHand} from '../Player';
import {ActionButton} from 'components/UI';

const EndGameModalContent = ({endRound, hand}) => {
  return (
    <>
      <GameScore />
      <PlayerHand cardAction={CARD_ACTION_TAPPED} />
      <ActionButton onPress={null}>next game</ActionButton>
      <ActionButton onPress={null}>restart</ActionButton>
      <ActionButton onPress={null}>quit</ActionButton>
    </>
  );
};

export default EndGameModalContent;
