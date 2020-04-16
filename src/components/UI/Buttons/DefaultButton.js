import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'

const ButtonWrapper = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    margin: 10px 0;
    border-radius: 10px;
    background-color: ${props => {
        return ( props.disabled ?
            props.theme.palette.primary[3]: 
            props.theme.palette.primary[1]
        )}
    };
    display: ${props => props.hidden ? "none" : "flex"};
    align-items: center;
    justify-content: center;
`

const TextWrapper = styled.Text`
    font-size: 20px;
    /* font-weight: 500; */
    text-transform: uppercase;
    color: ${props => {
        return ( props.disabled ?
            props.theme.palette.grayscale[1]: 
            props.theme.palette.white[0]
        )}
    };
`

const defaultButton = props => {
    const { hidden, disabled, children, className, onPress } = props
    const buttonProps = { hidden, disabled, className, onPress }
    const textProps = { disabled, children }

    return (
        <ButtonWrapper { ...buttonProps }>
            <TextWrapper { ...textProps } />
        </ButtonWrapper>
    )
}

export default defaultButton