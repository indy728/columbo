import * as actions from './actionTypes'
import * as storeVariables from '../storeVariables'

const player = {
    username: '',
    hand: [],
    totalPoints: 0,
}

export const initPlayers = playerCount => {
    const players = []

    for (let i = 0; i < playerCount; i++) {
        let newPlayer = { 
            [i]: { ...player }
        }

        players.push({ ...player })
    }

    return {
        type: actions.INIT_PLAYERS,
        playerCount,
        players
    }
}

export const initPlayer = username => {
    return {
        type: actions.INIT_PLAYER,
        username
    }
}

export const addCard = (card, id) => {
    return {
        type: actions.ADD_CARD,
        card,
        id
    }
}

export const dealCards = (deck, player) => {
    return {
        type: actions.DEAL_CARD,
        pile: storeVariables.DRAW_PILE,
        deck,
        player,
    }
}

export const updateHand = (hand, id) => {
    return {
        type: actions.UPDATE_HAND,
        hand,
        id
    }
}

export const initGame = lobbyID => {
    return {
        type: actions.SET_LOBBY_ID,
        lobbyID
    }
}