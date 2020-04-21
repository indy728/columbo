import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import Card from '../Card/Card'
import cardImg from '@assets/cardImg'


const Wrapper = styled.View`
    width: 93px;
    height: 132px;
    background-color: ${({ theme }) => theme.palette.emptyCardSlot};
    /* shadow-color: #000; */
    shadow-opacity: ${({length}) => (0.8 * (length / 36))};
    /* shadow-radius: 2px; */
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
                />
        )
    })

    return (
        <Wrapper
            length={props.pile.length}>
            {renderPile}
        </Wrapper>
    )
}

export default Pile
