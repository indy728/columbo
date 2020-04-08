import * as actions from './actionTypes'

const player = {
    id: '',
    username: '',
    hand: [],
    totalPoints: 0
}

export const initPlayers = playerCount => {
    const players = []

    for (let i = 0; i < playerCount; i++) {
        players.push({ ...player })
    }

    return {
        type: actions.INIT_PLAYERS,
        playerCount,
        players
    }
}