import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components';

const Wrapper = styled.Modal`
  /* height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    align-items: center;
    justify-content: center; */
`;

const DefaultModal = (props) => {
  return <Wrapper {...props} animationType="slide" />;
};

export default DefaultModal;
