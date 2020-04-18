import React from 'react'
import { View, Text } from 'react-native'
import Card from '../../Deck/Card/Card'
import styled from 'styled-components'
import cardImg from '@assets/cardImg'
import { matchArrayInArray } from '@shared/utilityFunctions'
import * as storeVariables from '@store/storeVariables'

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

const swapPhaseCard = pressed => {
    return (
        <Card
            source={cardImg.back}
            onPress={pressed}
            />
    )
}

const peekPhaseCard = (pressed, selected, cardCoordinates) => {
    console.log('[PlayerHand] matchArrayInArray(selected, cardCoordinates): ', matchArrayInArray(selected, cardCoordinates))
    const isSelected = matchArrayInArray(selected, cardCoordinates) !== -1

    return (
        <Card
            selected={isSelected}
            // source={cardImg.back}
            source={null}
            onPress={pressed}
            />
    )
}


const playerHand = props => {
    const { hand, pressed, cardAction, selected } = props
    let columns = []
    for (let column in hand) {
        let cards = []
        for (let card in hand[column]) {
            let cardObj = hand[column][card]
            let key = "column" + column + "card" + card
            let cardDisplay = null
            
            if (cardObj) {
                const { value, suit } = cardObj
                
                key = value + suit
                // source = cardImg[suit][value]
                switch(cardAction) {
                    // source = cardImg[suit][value]
                    case storeVariables.CARD_ACTION_SWAP:
                        cardDisplay = swapPhaseCard(() => pressed([column, card]))
                        break
                    case storeVariables.CARD_ACTION_PEEK:
                        console.log('[PlayerHand] selected: ', selected)

                        cardDisplay = peekPhaseCard(() => pressed([column, card]), selected, [column, card])
                        break
                    default:
                        cardDisplay = <Card source={cardImg.back} />
                        break
                }
            }
            cards.push(
                <PlayerCardWrapper
                    key={key}
                    >
                    {cardDisplay}
                    {/* <Card 
                        source={source}
                        onPress={}
                        /> */}
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