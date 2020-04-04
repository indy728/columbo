import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.View`
    width: 33%;
    height: 66%;
    border: 1px solid black;
    position: relative;
`

const CardBack = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    padding: 3px;
    background-color: lightgreen;
    position: absolute;
    top: 0;
    left: 0;
`

const Pile = props => {
    const renderPile = [] 
    const CardComponent = props.cardComponent
    
    props.pile.forEach((card, i) => {
        const { value, suit } = card.props.cardDetails

        renderPile.push(
            <CardComponent
                key={value + suit}
                onPress={props.pressed}
                card={card}
                index={i}
                >
            </CardComponent>
        )
    })

    return (
        <Wrapper>
            {renderPile}
        </Wrapper>
    )
}

export default Pile
