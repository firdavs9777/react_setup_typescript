// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice';

const rootReducer = configureStore({
  reducer: {[apiSlice.reducerPath]: apiSlice.reducer},
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default rootReducer;


// import { createStore, combineReducers } from 'redux';
// import { counterReducer } from './reducers/counterReducer/counterReducer';

// const rootReducer = combineReducers({
//   counter: counterReducer,
// });

// export type RootState = ReturnType<typeof rootReducer>;

// const store = createStore(rootReducer);

// export default store;
