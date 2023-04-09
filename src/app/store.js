import { configureStore } from '@reduxjs/toolkit';

import { tmdbApi } from '../services/TMDB';
import categoryReducer from '../features/currentCategory';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentCategory: categoryReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tmdbApi.middleware);
  },
});
