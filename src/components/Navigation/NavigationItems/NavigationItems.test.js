import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'
import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter()});
describe("<NavigationItems/>", ()=>{
    it('should render two navigation items elements if not authenticated', ()=>{
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('it should tender three navigation items if authenticated', ()=>{
        const wrapper = shallow(<NavigationItems/>);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('it should tender three navigation items if authenticated', ()=>{
        const wrapper = shallow(<NavigationItems/>);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout"> LOG OUT</NavigationItem>
        )).toEqual(true);
    })

})
