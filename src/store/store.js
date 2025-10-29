import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types completely
        ignoredActions: [
          'user/setCurrentUser',
          /^user\//, // Match any user/ action
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          'user.currentUser',
          'payload',
        ],
        // Ignore actions dispatched by Redux Toolkit
        ignoredActionsPaths: ['meta.arg', 'payload'],
      },
    }),
});