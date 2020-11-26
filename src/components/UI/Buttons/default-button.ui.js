import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.TouchableOpacity`
  width: ${({width = '350px'}) => width};
  height: 50px;
  margin: ${({margin = '0'}) => margin};
  border-radius: ${({radius = '10px'}) => radius};
  background-color: ${({
    disabled,
    theme: {
      palette: {button},
    },
  }) => {
    return disabled
      ? button.default.background[1]
      : button.default.background[0];
  }};
  display: ${({hidden}) => (hidden ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.Text`
  font-size: 20px;
  text-transform: uppercase;
  color: ${({
    disabled,
    theme: {
      palette: {button},
    },
  }) => {
    return disabled ? button.default.text[1] : button.default.text[0];
  }};
`;

const DefaultButton = ({hidden, disabled, children, onPress, width}) => {
  const buttonProps = {hidden, disabled, onPress, width};
  const textProps = {disabled, children};

  return (
    <ButtonWrapper {...buttonProps}>
      <TextWrapper {...textProps} />
    </ButtonWrapper>
  );
};

export default DefaultButton;
