import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Breed } from '../helpers/interfaces'

export interface BreedSlice {
    breeds: Breed[]
};

const initialState: BreedSlice = {
  breeds: [],
};

export const breedSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    setBreeds: (state, action) => {
      state.breeds = action.payload;
    },
  },
});

export const { setBreeds } = breedSlice.actions;

export const getBreeds = (state: RootState) => state.breeds.breeds;

export default breedSlice.reducer;
