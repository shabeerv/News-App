import { configureStore } from '@reduxjs/toolkit'
import articleReducer from '../features/articles/articles';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import logger from 'redux-logger'

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, articleReducer)

export const store = configureStore({
  reducer: {
    articles: persistedReducer,
    middleware: [logger],
  },
})


export const articlePersist = persistStore(store);