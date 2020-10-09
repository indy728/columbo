import {createSlice} from '@reduxjs/toolkit';
import {
  PHASE_DRAW,
  PHASE_PEEKING,
  PHASE_PEEK,
  PHASE_TAPPED,
  GAME_STATUS_PRE_DEAL,
  GAME_STATUS_LAUNCHED,
  GAME_STATUS_TAPPED,
} from 'constants';

const initialState = {
  launched: false,
  phase: PHASE_PEEK,
  slappable: false,
  player: {
    hand: [[null, null]],
    rounds: [],
  },
  round: {
    turns: 0,
    startTime: null,
    endTime: null,
  },
  isDealt: false,
  gameStatus: GAME_STATUS_PRE_DEAL,
};

const {actions, reducer} = createSlice({
  name: 'game',
  initialState: {...initialState},
  reducers: {
    updatePlayerHand: (state, {payload: {hand}}) => {
      Object.assign(state.player, {hand});
    },
    updateGame: (state, {payload: {attribute, value}}) => {
      state[attribute] = value;
    },
    updatePhase: (state, {payload: {phase, turns}}) => {
      !!turns && Object.assign(state.round, {turns});
      state.slappable = phase === PHASE_DRAW && state.phase !== PHASE_PEEKING;
      state.phase = phase;
    },
    launchRound: (state, {payload: {startTime}}) => {
      Object.assign(state, {
        gameStatus: GAME_STATUS_LAUNCHED,
        phase: PHASE_DRAW,
        round: Object.assign(state.round, {startTime}),
      });
    },
    tapRound: (state, {payload: {endTime}}) => {
      Object.assign(state, {
        gameStatus: GAME_STATUS_TAPPED,
        phase: PHASE_TAPPED,
        round: Object.assign(state.round, {endTime}),
      });
    },
    endRound: (state, {payload: {rounds}}) => {
      state = {...initialState};
      state.rounds = rounds;
    },
  },
});

export const {
  updatePlayerHand,
  updateGame,
  updatePhase,
  launchRound,
  tapRound,
  endRound,
} = actions;

export default reducer;