import { createSelector, } from 'reselect';

const stopwatchSelector = createSelector(
    state => state.stopwatch,
    stopwatch => stopwatch,
);

export default stopwatchSelector;
