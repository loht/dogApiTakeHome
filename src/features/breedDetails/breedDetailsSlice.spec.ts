import breedDetailsReducer, {
  BreedDetailsSlice,
  setBreedImages,
  addBreedImages,
} from './breedDetailsSlice';

describe('breed details reducer', () => {
  const initialState: BreedDetailsSlice = {
    breedImages: {},
  };

  const existingImageState: BreedDetailsSlice = {
    breedImages: {
      BREED_KEY: ['image1']
    },
  };

  it('should handle initial state', () => {
    expect(breedDetailsReducer(undefined, { type: 'unknown' })).toEqual({
      breedImages: {},
    });
  });

  it('should handle setBreedImages', () => {
    const breedKey = 'BREED_KEY';
    const images = ['img_str_1', 'img_str_2'];
    const payload = {
      breedKey: breedKey,
      images: images,
    };
    const actual = breedDetailsReducer(initialState, setBreedImages(payload));
    expect(actual.breedImages).toEqual({
      [breedKey]:  images,
    });
  });

  it('should handle addBreedImages', () => {
    const breedKey = 'BREED_KEY';
    const images = ['img_str_1', 'img_str_2'];
    const payload = {
      breedKey: breedKey,
      images: images,
    };
    const actual = breedDetailsReducer(existingImageState, addBreedImages(payload));
    expect(actual.breedImages).toEqual({
      [breedKey]: ['image1'].concat(images),
    });
  });
});
