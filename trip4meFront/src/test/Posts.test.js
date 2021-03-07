import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme'; 
import renderer from 'react-test-renderer';
import Posts from '../post/Posts'


const setup = (props={}, state=null) => {
    const wrapper = shallow(<Posts {...props} />)
    if( state ) wrapper.setState(state);
    return wrapper;
  }

  const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  }

describe("<Posts />", () => {

  it('mounts to DOM', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Posts />, div);
      ReactDOM.unmountComponentAtNode(div);
  });
  it('renders correctly', () => {
      const tree = renderer
          .create(<Posts />)
          .toJSON();
      expect(tree).toMatchSnapshot();
  });
  let wrapper;
  beforeEach(() => wrapper = shallow(<Posts />));
  
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })
  
  it('should render a <div />', () => { 
      expect(wrapper.find('div').length).toEqual(3);
  });

  it('should render a <h2>', () => { 
    expect(wrapper.find('h2').length).toEqual(1);
  });


})