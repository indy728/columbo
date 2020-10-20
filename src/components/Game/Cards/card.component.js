import React from 'react';
import styled from 'styled-components';
import {SelectedCardOverlay, CardImage} from './cards.ui';

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 2%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Card = ({pressed, selected, source}) => {
  return (
    <Wrapper onPress={pressed}>
      <SelectedCardOverlay selected={selected} />
      <CardImage source={source} resizeMode="cover" />
    </Wrapper>
  );
};

export default Card;
