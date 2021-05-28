import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import breedsReducer from '../features/breedList/breedSlice';
import breedDetailsReducer from '../features/breedDetails/breedDetailsSlice';
import uiAdminReducer from './uiAdmin/uiAdminSlice';


export const store = configureStore({
  reducer: {
    breeds: breedsReducer,
    breedDetails: breedDetailsReducer,
    uiAdmin: uiAdminReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
