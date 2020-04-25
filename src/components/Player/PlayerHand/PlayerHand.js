import React from 'react'
import { View, Text } from 'react-native'
import Card from '../../Cards/Card/Card'
import styled from 'styled-components'
import cardImg from '@assets/cardImg'
import { matchArrayInArray } from '@shared/utilityFunctions'
import * as storeVariables from '@store/storeVariables'

const Wrapper = styled.View`
    /* height: 90%; */
    /* border: 1px dashed grey; */
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: center;
`

const cardDimensionByRowCount = (rows, length) => {
    let dimension = length

    if (rows > 3) dimension *= Math.pow(.87, (rows - 3))
    return dimension + "px"
}

const cardMarginsByRowCount = (rows, index, length) => {
    let margin = length

    if (index == 0) return 0
    if (rows > 3) margin *= Math.pow(.87, (rows - 3))
    return margin + "px"
}

const PlayerCardWrapper = styled.View`
    width: ${({ rows }) => cardDimensionByRowCount(rows, storeVariables.CARD_PIXEL_WIDTH * storeVariables.CARD_SIZE_HAND_MULTIPLIER)};
    height: ${({ rows }) => cardDimensionByRowCount(rows, storeVariables.CARD_PIXEL_HEIGHT * storeVariables.CARD_SIZE_HAND_MULTIPLIER)};
    margin-top: ${({ rows, index }) => cardMarginsByRowCount(rows, index, 35)};
    background-color: ${({ theme }) => theme.palette.grayscale[4]};
    shadow-opacity: ${({ children }) => children ? storeVariables.SINGLE_CARD_SHADOW_OPACITY : 0};
`

const HandColumnWrapper = styled.View`
    margin-left: ${({ rows, index }) => cardMarginsByRowCount(rows, index, 20)};
`

const swapPhaseCard = pressed => {
    return (
        <Card
            source={cardImg.back}
            onPress={pressed}
            />
    )
}

const peekPhaseCard = (pressed, selected, cardCoordinates, imgSource) => {
    let isSelected = matchArrayInArray(selected, cardCoordinates) !== -1
    let source = cardImg.back

    if (!pressed) {
        if (isSelected) {
            source = imgSource
        }
        isSelected = false
    }
    
    return (
        <Card
            selected={isSelected}
            source={source}
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
                const source = cardImg[suit][value]
                switch(cardAction) {
                    // source = cardImg[suit][value]
                    case storeVariables.CARD_ACTION_SWAP:
                    case storeVariables.CARD_ACTION_SLAP:
                        cardDisplay = swapPhaseCard(() => pressed([column, card]))
                        break
                    case storeVariables.CARD_ACTION_PEEK_SELECT:
                        cardDisplay = peekPhaseCard(() => pressed([column, card]), selected, [column, card])
                        break
                    case storeVariables.CARD_ACTION_PEEKING:
                        cardDisplay = peekPhaseCard(null, selected, [column, card], source)
                        break
                    case storeVariables.CARD_ACTION_TAPPED:
                        cardDisplay = <Card source={source} />
                        break
                    default:
                        cardDisplay = <Card source={cardImg.back} />
                        break
                }
            }
            cards.push(
                <PlayerCardWrapper
                    key={key}
                    index={card}
                    rows={hand.length}
                    >
                    {cardDisplay}
                </PlayerCardWrapper>
            )
        }
        columns.push(
            <HandColumnWrapper
                key={"column" + column}
                index={column}
                rows={hand.length}
                >
                {cards}
            </HandColumnWrapper>)
    }

    return (
        <Wrapper>
            {columns}
        </Wrapper>
    )
}

export default playerHand