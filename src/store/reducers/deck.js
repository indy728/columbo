import { updateObject } from 'shared/utilityFunctions';
import * as actions from '../actions/actionTypes';
import * as storeVariables from '../storeVariables';

const getInitialState = () => ({
  drawPile: [],
  discardPile: [],
  deckBuilt: false,
  currentCard: null,
});

const initDeck = (state, action) => updateObject(state, {
  drawPile: [...action.deck],
  discardPile: [],
  deckBuilt: true,
});

const drawCard = (state, action) => {
  const { pile } = action;
  const { drawPile, discardPile } = state;
  let switchPile = drawPile;

  if (pile !== storeVariables.DRAW_PILE) {
    if (!discardPile.length) return state;
    switchPile = discardPile;
  }

  return updateObject(state, {
    [pile]: switchPile,
    currentCard: switchPile.shift(),
  });
};

const swapCards = (state, action) => {
  let updatedState = updateDeck(state, action);

  updatedState = updateObject(updatedState, { currentCard: null });
  return updateObject(state, updatedState);
};

const slapCard = (state, action) => updateObject(state, updateDeck(state, action));

const updateDeck = (state, action) => {
  const { pile, deck } = action;
  const { drawPile, discardPile } = state;
  let switchPile = drawPile;

  if (pile !== storeVariables.DRAW_PILE) {
    if (!discardPile.length) return state;
    switchPile = discardPile;
  }

  return updateObject(state, {
    [pile]: deck,
  });
};

const rebuildDrawPileFromDiscardPile = (state, action) => updateObject(state, {
  drawPile: action.drawPile,
  discardPile: getInitialState().discardPile,
});

const playCard = (state, action) => {
  const { discardPile } = state;

  discardPile.unshift(action.card);
  return updateObject(state, {
    discardPile,
    currentCard: null,
  });
};

const deckReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.INIT_DECK: return initDeck(state, action);
    case actions.DRAW_CARD: return drawCard(state, action);
    case actions.PLAY_CARD: return playCard(state, action);
    case actions.UPDATE_DECK: return updateDeck(state, action);
    case actions.DEAL_CARD: return updateDeck(state, action);
    case actions.SWAP_CARDS: return swapCards(state, action);
    case actions.SLAP_CARDS: return slapCard(state, action);
    case actions.REBUILD_DECK: return rebuildDrawPileFromDiscardPile(state, action);
    case actions.END_GAME: return getInitialState();
    default: return state;
  }
};

export default deckReducer;
