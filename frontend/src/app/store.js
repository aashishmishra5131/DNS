import {configureStore} from '@reduxjs/toolkit';
import dataReducer from '../features/data/dataSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfigOrder = {
  key: 'data',
  storage,
};
const persisteduserReducer = persistReducer(persistConfigOrder, dataReducer);
const store = configureStore({
  reducer: {
    alldata: persisteduserReducer,
    
  },
});

const persistor = persistStore(store);

export { store, persistor };