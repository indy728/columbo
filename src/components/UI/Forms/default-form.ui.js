import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.ScrollView`
  padding: 20px 10px;
  flex-grow: ${({flexGrow = '0'}) => flexGrow};
  max-width: ${({maxWidth = '100%'}) => maxWidth};
  border: 2px solid ${({theme}) => theme.palette.grayscale[1]};
  background-color: ${({theme}) => theme.palette.grayscale[4]};
  /* align-items: center; */
  align-self: center;
`;

const DefaultForm = (props) => {
  return <Wrapper {...props} />;
};

export default DefaultForm;
