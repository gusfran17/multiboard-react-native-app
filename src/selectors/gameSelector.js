import { createSelector, } from 'reselect';

const gameSelector = createSelector(
    state => state.game,
    game => game,
);

export default gameSelector;
