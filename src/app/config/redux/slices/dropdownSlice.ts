'use client'

import { createSlice } from "@reduxjs/toolkit";

interface DropdownState {
    selectedOption: string;
    isVisible: boolean;
  }
  
  const dropdownInitialState: DropdownState = {
    selectedOption: "All",
    isVisible: false,
  };

const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState: dropdownInitialState,
    reducers: {
        setSelectedOption: (state, action) => {
            state.selectedOption = action.payload;
        },
        showDropdown: (state) => {
            state.isVisible = true;
          },
          hideDropdown: (state) => {
            state.isVisible = false;
          },
        toggleDropdown: (state) => {
          state.isVisible = !state.isVisible;
        }
    },
});

export const { setSelectedOption, showDropdown, hideDropdown, toggleDropdown } = dropdownSlice.actions;

export default dropdownSlice.reducer;