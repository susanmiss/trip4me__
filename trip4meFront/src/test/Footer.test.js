import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme'; 
import renderer from 'react-test-renderer';
import Footer from '../core/Footer'


const setup = (props={}, state=null) => {
    const wrapper = shallow(<Footer {...props} />)
    if( state ) wrapper.setState(state);
    return wrapper;
  }

  const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  }

describe("<Footer />", () => {


  let wrapper;
  beforeEach(() => wrapper = shallow(<Footer />));
  
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })
  
  it('should render a <div />', () => { 
      expect(wrapper.find('div').length).toEqual(6);
  });

  it('should render a <ul >', () => { 
    expect(wrapper.find('ul').length).toEqual(2);
  });

    it('should render a <li >', () => { 
        expect(wrapper.find('li').length).toEqual(4);
    });
 
})