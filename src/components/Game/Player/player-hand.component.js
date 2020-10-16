import React from 'react';
import {useSelector} from 'react-redux';
import {getCardDisplay, HandColumnWrapper, PlayerCardWrapper} from '../Cards';
import styled from 'styled-components';

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
`;

export default ({pressed = null, cardAction = '', selected = false}) => {
  const hand = useSelector((state) => state.player.hand);

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
                <PlayerCardWrapper key={key} index={j} rows={hand.length}>
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
