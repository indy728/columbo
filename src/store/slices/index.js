import deckReducer, * as deckActions from './deck.slice';
import gameReducer, * as gameActions from './game.slice';

export default {
  deck: deckReducer,
  game: gameReducer,
};

export const actions = {
  ...deckActions,
  ...gameActions,
};
