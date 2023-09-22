import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MovieData } from "./movieListSlice";

const watchlistAdapter = createEntityAdapter<MovieData>({
    selectId: (watchlistItem) => watchlistItem.imdbID,
});

const initialState = () => {
    const savedData = sessionStorage.getItem('watchlistData');
    if(savedData) {
        const parsedData = JSON.parse(savedData);
       return {...watchlistAdapter.getInitialState({
            watchlistLength: parsedData.length,
        }),
        ...parsedData,
    };
    };
    return{ ...watchlistAdapter.getInitialState({
        watchlistLenght: 0,
    })};
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: initialState(),
    reducers: {
        addItem: (state, action) => {
            watchlistAdapter.addOne(state, action);
            state.watchlistLength = state.ids.length;
            sessionStorage.setItem('watchlistData', JSON.stringify(state));
        },
        removeItem: (state, action) => {
            watchlistAdapter.removeOne(state, action);
            state.watchlistLength = state.ids.length;
            sessionStorage.setItem('watchlistData', JSON.stringify(state));
        },
        removeMultipleItems: (state, action) => {
            watchlistAdapter.removeMany(state, action);
            state.watchlistLength = state.ids.length;
            sessionStorage.setItem('watchlistData', JSON.stringify(state));
        },
        updateItem: (state, action) => {
            watchlistAdapter.updateOne(state, action);
            sessionStorage.setItem('watchlistData', JSON.stringify(state));
        },
    },
});

export const { addItem, removeItem, removeMultipleItems, updateItem } = watchlistSlice.actions;

export default watchlistSlice.reducer;