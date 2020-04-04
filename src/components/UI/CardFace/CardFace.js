import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    padding: 3px;
    background-color: whitesmoke;
    position: absolute;
    top: 0;
    left: 0;
`

const CardFace = props => {

    return (
        <Wrapper
            {...props}>
            <Text>{props.card.props.cardDetails.value}</Text>
            <Text>{props.card.props.cardDetails.suit}</Text>
            <Text>{props.card.props.cardDetails.action}</Text>
        </Wrapper>
    )
}

export default CardFace;
