
import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlicer';
import { searchReducer } from './searchSlicer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
    FLUSH,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    PAUSE
} from 'redux-persist';


const persistConfig = {
  key: 'contacts',
  storage,
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: {
    contacts: persistedReducer,
    filter: searchReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);