import * as actions from './actionTypes'
import * as storeVariables from '../storeVariables'

export const setLobbyID = lobbyID => {
    return {
        type: actions.SET_LOBBY_ID,
        lobbyID
    }
}

export const initDeck = () => {
    let drawPile = []

    suits.forEach(suit => {
        drawPile = drawPile.concat(initCards(suit))
    })

    const deck = shuffleCards(drawPile)

    return {
        type: actions.INIT_DECK,
        deck
    }
}

export const drawCard = pile => {
    return {
        type: actions.DRAW_CARD,
        pile,
        phase: storeVariables.PHASE_PLAY
    }
}

export const playCard = card => {
    return {
        type: actions.PLAY_CARD,
        card,
        phase: storeVariables.PHASE_DRAW
    }
}

export const updateDeck = drawPile => {
    return { 
        type: actions.UPDATE_DECK,
        drawPile
    }
}

export const rebuildDrawPileFromDiscardPile = discardPile => {
    return {
        type: actions.REBUILD_DECK,
        drawPile: shuffleCards(discardPile)
    }
}

const suits = [
    'spades',
    'hearts',
    'diamonds',
    'clubs',
]

const cardValues = [
    'ace', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', 'jack', 'queen', 'king'
]

const initCards = suit => {

    const makeCardObj = (value, points, suit, action) => {
        return (
            {value, points, suit, action}
            // <Card cardDetails={{value, points, suit, action}} />
            )
    }

    const cards = []
    for (let i in cardValues) {
        const thisCard = {}
        switch (cardValues[i]) {
            case '7':
            case '8':
                thisCard = makeCardObj(cardValues[i], +i + 1, suit, 'look at somone\'s')
                break
            case '9':
            case '10':
                thisCard = makeCardObj(cardValues[i], +i + 1, suit, 'look at your own')
                break
            case 'jack':
                thisCard = makeCardObj(cardValues[i], 11, suit, 'blind swap')
                break
            case 'queen':
                thisCard = makeCardObj(cardValues[i], 12, suit, 'look and swap')
                break
            case 'king':
                thisCard = makeCardObj(cardValues[i], suit === 'hearts' ? -1 : 13, suit, 'none')
                break
            default:
                thisCard = makeCardObj(cardValues[i], +i + 1, suit, 'none')
                break
        }
        cards.push(thisCard)
    }
    return cards
}

const shuffleCards = deck => {
    const dup = [...deck]

    for (let i = dup.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = dup[i]
        dup[i] = dup[j]
        dup[j] = temp
    }

    return dup
}