import { createStore, combineReducers } from 'redux'
import deckReducer from './reducers/deck'
import gameReducer from './reducers/game'

const rootReducer = combineReducers({ 
    deck: deckReducer,
    game: gameReducer,

})

const configureStore = () => {
    return createStore(rootReducer)
}

export default rootReducer