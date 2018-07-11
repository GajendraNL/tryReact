import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers'; // the value from combineReducers

const persistConfig = {
 key: 'root',
 storage,
 stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
 blacklist: ['cities', 'refreshChart', 'nakshatraDetails', 'planetInfo']
};

const pR = persistReducer(persistConfig, rootReducer);

export const store = createStore(pR, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);
