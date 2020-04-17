import * as actions from '../actions/actionTypes'
import * as storeVariables from '../storeVariables'
import { updateObject } from '../../shared/objectUtility'

const initialState = {
    drawPile: [],
    discardPile: [],
    deckBuilt: false,
    currentCard: null,
}

const initDeck = (state, action) => {
    return updateObject(state, { 
        drawPile: [ ...action.deck ],
        discardPile: [],
        deckBuilt: true
    })
}

const drawCard = (state, action) => {
    const { pile } = action
    const { drawPile, discardPile} = state
    let switchPile = drawPile
    
    if (pile !== storeVariables.DRAW_PILE) {
        if (!discardPile.length) return state
        switchPile = discardPile
    }

    return updateObject(state, { 
        [pile]: switchPile,
        currentCard: switchPile.shift(),
    })
}

const swapCards = (state, action) => {
    let updatedState = updateDeck(state, action)

    updatedState = updateObject(updatedState, { currentCard: null })
    return updateObject(state, updatedState)
}

const updateDeck = (state, action) => {
    const { pile, deck } = action
    const { drawPile, discardPile } = state
    let switchPile = drawPile
    
    if (pile !== storeVariables.DRAW_PILE) {
        if (!discardPile.length) return state
        switchPile = discardPile
    }

    return updateObject(state, { 
        [pile]: deck,
    })
}

const playCard = (state, action) => {
    const { discardPile } = state
    
    discardPile.unshift(action.card)
    return updateObject(state, {
        discardPile,
        currentCard: null,
    })
}

const deckReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.INIT_DECK: return initDeck(state, action)
        case actions.DRAW_CARD: return drawCard(state, action)
        case actions.PLAY_CARD: return playCard(state, action)
        case actions.UPDATE_DECK: return updateDeck(state, action)
        case actions.DEAL_CARD: return updateDeck(state, action)
        case actions.SWAP_CARDS: return swapCards(state, action)
        default: return state
    }
}

export default deckReducer;