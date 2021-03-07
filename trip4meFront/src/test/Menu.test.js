import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme'; 
import renderer from 'react-test-renderer';
import Menu from '../core/Menu'


const setup = (props={}, state=null) => {
    const wrapper = shallow(<Menu {...props} />)
    if( state ) wrapper.setState(state);
    return wrapper;
  }

  const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  }

describe("<Menu />", () => {

  let wrapper;
  beforeEach(() => wrapper = shallow(<Menu />));
  
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })
  

})