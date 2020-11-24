import deckReducer, * as deckActions from './deck.slice';
import gameReducer, * as gameActions from './game.slice';
import settingsReducer, * as settingsActions from './settings.slice';

export default {
  deck: deckReducer,
  game: gameReducer,
  settings: settingsReducer,
};

export const actions = {
  ...deckActions,
  ...gameActions,
  ...settingsActions,
};
