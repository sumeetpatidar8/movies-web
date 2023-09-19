'use client'

import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isVisible: boolean;
  }
  
  const modalInitialState: ModalState = {
    isVisible: false,
  };

const dropdownSlice = createSlice({
    name: 'modal',
    initialState: modalInitialState,
    reducers: {
        showModal: (state) => {
            state.isVisible = true;
          },
          hideModal: (state) => {
            state.isVisible = false;
          },
    },
});

export const { showModal, hideModal } = dropdownSlice.actions;

export default dropdownSlice.reducer;