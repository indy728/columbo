import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'

const ButtonWrapper = styled.TouchableOpacity`
    width: ${({width}) => width ? width + "px" : "175px"};
    height: 50px;
    margin: 10px 0;
    border-radius: 10px;
    background-color: ${props => {
        return ( props.disabled ?
            props.theme.palette.button.action.active : 
            props.theme.palette.button.action.disabled
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
    color: ${props => props.theme.palette.white[0]};
`

const actionButton = props => {
    const { hidden, disabled, children, onPress, width } = props
    const buttonProps = { hidden, disabled, onPress, width }
    const textProps = { disabled, children }

    return (
        <ButtonWrapper { ...buttonProps }>
            <TextWrapper { ...textProps } />
        </ButtonWrapper>
    )
}

export default actionButton