import * as actions from '../actions/actionTypes'
import { updateObject } from '../../shared/objectUtility'

const initialState = {
    lobbyID: '',
    drawPile: [],
    discardPile: [],
    deckBuilt: false,
    currentCard: null,
    currentPhase: 'draw',
}

const setLobbyID = (state, action) => {
    return updateObject(state, { lobbyID: action.lobbyID });
}

const initDeck = (state, action) => {
    return updateObject(state, { 
        drawPile: action.deck,
        discardPile: [],
        deckBuilt: true
     })
}

const updatePhase = (state, action) => {
    return updateObject(state, { currentPhase: action.phase })
}

const drawCard = (state, action) => {
    if (state.currentPhase !== 'draw') return state

    const { pile } = action
    const { drawPile, discardPile, currentCard } = state
    let switchPile = drawPile
    
    if (pile !== 'draw-pile') {
        if (!discardPile.length) return state
        switchPile = discardPile
    }

    return updateObject(state, { 
        [pile]: switchPile,
        currentCard: switchPile.shift(),
        currentPhase: 'play'
    })
}

const playCard = (state, action) => {
    if (state.currentPhase !== 'play') return state

    const { discardPile } = state
    
    discardPile.unshift(action.card)
    return updateObject(state, {
        discardPile,
        currentCard: null,
        currentPhase: 'draw'
    })
}

const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.SET_LOBBY_ID: return setLobbyID(state, action)
        case actions.INIT_DECK: return initDeck(state, action)
        case actions.DRAW_CARD: return drawCard(state, action)
        case actions.PLAY_CARD: return playCard(state, action)
        default: return state
    }
}

export default gameReducer;