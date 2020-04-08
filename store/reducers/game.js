import * as actions from '../actions/actionTypes'
import * as storeVariables from '../storeVariables'
import { updateObject } from '../../shared/objectUtility'

const initialState = {
    lobbyID: '',
    phase: storeVariables.PHASE_DRAW,
    playerCount: 0,
    players: []
}

const setLobbyID = (state, action) => {
    return updateObject(state, { lobbyID: action.lobbyID })
}

const updatePhase = (state, action) => {
    return updateObject(state, { phase: action.phase })
}

const initPlayers = (state, action) => {
    return updateObject(state, {
        playerCount: action.playerCount,
        players: action.players
    })
}

const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.SET_LOBBY_ID: return setLobbyID(state, action)
        case actions.DRAW_CARD: 
        case actions.PLAY_CARD: return updatePhase(state, action)
        case actions.INIT_PLAYERS: return initPlayers(state, action)
        default: return state
    }
}

export default gameReducer;