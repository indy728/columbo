import * as actions from '../actions/actionTypes'
import * as storeVariables from '../storeVariables'
import { updateObject } from '@shared/utilityFunctions'

const initialState = {
    lobbyID: '',
    launched: false,
    phase: storeVariables.PHASE_PEEK,
    slappable: false,
    playerCount: 0,
    players: {},
    player: {
        id: '',
        username: '',
        position: -1,
        hand: [[null, null]],
        totalPoints: 0
    },
    turns: 0,
    startTime: null,
    endTime: null,
    isDealt: false,
    gameStatus: storeVariables.GAME_STATUS_PRE_DEAL
}

const updateTotalPoints = hand => {
    let points = 0

    for (let column in hand) {
        for (let card in hand[column]) {
            if (hand[column][card]) {
                points += hand[column][card].points
            }
        }
    }

    return points
}

const setLobbyID = (state, action) => {
    return updateObject(state, { lobbyID: action.lobbyID })
}

const dealCards = (state, action) => {
    const { player } = action
    const updatedPlayer = updateObject(player, {
        totalPoints: updateTotalPoints(player.hand)
    })

    return updateObject(state, { isDealt: true, player: updatedPlayer })
}

const updatePlayer = (state, action) => {
    const { player } = action
    let updatedState = { ...state }
    const updatedPlayer = updateObject(player, {
        totalPoints: updateTotalPoints(player.hand)
    })

    action.phase = storeVariables.PHASE_DRAW
    updatedState = updatePhase(state, action)
    updatedState = updateObject(updatedState, { player: updatedPlayer })
    return updateObject(state, updatedState)
}

const slapCard = (state, action) => {
    let updatedState = updatePlayer(state, action)

    updatedState = updateSlappable(updatedState, action)
    return updateObject(state, updatedState)
}

const updateGameStatus = (state, action) => {
    return updateObject(state, {
        gameStatus: action.gameStatus
    })
}

const launchRound = (state, action) => {
    action.gameStatus = storeVariables.GAME_STATUS_TAPPED
    action.phase = storeVariables.PHASE_TAPPED
    let updatedState = updateGameStatus(state, action)
    updatedState = updatePhase(updatedState, action)

    return updateObject(updatedState, { startTime: action.startTime })
}

const endRound = (state, action) => {
    action.gameStatus = storeVariables.GAME_STATUS_LAUNCHED
    action.phase = storeVariables.PHASE_DRAW
    let updatedState = updateGameStatus(state, action)
    updatedState = updatePhase(updatedState, action)

    return updateObject(updatedState, { endTime: action.endTime })
}

const updateSlappable = (state, action) => {
    return updateObject(state, { slappable: action.slappable })
}

const updatePhase = (state, action) => {
    let updatedState = { ...state }
    
    if (action.phase === storeVariables.PHASE_DRAW) updatedState.turns += 1

    updatedState = updateObject(updatedState, {
        slappable: action.phase === storeVariables.PHASE_DRAW && updatedState.phase !== storeVariables.PHASE_PEEK,
        phase: action.phase, 
    })
    return updateObject(state, updatedState)
}

const initPlayers = (state, action) => {
    return updateObject(state, {
        playerCount: action.playerCount,
        players: action.players
    })
}

const initPlayer = (state, action) => {
    return updateObject(state, {
        player: updateObject(state.player, {
            username: action.username
        })
    })
}

const updateHand = (state, action) => {
    const { player } = state

    return updateObject(state, {
        player: updateObject(player, {
            hand: action.hand
        })
    })
}

const addCard = (state, action) => {
    const { players } = state
    const { card, id } = action
    const hand = [ ...players[id].hand ]

    if (!hand.length) {
        hand.push([card, 'empty'])
    } else {
        let i = 0
        while (i < hand.length) {
            if (hand[i][0] === 'empty') {
                hand[i][0] = card
                break;
            } else if (hand[i].length < 2) {
                hand[i].push(card)
                break;
            } else if (hand[i][1] === 'empty') {
                hand[i][0] = card
                break;
            }
            i++
        }
        if (i === hand.length) {
            hand.push([card, 'empty'])
        }
    }

    return updateObject(state, {
        player: updateObject(player, hand)
    })
}

const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.SET_LOBBY_ID: return setLobbyID(state, action)
        case actions.DRAW_CARD: 
        case actions.PLAY_CARD: return updatePhase(state, action)
        case actions.UPDATE_PHASE: return updatePhase(state, action)
        case actions.ADD_CARD: return addCard(state, action)
        case actions.INIT_PLAYERS: return initPlayers(state, action)
        case actions.INIT_PLAYER: return initPlayer(state, action)
        case actions.UPDATE_HAND: return updateHand(state, action)
        case actions.ROUND_LAUNCH: return launchRound(state, action)
        case actions.ROUND_END: return endRound(state, action)
        case actions.DEAL_CARD: return dealCards(state, action)
        case actions.SWAP_CARDS: return updatePlayer(state, action)
        case actions.SLAP_CARDS: return slapCard(state, action)

        default: return state
    }
}

export default gameReducer;