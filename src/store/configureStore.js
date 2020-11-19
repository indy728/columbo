import {configureStore} from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import reducer from './slices';

const createAppStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      composeWithDevTools(getDefaultMiddleware()),
  });
};

export default createAppStore;
