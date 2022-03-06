import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { authReducer, cartReducer, catgAndPrdtReducer, favouriteReducer, homeReducer, orderReducer, userReducer } from './reducer'
import toastReducer from './reducer/toastReducer'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'cart', 'user']
  };
  
  const rootReducer = {
      auth:  authReducer,
      cart:   cartReducer,
      catgAngPrdt: catgAndPrdtReducer,
      favourite: favouriteReducer,
      home: homeReducer,
      order: orderReducer,
      toast: toastReducer,
      user: userReducer
  }   
  const persistCombinedReducers = persistCombineReducers(persistConfig, rootReducer);


export const store = createStore(persistCombinedReducers, applyMiddleware(thunk));
export const persistor = persistStore(store)