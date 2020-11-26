import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {ActionButton} from 'components/UI';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
`;

const CardActions = ({slap}) => {
  const slappable = useSelector(({game}) => game.slappable);

  return (
    <Wrapper>
      <ActionButton disabled={!slappable} width={'160px'} onPress={slap}>
        Slap
      </ActionButton>
      <ActionButton disabled width={'160px'}>
        Action
      </ActionButton>
    </Wrapper>
  );
};

export default CardActions;
