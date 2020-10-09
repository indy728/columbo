import {createSlice} from '@reduxjs/toolkit';
import {PHASE_PEEK, GAME_STATUS_PRE_DEAL} from 'constants';

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
    stateTime: null,
    endTime: null,
    points: 0,
  },
  isDealt: false,
  gameStatus: GAME_STATUS_PRE_DEAL,
};

const {actions, reducer} = createSlice({
  name: 'game',
  initialState,
  reducers: {},
});
