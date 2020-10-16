import React from 'react';
import {DefaultButton, DefaultForm} from 'components/UI';

const TEXT_LAUNCH_BUTTON = 'launch game';
const TEXT_CANCEL_BUTTON = 'cancel';

export default ({createGameHandler, toggleModal}) => (
  <DefaultForm>
    <DefaultButton onPress={createGameHandler}>
      {TEXT_LAUNCH_BUTTON}
    </DefaultButton>
    <DefaultButton onPress={toggleModal}>{TEXT_CANCEL_BUTTON}</DefaultButton>
  </DefaultForm>
);
