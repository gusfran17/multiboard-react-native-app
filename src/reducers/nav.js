import MainStack from './../containers/Navigation';

const initialState = MainStack.router.getStateForAction(MainStack.router.getActionForPathAndParams('MainMenu'));
const nav = (state = initialState, action) => {
    const nextState = MainStack.router.getStateForAction(action, state);
    return nextState;
};

export default nav;
