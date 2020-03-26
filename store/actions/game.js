import * as actions from './actionTypes'

export const setLobbyID = (lobbyID) => {
    return {
        type: actions.SET_LOBBY_ID,
        lobbyID
    }
}