import { createSelector, } from 'reselect';

const playerSelector = index => createSelector(
    state => state.game.players[index],
    player => player,
);

export default playerSelector;
