import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.TouchableOpacity`
  width: ${({width}) => (width ? width : '175px')};
  height: 50px;
  margin: 10px 0;
  border-radius: 10px;
  background-color: ${({
    disabled,
    theme: {
      palette: {button},
    },
    color = 'default',
  }) => {
    return disabled ? button[color].background[1] : button[color].background[0];
  }};
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.Text`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({
    disabled,
    theme: {
      palette: {button},
    },
    color = 'default',
  }) => {
    return disabled ? button[color].text[1] : button[color].text[0];
  }};
`;

export const ActionButton = (props) => {
  const {hidden, disabled, children, onPress, styleProps} = props;
  const buttonProps = {hidden, disabled, onPress, ...styleProps};
  const textProps = {disabled, children};

  return (
    <ButtonWrapper {...buttonProps}>
      <TextWrapper {...textProps} />
    </ButtonWrapper>
  );
};

export const ActionButtonsWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 40px;
  justify-content: space-evenly;
  margin-bottom: -10px;
`;
