import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./slices/dropdownSlice";
import modalReducer from "./slices/modalSlice";

export const store = configureStore({
    reducer: {
        dropdown: dropdownReducer,
        modal: modalReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
