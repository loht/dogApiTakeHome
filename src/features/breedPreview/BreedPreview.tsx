import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBreedImages } from '../breedDetails/breedDetailsSlice';
import { generateBreedKey, generateLinkName, generateLink, generateBreedDescription } from '../helpers/helpers';
import { Link } from "react-router-dom";
import { Breed } from '../helpers/interfaces';
import { getNextBreedImage, getPreviousBreedImage } from '../breedView/breedViewSelectors';
import { setSelectedBreed } from '../../app/uiAdmin/uiAdminSlice';
import '../helpers/image.css';

export interface BreedPreviewProps {
    breed: Breed;
    isNext: boolean;
}

export function BreedPreview(props: BreedPreviewProps) {
    const { breed, isNext } = props;

    const dispatch = useDispatch();
    const breedImage = useSelector(isNext ? getNextBreedImage : getPreviousBreedImage);
    const breedKey = generateBreedKey(breed);

    useEffect(() => {
        if (!breed) return;
        if (breedImage === '') {
            fetch(
                breed.subBreed ?
                    'https://dog.ceo/api/breed/' + breed.breed + '/' + breed.subBreed + '/images/random/1' :
                    'https://dog.ceo/api/breed/' + breed.breed + '/images/random/1'
            )
            .then(res => res.json())
            .then((results) => {
                const payload = {
                    breedKey: breedKey,
                    images: results.message,
                };
                const action = setBreedImages(payload);
                dispatch(action);
            })
            .catch((e) => {
                console.error('Error fetching breed image', e);
            });
        }
    }, [breed, dispatch, breedImage, breedKey]);

    const onLinkClick = useCallback((breed: string) => {
        const action = setSelectedBreed(breed);
        dispatch(action);
    }, [dispatch]);

  return (
        <Link onClick={() => onLinkClick(breedKey)} to={generateLink(breedKey)} key={breedKey}>
            <div>{generateLinkName(breed)}</div>
            <img className={'breed-image'} src={breedImage as string} alt={generateBreedDescription(breed)} />
        </Link>
  );
}
