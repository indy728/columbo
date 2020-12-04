import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.TouchableOpacity`
  width: ${({width = '300px'}) => width};
  max-width: ${({maxWidth = '100%'}) => maxWidth};
  height: 50px;
  margin: ${({margin = '0'}) => margin};
  margin-top: ${({mt = '0'}) => mt};
  margin-left: ${({ml = '0'}) => ml};
  border-radius: ${({radius = '10px'}) => radius};
  background-color: ${({
    disabled,
    theme: {
      palette: {button, disabled: disabledBackground},
    },
  }) => {
    return disabled ? disabledBackground : button.default.background[0];
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

const DefaultButton = ({
  hidden,
  disabled,
  children,
  onPress,
  width,
  mt,
  ...props
}) => {
  const buttonProps = {hidden, disabled, onPress, width, mt};
  const textProps = {disabled, children};

  return (
    <ButtonWrapper {...buttonProps}>
      <TextWrapper {...textProps} />
    </ButtonWrapper>
  );
};

export default DefaultButton;
