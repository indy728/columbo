import {createSlice} from '@reduxjs/toolkit';
import {
  PHASE_DRAW,
  PHASE_PLAY,
  PHASE_PEEKING,
  PHASE_PEEK,
  PHASE_TAPPED,
  GAME_STATUS_PRE_DEAL,
  GAME_STATUS_LAUNCHED,
  GAME_STATUS_TAPPED,
} from 'constants';

const getInitialPlayer = () => ({
  hand: [[null, null]],
  rounds: [],
});

const initialState = {
  launched: false,
  singlePlayer: true,
  phase: PHASE_PEEK,
  slappable: false,
  player: getInitialPlayer(),
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
  initialState,
  reducers: {
    updatePlayerHand: (state, {payload: {hand}}) => {
      Object.assign(state.player, {hand});
    },
    updateGame: (state, {payload: {updatedAttributes}}) => {
      Object.assign(state, updatedAttributes);
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
      return {
        ...initialState,
        player: {hand: [[null, null]], rounds},
      };
    },
  },
  extraReducers: {
    'deck/playCard': (state) => {
      state.phase = PHASE_DRAW;
      state.round.turns += 1;
      state.slappable = true;
    },
    'deck/drawCard': (state) => {
      state.phase = PHASE_PLAY;
      state.slappable = false;
    },
    'deck/swapCards': (state, {payload: {hand}}) => {
      state.phase = PHASE_DRAW;
      state.round.turns += 1;
      state.slappable = true;
      state.player.hand = hand;
    },
    'deck/dealCards': (state, {payload: {hand}}) => {
      state.isDealt = true;
      state.player.hand = hand;
    },
    'deck/slapCards': (state, {payload: {hand, success}}) => {
      if (success) {
        state.slappable = false;
      }
      state.player.hand = hand;
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
