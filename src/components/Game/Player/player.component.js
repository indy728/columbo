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
`;

export default () => {
  const isDealt = useSelector((state) => state.game.isDealt);

  return (
    <Wrapper>
      {isDealt && <PlayerHand hand={this.props.player.hand} pressed={null} />}
      <TapButtonWrapper>
        <ActionButton onPress={this.props.tappingHandler}>tap</ActionButton>
      </TapButtonWrapper>
    </Wrapper>
  );
};
