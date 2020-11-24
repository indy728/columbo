import React from 'react';
import styled from 'styled-components';
import {DefaultButton, DefaultForm} from 'components/UI';
import {SETTINGS_SCREEN} from 'constants';

const TEXT_LAUNCH_BUTTON = 'launch game';
const TEXT_CANCEL_BUTTON = 'cancel';
const TEXT_SETTINGS = 'settings';

const Wrapper = styled.View`
  height: 300px;
`;

export default ({createGameHandler, toggleModal, navigation}) => (
  <DefaultForm>
    <DefaultButton onPress={() => navigation.navigate(SETTINGS_SCREEN)}>
      {TEXT_SETTINGS}
    </DefaultButton>
    <DefaultButton onPress={createGameHandler}>
      {TEXT_LAUNCH_BUTTON}
    </DefaultButton>
    <DefaultButton onPress={toggleModal}>{TEXT_CANCEL_BUTTON}</DefaultButton>
  </DefaultForm>
);
