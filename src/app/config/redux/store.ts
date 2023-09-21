import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import dropdownReducer from "./slices/dropdownSlice";
import modalReducer from "./slices/modalSlice";
import dataReducer, { fetchData } from "./slices/movieListSlice";
import watchListReducer from "./slices/watchListSlice";

export const store = configureStore({
    reducer: {
        dropdown: dropdownReducer,
        visible: modalReducer,
        data: dataReducer,
        watch: watchListReducer
    },  
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }), 
});

store.dispatch(fetchData({type:'movie', title:'fast'}));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
