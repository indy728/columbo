import * as actions from '../actions/actionTypes'
import * as storeVariables from '../storeVariables'
import { updateObject } from '@shared/utilityFunctions'

const getInitialState = () => {
    return {
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
            // totalPoints: 0,
            rounds: []
        },
        round: {
            turns: 0,
            startTime: null,
            endTime: null,
            points: 0
        },
        isDealt: false,
        gameStatus: storeVariables.GAME_STATUS_PRE_DEAL
    }
}

const getPointTotal = hand => {
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
        totalPoints: getPointTotal(player.hand)
    })

    return updateObject(state, { isDealt: true, player: updatedPlayer })
}

const updatePlayer = (state, action) => {
    const { player } = action
    let updatedState = { ...state }
    const updatedPlayer = updateObject(player, {
        totalPoints: getPointTotal(player.hand)
    })

    // action.phase = storeVariables.PHASE_DRAW
    updatedState = updatePhase(state, storeVariables.PHASE_DRAW)
    updatedState = updateObject(updatedState, { player: updatedPlayer })
    return updateObject(state, updatedState)
}

const slapCard = (state, action) => {
    let updatedState = updatePlayer(state, action)

    updatedState = updateSlappable(updatedState, action)
    return updateObject(state, updatedState)
}

const updateGameStatus = (state, gameStatus) => {
    return updateObject(state, { gameStatus })
}

const launchRound = (state, action) => {
    // action.gameStatus = storeVariables.GAME_STATUS_LAUNCHED
    // action.phase = storeVariables.PHASE_DRAW
    let updatedState = updateGameStatus(state, storeVariables.GAME_STATUS_LAUNCHED)
    updatedState = updatePhase(updatedState, storeVariables.PHASE_DRAW)
    const updatedRound = updateObject(updatedState.round, {
        startTime: action.startTime
    })

    return updateObject(updatedState, {
        round: updatedRound
    })
}

const tapRound = (state, action) => {
    // action.gameStatus = storeVariables.GAME_STATUS_TAPPED
    // action.phase = storeVariables.PHASE_TAPPED

    let updatedState = updateGameStatus(state, storeVariables.GAME_STATUS_TAPPED)

    updatedState = updatePhase(updatedState, storeVariables.PHASE_TAPPED)

    const updatedRound = updateObject(updatedState.round, {
        endTime: action.endTime,
        points: getPointTotal(updatedState.player.hand)
    })

    return updateObject(updatedState, { round: updatedRound })
}

const endRound = state => {
    const { round, player, lobbyID } = state
    let newState = getInitialState()

    player.rounds.push(round)

    if (player.rounds.length === 2) {
        return updateGameStatus(state, storeVariables.GAME_STATUS_POST_GAME)
    }

    return updateObject(newState, {
        lobbyID,
        player: updateObject(newState.player, {
            id: player.id,
            username: player.username,
            position: player.position,
            rounds: player.rounds
        })
    })
}

const updateSlappable = (state, action) => {
    return updateObject(state, { slappable: action.slappable })
}

const updatePhase = (state, phase) => {
    if (phase === storeVariables.PHASE_DRAW) state.round.turns += 1

    return updateObject(state, {
        slappable: phase === storeVariables.PHASE_DRAW && state.phase !== storeVariables.PHASE_PEEKING,
        phase
    })
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

const gameReducer = (state = getInitialState(), action) => {
    switch(action.type) {
        case actions.SET_LOBBY_ID: return setLobbyID(state, action)
        case actions.DRAW_CARD: 
        case actions.PLAY_CARD:
        case actions.UPDATE_PHASE: return updatePhase(state, action.phase)
        case actions.ADD_CARD: return addCard(state, action)
        case actions.INIT_PLAYERS: return initPlayers(state, action)
        case actions.INIT_PLAYER: return initPlayer(state, action)
        case actions.UPDATE_HAND: return updateHand(state, action)
        case actions.ROUND_LAUNCH: return launchRound(state, action)
        case actions.ROUND_TAP: return tapRound(state, action)
        case actions.ROUND_END: return endRound(state)
        case actions.DEAL_CARD: return dealCards(state, action)
        case actions.SWAP_CARDS: return updatePlayer(state, action)
        case actions.SLAP_CARDS: return slapCard(state, action)

        default: return state
    }
}

export default gameReducer;