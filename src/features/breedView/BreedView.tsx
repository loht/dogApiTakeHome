import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breed } from '../helpers/interfaces';
import { Link } from "react-router-dom";
import { setSelectedBreed } from '../../app/uiAdmin/uiAdminSlice';
import { BreedDetails } from '../breedDetails/BreedDetails'
import { BreedPreview } from '../breedPreview/BreedPreview';
import { getNextBreed, getPreviousBreed } from './breedViewSelectors';
import './BreedView.css';

export interface BreedViewProps {
    currentBreed: Breed,
}

export function BreedView(props: BreedViewProps) {
    const { currentBreed } = props;
    const dispatch = useDispatch();

    const previousBreed = useSelector(getPreviousBreed);
    const nextBreed = useSelector(getNextBreed);

    const onHomeClick = useCallback(() => {
        const action = setSelectedBreed('');
        dispatch(action);
    }, [dispatch])

  return (
        <>
            <div className={'preview-navigator'}>
                {previousBreed && <BreedPreview breed={previousBreed} isNext={false} />}
                <Link onClick={onHomeClick} to={'/'}>Home</Link>
                {nextBreed && <BreedPreview breed={nextBreed} isNext={true} />}
            </div>  
            <BreedDetails breed={currentBreed} />
        </>
  );
}
