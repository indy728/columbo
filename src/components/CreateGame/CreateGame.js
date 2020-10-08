import React from 'react';
import { DefaultButton, DefaultForm } from 'components/UI';

const CreateGame = ({ createGameHandler, disabled, toggleModal }) => (
  <DefaultForm>
    <DefaultButton
      onPress={createGameHandler}
      disabled={disabled}
    >
      launch game
    </DefaultButton>
    <DefaultButton
      onPress={toggleModal}
    >
      cancel
    </DefaultButton>
  </DefaultForm>
);

export default CreateGame;
