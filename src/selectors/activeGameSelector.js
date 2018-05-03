import { createSelector, } from 'reselect';

const activeGameSelector = createSelector(
    state => state.mainMenu.activeGame,
    activeGame => activeGame,
);

export default activeGameSelector;
