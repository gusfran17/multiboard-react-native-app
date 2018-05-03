import { createSelector, } from 'reselect';

const savedGamesSelector = createSelector(
    state => state.mainMenu.savedGames,
    savedGames => savedGames,
);

export default savedGamesSelector;
