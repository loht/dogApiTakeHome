import { createSelector } from '@reduxjs/toolkit';
import { getBreeds } from '../breedList/breedSlice';
import { getSelectedBreed } from '../../app/uiAdmin/uiAdminSlice';
import { generateBreedKey } from '../helpers/helpers';
import { selectBreedImages } from '../breedDetails/breedDetailsSlice';

export const getNextBreed = createSelector([getBreeds, getSelectedBreed], (breedList, selectedBreed) => {
    const index = breedList.findIndex((breed) => {
        const breedKey = generateBreedKey(breed);
        return breedKey === selectedBreed;
    });
    if (index === breedList.length - 1) {
        return undefined;
    } else {
        return breedList[index + 1];
    }
});

export const getPreviousBreed = createSelector(
    [getBreeds, getSelectedBreed],
    (breedList, selectedBreed) => {
        const index = breedList.findIndex((breed) => {
            const breedKey = generateBreedKey(breed);
            return breedKey === selectedBreed;
        });
        if (index === 0) {
            return undefined;
        } else {
            return breedList[index - 1];
        }
    }
);

export const getNextBreedImage = createSelector(
    [getNextBreed, selectBreedImages],
    (breed, breedImages) => {
        if (!breed) return [];
        const breedKey = generateBreedKey(breed);
        const images = breedImages[breedKey]
        return images && images.length > 0 ? images[0] : '';
});

export const getPreviousBreedImage = createSelector(
    [getPreviousBreed, selectBreedImages],
    (breed, breedImages) => {
        if (!breed) return [];
        const breedKey = generateBreedKey(breed);
        const images = breedImages[breedKey]
        return images && images.length > 0 ? images[0] : '';
});
