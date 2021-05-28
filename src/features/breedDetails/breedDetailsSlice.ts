import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getSelectedBreed } from '../../app/uiAdmin/uiAdminSlice';

export interface BreedDetailsSlice {
    breedImages: Record<string, string[]>,
};

const initialState: BreedDetailsSlice = {
  breedImages: {},
};

export const breedDetailsSlice = createSlice({
  name: 'breedDetails',
  initialState,
  reducers: {
    setBreedImages: (state, action) => {
      state.breedImages[action.payload.breedKey] = action.payload.images;
    },
    addBreedImages: (state, action) => {
        const newBreedImages =
          state.breedImages[action.payload.breedKey] ?
            state.breedImages[action.payload.breedKey].concat(action.payload.images) :
            action.payload.images;
        state.breedImages[action.payload.breedKey] = newBreedImages;
    },
  },
});

export const { setBreedImages, addBreedImages } = breedDetailsSlice.actions;

export const selectBreedImages = (state: RootState) => {
  return state.breedDetails.breedImages;
}

export const getSelectedBreedImages = createSelector(
    [selectBreedImages, getSelectedBreed],
    (breedImages, selectedBreed) => {
    return breedImages[selectedBreed] ?? [];
});

export default breedDetailsSlice.reducer;
