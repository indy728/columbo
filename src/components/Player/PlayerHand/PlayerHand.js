import React from 'react'
import { View, Text } from 'react-native'
import Card from '../../Deck/Card/Card'
import styled from 'styled-components'
import cardImg from '@assets/cardImg'

const PlayerHandWrapper = styled.View`
    width: 100%;
    height: 90%;
    background-color: grey;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: center;

`

const PlayerCardWrapper = styled.View`
    width: 62px;
    margin: 0 10%;
    height: 88px;
    border: 2px dashed black;

`

const HandColumnWrapper = styled.View`
    width: 80px;
    height: 300px;
    border: 2px dashed red;
    margin-left: ${props => props.index > 0 ? '40px' : 0};
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    
`

const playerHand = props => {
    console.log(props.pressed)
    const { hand, pressed } = props
    if (pressed === 'undefined') pressed = null
    let columns = []
    for (let column in hand) {
        let cards = []
        for (let card in hand[column]) {
            let cardObj = hand[column][card]
            let key = "column" + column + "card" + card
            let source = cardImg.back

            if (cardObj) {
                const { value, suit } = cardObj
                key = value + suit
                source = cardImg[suit][value]
            } 
            cards.push(
                <PlayerCardWrapper
                    key={key}
                    >
                    <Card 
                        source={source}
                        onPress={() => props.pressed([column, card])}
                        />
                </PlayerCardWrapper>
            )
        }
        columns.push(
            <HandColumnWrapper
                key={"column" + column}
                index={column}
                >
                {cards}
            </HandColumnWrapper>)
    }

    return (
        <PlayerHandWrapper>
            {columns}
        </PlayerHandWrapper>
    )
}

export default playerHand