import React from 'react'
import Card from '../Card/Card'
import styled from 'styled-components'
import { updateObject } from '../../../../shared/objectUtility'

const initCards = (list, suit) => {
    let cards = {}

    const makeCardObj = (card, value, points, suit, action) => {
        return updateObject(card, {
            [value]: {
            value,
            points,
            suit,
            action
        }})
    }

    for (let i in list) {
        let thisCard = {}
        switch (list[i]) {
            case '7':
            case '8':
                thisCard = makeCardObj(thisCard, list[i], +i + 1, suit, 'look at somone\'s')
                break
            case '9':
            case '10':
                thisCard = makeCardObj(thisCard, list[i], +i + 1, suit, 'look at your own')
                break
            case 'J':
                thisCard = makeCardObj(thisCard, list[i], 11, suit, 'blind swap')
                break
            case 'Q':
                thisCard = makeCardObj(thisCard, list[i], 12, suit, 'look and swap')
                break
            case 'K':
                thisCard = makeCardObj(thisCard, list[i], suit === 'hearts' ? -1 : 13, suit, 'none')
                break
            default:
                thisCard = makeCardObj(thisCard, list[i], +i + 1, suit, 'none')
                break
        }
        cards = updateObject(cards, thisCard)
    }

    console.log('[Suit] cards: ', cards)
}

const Suit = props => {
    const listCards = [
        'A', '2', '3', '4', '5', '6', '7', '8', '9',
        '10', 'J', 'Q', 'K'
    ]

    // initCards(listCards, 'Spades')
    return (
        <Card />
    )


}

export default Suit