import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.View`
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    display: ${props => props.visible ? "flex" : "none"};
    z-index: 999;
    align-items: center;
    justify-content: center;
`

const Modal = props => {
    return (
        <Wrapper {...props} />
    )
}

export default Modal