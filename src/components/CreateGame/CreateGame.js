import React from 'react';
import {DefaultButton, DefaultForm} from 'components/UI';

const CreateGame = ({createGameHandler, toggleModal}) => (
  <DefaultForm>
    <DefaultButton onPress={createGameHandler}>launch game</DefaultButton>
    <DefaultButton onPress={toggleModal}>cancel</DefaultButton>
  </DefaultForm>
);

export default CreateGame;
