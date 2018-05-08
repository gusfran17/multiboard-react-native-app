import { Image, } from 'react-native';

// Preload images with require();
const images = {
    'mainMenuBackground': require('./../assets/images/cards_dices.png'),
    'settingsBackground': require('./../assets/images/falling_dices_final.png'),
    'scorebaordBackground': require('./../assets/images/back_nice.png'),
    'savedGamesBackground': require('./../assets/images/dark_dice.png'),
};

let loaded = false;

// Convert image refs into image objects with Image.resolveAssetSource
export const loadImages = images => {
    if (!loaded) {
        loaded = true;
        return Promise.all(Object.keys(images).map(i => {
            let img = {
                ...Image.resolveAssetSource(images[i]),
                cache: 'force-cache',
            };

            return Image.prefetch(img);
        }));
    }
}


const preloadImages = callback => {
    loadImages(images).then(callback);
}

export default preloadImages;
