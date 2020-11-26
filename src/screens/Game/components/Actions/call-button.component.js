import React from 'react';
import {ActionButton} from 'components/UI';

const CallButton = ({call}) => (
  <ActionButton onPress={call}>Calling It</ActionButton>
);

export default CallButton;
