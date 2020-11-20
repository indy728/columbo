import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.TextInput`
  height: 50px;
  width: 240px;
  border: 2px solid grey;
  background-color: white;
`;

const FormInput = (props) => {
  return <Wrapper {...props} />;
};

export default FormInput;
