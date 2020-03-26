import * as actions from '../actions/actionTypes'
import { updateObject } from '../../shared/objectUtility'

const initialState = {
    lobbyID: ''
};

const setLobbyID = (state, action) => {
    return updateObject(state, { lobbyID: action.lobbyID });
}

const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.SET_LOBBY_ID: return setLobbyID(state, action)
        default: return state
    }
}

export default gameReducer;