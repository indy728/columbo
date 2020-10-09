import {createSlice} from '@reduxjs/toolkit';
import {updateObject} from 'shared/utilityFunctions';
import {initDeck, shuffleCards} from 'util';
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
    initDeck: (state) => {
      Object.assign(state, {
        [DRAW_PILE]: initDeck(),
        discardPile: [],
        deckBuilt: true,
      });
    },
    drawCard: (state, {payload: {pile}}) => {
      // if the draw pile has cards in it, set current card to top card
      // of chosen pile and remove that card from the chosen pile
      if (state[DISCARD_PILE].length > 0 || pile === DRAW_PILE) {
        state.currentCard = state[pile].shift();
      }
    },
    swapCards: (state, {payload: {pile, deck}}) => {
      if (state[DISCARD_PILE].length > 0 || pile === DRAW_PILE) {
        state[pile] = deck;
        state.currentCard = null;
      }
    },
    slapCard: (state, {payload: {pile, deck}}) => {
      if (state[DISCARD_PILE].length > 0 || pile === DRAW_PILE) {
        state[pile] = deck;
      }
    },
    playCard: (state, {payload: {card}}) => {
      state[DISCARD_PILE] = card;
      state.currentCard = null;
    },
    rebuildDeck: (state, {payload: {shuffledDeck}}) => {
      state[DRAW_PILE] = shuffledDeck;
      state[DISCARD_PILE] = [];
    },
  },
});

export {};

export default reducer;
