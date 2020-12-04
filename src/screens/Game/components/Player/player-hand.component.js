import React from 'react';
import {useWindowDimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {getCardDisplay, HandColumnWrapper, PlayerCardWrapper} from '../Cards';
import styled from 'styled-components';

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
`;

const PlayerHand = ({pressed = null, cardAction = '', selected = []}) => {
  const hand = useSelector((state) => state.game.player.hand);
  const deviceWidth = useWindowDimensions().width;

  return (
    <Wrapper>
      {hand.map((column, i) => {
        return (
          <HandColumnWrapper key={`column-${i}`} index={i} rows={hand.length}>
            {column.map((card, j) => {
              const key = `${i}-${j}`;
              const cardDisplay = getCardDisplay(
                card,
                cardAction,
                [i, j],
                selected,
                pressed,
              );

              return (
                <PlayerCardWrapper
                  key={key}
                  index={j}
                  rows={hand.length}
                  deviceWidth={deviceWidth}>
                  {cardDisplay}
                </PlayerCardWrapper>
              );
            })}
          </HandColumnWrapper>
        );
      })}
    </Wrapper>
  );
};

export default PlayerHand;
