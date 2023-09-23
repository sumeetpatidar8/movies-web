'use client'

import { createSlice } from "@reduxjs/toolkit";
import { comment } from "postcss";

interface ModalState {
    modal: {
      [id: string]: {
        isVisible: boolean;
        imdbId?: string; 
        results?: { rating: number; comments: string; }[],
      }
    }
  }
  
  const modalInitialState: ModalState = {
    modal: {
      MENU: {
        isVisible: false,
      },
      MOVIE: {
        isVisible: false,
        imdbId: ''
      },
      WATCHLIST: {
        isVisible: false,
        imdbId: ''
      },
      RATING: {
        isVisible: false,
        results: [{ rating:0, comments: ''}]
      },
      SIDEMENU: {
        isVisible: false,
      }
    },
  };

const modalSlice = createSlice({
    name: 'visible',
    initialState: modalInitialState,
    reducers: {
        showModal: (state, action) => {
          const {id, imdbId} = action.payload
          if(state.modal[id]) {
            state.modal[id].isVisible = true;
            state.modal[id].imdbId = imdbId;
          }
          },
          hideModal: (state, action) => {
            const {id, response, imdbId} = action.payload
            if(state.modal[id]) {
              state.modal[id].isVisible = false;
              state.modal[id].imdbId = imdbId;
              state.modal[id].results = [
                ...state.modal[id].results || [],
                response
              ];
              const data = JSON.stringify(state.modal[id].results);
              sessionStorage.setItem('rating', data);
            }
          },
    },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;