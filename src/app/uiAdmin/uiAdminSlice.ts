import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UIAdminSlice {
    selectedBreed: string;
};

const initialState: UIAdminSlice = {
    selectedBreed: ''
};  

export const uiAdminSlice = createSlice({
  name: 'uiAdmin',
  initialState,
  reducers: {
    setSelectedBreed: (state, action) => {
      state.selectedBreed = action.payload;
    },
  },
});

export const { setSelectedBreed } = uiAdminSlice.actions;

export const getSelectedBreed = (state: RootState) => {
    return state.uiAdmin.selectedBreed;
};

export const hasSelectedBreed = (state: RootState) => {
    return state.uiAdmin.selectedBreed !== '';
};

export default uiAdminSlice.reducer;
