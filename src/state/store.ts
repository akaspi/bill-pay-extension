import { combineReducers, configureStore } from "@reduxjs/toolkit";
import environmentReducer from './environmentSlice';

const reducer = combineReducers({
    environment: environmentReducer,
  })

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>
export default store;