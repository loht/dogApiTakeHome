import { Breed } from './interfaces'

export const generateBreedKey = (breed: Breed) => {
    return breed.subBreed ? breed.subBreed + '_' + breed.breed : breed.breed;
};

export const generateLinkName = (breed: Breed) => {
    return breed.subBreed ? breed.subBreed + ' ' + breed.breed : breed.breed;
}

export const generateLink = (breedKey:string) => {
    return '/' + breedKey;
}

export const generateBreedDescription = (breed: Breed) => {
    return breed.subBreed ? 'Image of ' + breed.subBreed + ' ' + breed + '.' : 'Image of ' + breed.breed + '.';
}
