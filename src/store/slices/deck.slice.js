import {createSlice} from '@reduxjs/toolkit';
import {DRAW_PILE, DISCARD_PILE} from 'constants';

const initialState = {
  [DRAW_PILE]: [],
  [DISCARD_PILE]: [],
  deckBuilt: false,
  currentCard: null,
};

const {actions, reducer} = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    initDeck: (state, {payload: {initialDeck}}) => {
      Object.assign(state, {
        [DRAW_PILE]: initialDeck,
        discardPile: [],
        deckBuilt: true,
      });
    },
    dealCards: (state, {payload: {stack}}) => {
      state[DRAW_PILE] = stack;
    },
    drawCard: (state, {payload: {pile}}) => {
      // if the draw pile has cards in it, set current card to top card
      // of chosen pile and remove that card from the chosen pile
      if (state[DISCARD_PILE].length > 0 || pile === DRAW_PILE) {
        state.currentCard = state[pile].shift();
      }
    },
    swapCards: (state, {payload: {stack}}) => {
      state[DISCARD_PILE] = stack;
      state.currentCard = null;
    },
    slapCards: (state, {payload: {stack, success}}) => {
      if (success) {
        state[DISCARD_PILE] = stack;
      } else {
        state[DRAW_PILE] = stack;
      }
    },
    updateDeck: (state, {payload: {pile, stack}}) => {
      if (state[DISCARD_PILE].length > 0 || pile === DRAW_PILE) {
        state[pile] = stack;
      }
    },
    playCard: (state, {payload: {stack}}) => {
      state[DISCARD_PILE] = stack;
      state.currentCard = null;
    },
    rebuildDeck: (state, {payload: {shuffledDeck}}) => {
      state[DRAW_PILE] = shuffledDeck;
      state[DISCARD_PILE] = [];
    },
  },
  extraReducers: {
    'game/endRound': (state, {payload: {initialDeck}}) => {
      state.currentCard = null;
      state[DISCARD_PILE] = [];
      state[DRAW_PILE] = initialDeck;
      state.deckBuilt = true;
    },
  },
});

export const {
  initDeck,
  drawCard,
  swapCards,
  updateDeck,
  playCard,
  rebuildDeck,
  dealCards,
  slapCards,
} = actions;

export default reducer;
