import React from 'react';
import styled from 'styled-components';
import Pile from './pile.component';
import {DISCARD_PILE, DRAW_PILE} from 'constants';

const Wrapper = styled.View`
  flex: 1.5;
  flex-flow: row;
  align-items: center;
  justify-content: space-evenly;
  /* max-width: 450px; */
`;

const Deck = () => {
  return (
    <Wrapper>
      <Pile pile={DRAW_PILE} />
      <Pile face pile={DISCARD_PILE} />
    </Wrapper>
  );
};
export default Deck;
