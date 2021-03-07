import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme'; 
import renderer from 'react-test-renderer';
import Home from '../core/Home'


const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props} />)
    if( state ) wrapper.setState(state);
    return wrapper;
  }

  const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  }

describe("<Home />", () => {

  it('mounts to DOM', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Home />, div);
      ReactDOM.unmountComponentAtNode(div);
  });
  it('renders correctly', () => {
      const tree = renderer
          .create(<Home />)
          .toJSON();
      expect(tree).toMatchSnapshot();
  });
  let wrapper;
  beforeEach(() => wrapper = shallow(<Home />));
  
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })
  
  it('should render a <div />', () => { 
      expect(wrapper.find('div').length).toEqual(10);
  });

    test('renders <Post/> component', () => {
    const postComponent = wrapper.find("[data-test='component-post']")
    expect(postComponent.length).toBe(1);
    })
 
})