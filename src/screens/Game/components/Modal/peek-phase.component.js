import React, {useState} from 'react';
import {
  ModalCardsWrapper,
  ModalButtonsWrapper,
  ModalContentWrapper,
} from './styles';
import {PlayerHand} from '../Player';
import {DefaultButton} from 'components/UI';
import {matchArrayInArray} from 'util';
import {
  CARD_ACTION_PEEKING,
  CARD_ACTION_PEEK_SELECT,
  PHASE_PEEKING,
} from 'constants';

const peekCardsHandler = (handCoordinates, selected) => {
  const index = matchArrayInArray(selected, handCoordinates);

  if (index === -1) {
    if (selected.length === 2) {
      return selected;
    }
    selected.unshift(handCoordinates);
  } else {
    selected.splice(index, 1);
  }

  return selected;
};

const PeekPhaseModal = ({phase, updateGame, launchRound}) => {
  const [selected, setSelected] = useState([]);
  let buttonPressed = () => updateGame({phase: PHASE_PEEKING});
  let peekButtonText = 'reveal';
  let action = CARD_ACTION_PEEK_SELECT;

  if (phase === PHASE_PEEKING) {
    buttonPressed = () => {
      setSelected([]);
      launchRound();
    };
    peekButtonText = 'ready';
    action = CARD_ACTION_PEEKING;
  }

  return (
    <ModalContentWrapper>
      <ModalCardsWrapper>
        <PlayerHand
          selected={selected}
          pressed={(handCoordinates) =>
            setSelected(peekCardsHandler(handCoordinates, [...selected]))
          }
          cardAction={action}
        />
      </ModalCardsWrapper>
      <ModalButtonsWrapper>
        <DefaultButton
          width="200px"
          onPress={buttonPressed}
          disabled={selected.length !== 2}>
          {peekButtonText}
        </DefaultButton>
      </ModalButtonsWrapper>
    </ModalContentWrapper>
  );
};

export default PeekPhaseModal;
