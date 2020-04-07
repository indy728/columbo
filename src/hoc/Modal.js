import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.View`
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    display: ${props => props.visible ? "flex" : "none"};
`

const Modal = props => {
    return (
        <Wrapper {...props} />
    )
}

export default Modal