import * as actions from './actionTypes'

export const setLobbyID = lobbyID => {
    return {
        type: actions.SET_LOBBY_ID,
        lobbyID
    }
}

export const initDeck = deck => {
    return {
        type: actions.INIT_DECK,
        deck
    }
}

export const updatePhase = phase => {
    return {
        type: actions.UPDATE_PHASE,
        phase
    }
}

export const drawCard = pile => {
    return {
        type: actions.DRAW_CARD,
        pile
    }
}

export const playCard = card => {
    return {
        type: actions.PLAY_CARD,
        card
    }
}