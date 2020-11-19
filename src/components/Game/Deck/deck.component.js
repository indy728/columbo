import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import Pile from './pile.component';
import {DISCARD_PILE, DRAW_PILE} from 'constants';

const Wrapper = styled.View`
  flex: 1.5;
  flex-flow: row;
  align-items: center;
  justify-content: space-around;
`;

const Deck = ({drawPile, discardPile, pressed}) => {
  // @TODO: this is the setup for multiplayer. cards cannot be drawn from
  // discard pile in single player
  const discardPileClickedHandler = () => pressed(DISCARD_PILE);
  const singlePlayer = useSelector((store) => store.game.singlePlayer);

  return (
    <Wrapper>
      <Pile face={false} pile={drawPile} pressed={() => pressed(DRAW_PILE)} />
      <Pile
        face={true}
        pile={discardPile}
        pressed={singlePlayer && discardPileClickedHandler}
      />
    </Wrapper>
  );
};

export default Deck;
