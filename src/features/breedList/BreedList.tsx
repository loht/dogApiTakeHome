import React, { useEffect, ReactNode, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBreeds, getBreeds } from './breedSlice';
import { hasSelectedBreed, setSelectedBreed, getSelectedBreed } from '../../app/uiAdmin/uiAdminSlice';
import {
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import { BreedView } from '../breedView/BreedView';
import { generateBreedKey, generateLinkName, generateLink } from '../helpers/helpers';
import { Breed } from '../helpers/interfaces';
import './BreedList.css';

export function BreedList() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const breedList = useSelector(getBreeds);
    const isBreedSelected = useSelector(hasSelectedBreed);
    const selectedBreed = useSelector(getSelectedBreed);

    useEffect(() => {
        const cleanedPath = location.pathname.substring(1);
        if (selectedBreed !== cleanedPath) {
            // Case where a user goes directly to a valid breed
            const isValid = breedList.some((breed) => {
                return generateBreedKey(breed) === cleanedPath;
            })
            if (isValid) {
                const action = setSelectedBreed(cleanedPath);
                dispatch(action);
            } else if (breedList.length > 0) {
                //Redirect back to the list of breeds in case of a breed that is not within breed list
                //Only redirect when breed list contains breeds
                history.push('/');
            }
        }
    }, [location, dispatch, selectedBreed, breedList, history]);

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(res => res.json())
            .then((results) => {
                const breedList: Breed[] = [];
                (Object.entries(results.message)).forEach((breed) => {
                    if ((breed[1] as string[]).length > 1) {
                        (breed[1] as string[]).forEach((subBreed) => {
                            breedList.push({
                                breed: breed[0],
                                subBreed: subBreed,
                            });
                        })
                    } else {
                        breedList.push({
                            breed: breed[0],
                        });
                    }
                });
                const action = setBreeds(breedList);
                dispatch(action);
            })
            .catch((e) => {
                console.error('Error fetching breed list', e);
            });
    }, [dispatch]);

    const onLinkClick = useCallback((breed: string) => {
        const action = setSelectedBreed(breed);
        dispatch(action);
    }, [dispatch]);

    const generateBreedLinks = () => {
        const links = [] as ReactNode[];

        breedList.forEach((breed) => {
            const breedKey = generateBreedKey(breed);
            links.push(<Link onClick={() => onLinkClick(breedKey)} to={generateLink(breedKey)} key={breedKey}>{generateLinkName(breed)}</Link>);
        })

        return links;
    };

    const generateBreedRoutes = () => {
        const routes = [] as ReactNode[];
        breedList.forEach((breed) => {
            const breedKey = generateBreedKey(breed);
            routes.push(<Route key={breedKey} path={generateLink(breedKey)}><BreedView currentBreed={breed} /></Route>)
        })

        return (
            <Switch>
                {routes}
            </Switch>
        );
    };

  return (
        <>
            <div className={isBreedSelected ? 'hide' : 'show'}>
                {generateBreedLinks()}
            </div>
            <div className={isBreedSelected ? 'show' : 'hide'}>
                {generateBreedRoutes()}
            </div>
        </>
  );
}
