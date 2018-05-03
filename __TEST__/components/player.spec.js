import { shallow, } from 'enzyme';
import * as React from 'react';
import { Player, Counter, } from './../../src/components/';

describe('<Player />', () => {
    it('should render as expected', () => {
        const wrapper = shallow(<Player
            name="Gustavo"
            index={0}
            updateScore={() => {}}
            removePlayer={() => {}}
            addPlayer={() => {}}
            score={20}
        />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should have a Counter', () => {
        const wrapper = shallow(<Player
            name="Gustavo"
            index={0}
            updateScore={() => {}}
            removePlayer={() => {}}
            addPlayer={() => {}}
            score={20}
        />);
        expect(wrapper.find('Counter').length).toBe(1);
    });
});
