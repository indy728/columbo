import React from 'react'
import { updateObject } from '../../../../shared/objectUtility'
import Card from '../Card/Card'

export const initCards = ( suit ) => {
    let cards = []
    const listCards = [
        'A', '2', '3', '4', '5', '6', '7', '8', '9',
        '10', 'J', 'Q', 'K'
    ]

    const makeCardObj = (value, points, suit, action) => {
        return (
            <Card cardDetails={{value, points, suit, action}} />
        )
    }

    for (let i in listCards) {
        let thisCard = {}
        switch (listCards[i]) {
            case '7':
            case '8':
                thisCard = makeCardObj(listCards[i], +i + 1, suit, 'look at somone\'s')
                break
            case '9':
            case '10':
                thisCard = makeCardObj(listCards[i], +i + 1, suit, 'look at your own')
                break
            case 'J':
                thisCard = makeCardObj(listCards[i], 11, suit, 'blind swap')
                break
            case 'Q':
                thisCard = makeCardObj(listCards[i], 12, suit, 'look and swap')
                break
            case 'K':
                thisCard = makeCardObj(listCards[i], suit === 'hearts' ? -1 : 13, suit, 'none')
                break
            default:
                thisCard = makeCardObj(listCards[i], +i + 1, suit, 'none')
                break
        }
        cards.push(thisCard)
    }

    return cards
}

export const shuffleCards = deck => {
    const dup = [...deck]

    for (let i = dup.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = dup[i]
        dup[i] = dup[j]
        dup[j] = temp
    }

    return dup
}