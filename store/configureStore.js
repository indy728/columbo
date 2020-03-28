import { createStore, combineReducers } from 'redux'
import gameReducer from './reducers/game'

const rootReducer = combineReducers({ 
    game: gameReducer 
})

const configureStore = () => {
    return createStore(rootReducer)
}

export default configureStore