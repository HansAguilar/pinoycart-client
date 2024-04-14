import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/auth/authSlice";
import itemSlice from "./features/items/itemSlice";
import vendorSlice from "./features/vendor/vendorSlice";
import cartSlice from "./features/cart/cartSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// Combine your reducers into a single root reducer
const rootReducer = combineReducers({
    auth: authSlice,
    items: itemSlice,
    vendor: vendorSlice,
    cart: cartSlice
});


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'cart', 'items'], // List of reducers to persist
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


// Create the persistor
export const persistor = persistStore(store);

// export const store = configureStore({
//     reducer: {
//         auth: authSlice,
//         items: itemSlice,
//         vendor: vendorSlice,
//         cart: cartSlice
//     }
// });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;