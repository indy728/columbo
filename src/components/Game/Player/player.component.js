import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import PlayerHand from './player-hand.component';
import {ActionButton} from 'components/UI';

const Wrapper = styled.View`
  flex: 4;
  align-items: center;
  justify-content: space-around;
  position: relative;
`;

const TapButtonWrapper = styled.View`
  /* position: absolute;
    bottom: 0px;
    left: 10px; */
  flex: 3;
  justify-content: center;
`;
const HandWrapper = styled.View`
  flex: 7;
  align-items: center;
  justify-content: center;
`;

const Player = ({tappingHandler}) => {
  const isDealt = useSelector((state) => state.game.isDealt);
  const renderHand = (
    <HandWrapper>
      <PlayerHand />
    </HandWrapper>
  );

  return (
    <Wrapper>
      {isDealt && renderHand}
      <TapButtonWrapper>
        <ActionButton onPress={tappingHandler}>tap</ActionButton>
      </TapButtonWrapper>
    </Wrapper>
  );
};

export default Player;
