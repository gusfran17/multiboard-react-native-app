import { createNavigationReducer, } from 'react-navigation-redux-helpers';
import { MainStack, } from './../containers/Navigation';

const nav = createNavigationReducer(MainStack);

export default nav;
