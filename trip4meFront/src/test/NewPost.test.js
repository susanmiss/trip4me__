import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme'; 
import renderer from 'react-test-renderer';
import NewPost from '../post/NewPost'


const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props} />)
    if( state ) wrapper.setState(state);
    return wrapper;
  }

  const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  }

describe("<NewPost />", () => {

  it('mounts to DOM', () => {
      const div = document.createElement('div');
      ReactDOM.render(<NewPost />, div);
      ReactDOM.unmountComponentAtNode(div);
  });

  let wrapper;
  beforeEach(() => wrapper = shallow(<NewPost />));
  
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })
  
  it('should render a <div />', () => { 
      expect(wrapper.find('div').length).toEqual(7);
  });

    test('renders <form> element', () => {
    const postComponent = wrapper.find("[data-test='form-element']")
    expect(postComponent.length).toBe(1);
    })
 
})