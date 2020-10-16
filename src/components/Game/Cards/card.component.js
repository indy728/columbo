import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 2%;
  position: absolute;
  top: 0;
  left: 0;
`;

const SelectedCardOverlay = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 2px;
  left: 1px;
  background-color: rgba(216, 7, 88, 0.3);
  display: ${({selected}) => (selected ? 'flex' : 'none')};
  z-index: 499;
`;

const CardImage = styled.Image`
  flex: 1;
  height: undefined;
  width: undefined;
`;

const Card = (props) => {
  return (
    <Wrapper {...props}>
      <SelectedCardOverlay selected={props.selected} />

      <CardImage source={props.source} resizeMode="cover" />
    </Wrapper>
  );
};

export default Card;
