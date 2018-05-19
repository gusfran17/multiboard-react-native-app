import { createSelector, } from 'reselect';

const playersSelector = createSelector(
    state => state.players.players,
    players => players,
);

export default playersSelector;
