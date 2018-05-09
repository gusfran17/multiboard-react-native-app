import { createSelector, } from 'reselect';

const playersSelector = createSelector(
    state => state.gamePlayers.players,
    players => players,
);

export default playersSelector;
