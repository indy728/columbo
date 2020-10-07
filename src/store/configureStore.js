import { configureStore } from '@reduxjs/toolkit';
import deckReducer from './reducers/deck'
import gameReducer from './reducers/game'

const reducer = { 
    deck: deckReducer,
    game: gameReducer,
}

const createAppStore = () => {
  return configureStore({
    reducer,
  })
}

export default createAppStore;