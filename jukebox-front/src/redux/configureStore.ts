import { persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import searchHistoryReducer from './slices/searchHistory'
import cachedResultsReducer from './slices/cachedResults';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage,
}

const reducer = combineReducers({
  searchHistoryReducer,
  cachedResultsReducer     
 });

const persistedReducer = persistReducer(persistConfig, reducer)

export default () => {
  let store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
  let persistor = persistStore(store)
  return { store, persistor }
}