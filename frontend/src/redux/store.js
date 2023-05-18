import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import pakageReducer from './slices/pakageSlice';

const reducer = {
    appState: appReducer,
    pakageState: pakageReducer
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;