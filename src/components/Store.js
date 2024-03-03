import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './CardSlice';

export default configureStore({
  reducer: {
    card: cardReducer,
    // Other reducers can be included here if needed
  },
});