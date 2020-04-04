import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.View`
    width: 80px;
    height: 140px;
    border: solid 1px black;
`

const Card = props => {
    

    return (
        <Wrapper>
            <Text>{props.cardDetails.value}</Text>
            <Text>{props.cardDetails.suit}</Text>
            <Text>{props.cardDetails.action}</Text>
            <Text>{props.cardDetails.points}</Text>
        </Wrapper>
    )
}

export default Card;
