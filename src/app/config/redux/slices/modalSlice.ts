'use client'

import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    modal: {
      [id: string]: {
        isVisible: boolean;
        imdbId?: string 
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
            const {id} = action.payload
            if(state.modal[id]) {
              state.modal[id].isVisible = false;
              state.modal[id].imdbId = '';
            }
          },
    },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;