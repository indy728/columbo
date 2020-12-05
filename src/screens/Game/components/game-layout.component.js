import React from 'react';
import styled from 'styled-components';
import {Footer} from './Layout';
import {Deck} from './Deck';
import {Player} from '../components/Player';
import {CallButton, CardActions} from './Actions';

const Wrapper = styled.View`
  flex: 1;
  padding-top: 32px;
  background-color: ${({
    theme: {
      palette: {grayscale},
    },
  }) => grayscale[2]};
`;

const DeckAndDiscardWrapper = styled.View`
  flex: 2;
`;

const PlayerActionsWrapper = styled.View`
  height: 110px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex: 1;
`;

const CallWrapper = styled(PlayerActionsWrapper)``;

const HandWrapper = styled.View`
  flex: 3;
`;

const GameLayout = ({setAction}) => (
  <Wrapper>
    <DeckAndDiscardWrapper>
      <Deck />
    </DeckAndDiscardWrapper>
    <PlayerActionsWrapper>
      <CardActions slap={() => setAction('slapping', true)} />
    </PlayerActionsWrapper>
    <HandWrapper>
      <Player />
    </HandWrapper>
    <CallWrapper>
      <CallButton call={() => setAction('calling', true)} />
    </CallWrapper>
    <Footer />
  </Wrapper>
);

export default GameLayout;
