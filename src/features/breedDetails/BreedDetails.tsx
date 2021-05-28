import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBreedImages, getSelectedBreedImages, addBreedImages } from './breedDetailsSlice';
import { generateBreedKey, generateLinkName, generateBreedDescription } from '../helpers/helpers';
import { Breed } from '../helpers/interfaces';
import '../helpers/image.css';

const MAX_IMAGE_COUNT = 4;

export interface BreedDetailsProps {
    breed: Breed;
}

export function BreedDetails(props: BreedDetailsProps) {
    const { breed } = props;
    
    const dispatch = useDispatch();
    const breedImages = useSelector(getSelectedBreedImages);

    useEffect(() => {
        if (breedImages.length === 0) {
            fetch(
                breed.subBreed ?
                    'https://dog.ceo/api/breed/' + breed.breed + '/' + breed.subBreed + '/images/random/' + MAX_IMAGE_COUNT :
                    'https://dog.ceo/api/breed/' + breed.breed + '/images/random/' + MAX_IMAGE_COUNT
            )
            .then(res => res.json())
            .then((results) => {
                const payload = {
                    breedKey: generateBreedKey(breed),
                    images: results.message,
                };
                const action = setBreedImages(payload);
                dispatch(action);
            })
            .catch((e) => {
                console.error('Error fetching breed image.', e);
            });
        } else if (breedImages.length > 0 && breedImages.length < MAX_IMAGE_COUNT) {
            const imageCountNeeded = MAX_IMAGE_COUNT - breedImages.length;
            fetch(
                breed.subBreed ?
                    'https://dog.ceo/api/breed/' + breed.breed + '/' + breed.subBreed + '/images/random/' + imageCountNeeded :
                    'https://dog.ceo/api/breed/' + breed.breed + '/images/random/' + imageCountNeeded
            )
            .then(res => res.json())
            .then((results) => {
                const payload = {
                    breedKey: generateBreedKey(breed),
                    images: results.message,
                };
                const action = addBreedImages(payload);
                dispatch(action);
            })
            .catch((e) => {
                console.error('Error fetch breeding image.', e);
            });
        }
    }, [breed, dispatch, breedImages.length]);

    const getBreedImages = () => {
        return breedImages.map((breedImage, index) => {
            return <img className={'breed-image'} key={index} src={breedImage} alt={generateBreedDescription(breed)} />
        });
    }

  return (
        <>
            <div>{generateLinkName(breed)}</div>
            <div>
                {getBreedImages()}
            </div>
        </>
  );
}
