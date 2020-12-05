/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components';
import {ActionButton} from 'components/UI';
import {ModalContentWrapper, ModalButtonsWrapper} from './styles';

const ModalTextWrapper = styled.View``;
const ModalText = styled.Text``;

const CallingModalContent = ({call, cancel}) => {
  const buttons = [
    {
      text: 'call it',
      action: () => {
        call();
        cancel();
      },
      color: 'blue',
    },
    {
      text: 'cancel',
      action: cancel,
      color: 'red',
    },
  ];
  return (
    <ModalContentWrapper>
      <ModalTextWrapper>
        <ModalText>Are you sure?</ModalText>
      </ModalTextWrapper>
      <ModalButtonsWrapper>
        {buttons.map(({text, action, color}) => (
          <ActionButton
            key={text}
            onPress={action}
            styleProps={{
              width: '175px',
              color,
            }}>
            {text}
          </ActionButton>
        ))}
      </ModalButtonsWrapper>
    </ModalContentWrapper>
  );
};

export default CallingModalContent;
