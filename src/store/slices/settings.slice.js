import {createSlice} from '@reduxjs/toolkit';

const defaultValues = {
  gamesPerRound: 1,
  multipliers: {
    cards: 5000,
    turns: 1000,
    time: 1000,
  },
  max: {
    turns: 100000,
    time: 100000,
  },
};

const initialState = {
  bonusThreshold: {
    active: true,
  },
  turnsBonus: {
    multiplier: defaultValues.multipliers.turns,
    max: defaultValues.max.turns,
  },
  timeBonus: {
    multiplier: defaultValues.multipliers.time,
    max: defaultValues.max.time,
  },
  cardsBonus: {
    multiplier: defaultValues.multipliers.cards,
  },
};

const {actions, reducer} = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, {payload: {settings}}) => settings,
  },
});

export const {updateSettings} = actions;

export default reducer;
