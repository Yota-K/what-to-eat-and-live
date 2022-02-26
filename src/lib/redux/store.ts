import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { formReducer, initialState as formInitialState } from './form/slice';

const rootReducer = combineReducers({
  form: formReducer,
});

const preLoadedState = () => {
  return {
    form: formInitialState,
  };
};

// ストアのステートの型を返却している
export type StoreState = ReturnType<typeof preLoadedState>;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preLoadedState(),
});
