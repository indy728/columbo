import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import Card from '../Card/Card'
import cardImg from '@assets/cardImg'


const Wrapper = styled.View`
    width: 93px;
    height: 132px;
    border: 1px solid black;
    position: relative;
    transform: rotate(270deg);
`

const Pile = props => {
    const renderPile = [] 
    let cardSource = cardImg.back
    
    props.pile.forEach((card, i) => {
        const { value, suit } = card
        if (props.face) {
            cardSource = cardImg[suit][value]
        }

        renderPile.unshift(
            <Card
                key={value + suit}
                onPress={props.pressed}
                source={cardSource}
                >
            </Card>
        )
    })

    return (
        <Wrapper>
            {renderPile}
        </Wrapper>
    )
}

export default Pile
