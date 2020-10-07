import { createSlice } from '@reduxjs/toolkit';
import { updateObject } from 'shared/utilityFunctions';

const { actions, reducers } = createSlice({
  name: 'deck',
  initialState: {},
  reducers: {
    initDeck: {
      reducer(state, { payload }) {

      },
      prepare() {

      },
    },
  },
});

const getInitialState = () => ({
  drawPile: [],
  discardPile: [],
  deckBuilt: false,
  currentCard: null,
});

const initDeck = () => ({
  drawPile: [...action.deck],
  discardPile: [],
  deckBuilt: true,
});
