import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Follow from '../src/follow';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('The follow form', () => {
  it('Shows you the list of entities you are following', () => {
    const mockFollowing = [
      {"handle":"@philt3r", "userHash": "wegwtrwrt"},
      {"handle":"Test 2", "userHash": "dddd"}
    ];
    const wrapper = shallow(<Follow following={mockFollowing} />);
    expect(wrapper.find('li').length).toEqual(mockFollowing.length);
  });

  it('Enables you to type in the handle of the entity you want to follow', () => {
    const mockFollowing = [];
    const wrapper = shallow(<Follow following={mockFollowing} />);
    wrapper.find('#followHandle').simulate('change', {target: {value: 'Follow this'}});
    expect(wrapper.find('#followHandle').getElement().props.value).toEqual('Follow this');
  });

  // it('When you submit the form empty nothing happens', () => {
  //   let mockFollowing = [];
  //   const wrapper = shallow(<Follow following={mockFollowing} follow={() => jest.fn() }/>);
  //   const onHandleFollow = spyOn(wrapper.instance(), 'follow');
  //   wrapper.find('form').simulate('submit', { preventDefault() {} });
  //   expect(onHandleFollow).not.toHaveBeenCalled();
  // });

  it('When you submit the form with a known entity the text input box will be cleared and the new entity gets added to the list', () => {
    let mockFollowing = [];
    const wrapper = shallow(<Follow following={mockFollowing} follow={() => mockFollowing.push({"handle":"new", "userHash": "wegwtrwrt"})} />);
    wrapper.find('#followHandle').simulate('change', {target: {value: 'Follow this'}});
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(wrapper.find('#followHandle').getElement().props.value).toEqual('');
    expect(wrapper.find('li').length).toEqual(1);
  });

  it('When you submit the form with a unknown entity the text input box will be cleared and the list stays the same', () => {
    let mockFollowing = [];
    const wrapper = shallow(<Follow following={mockFollowing} follow={() => jest.fn()} />);
    wrapper.find('#followHandle').simulate('change', {target: {value: 'Follow this'}});
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(wrapper.find('#followHandle').getElement().props.value).toEqual('');
    expect(wrapper.find('li').length).toEqual(0);
  });

  it('When you click the Unfollow button the entity is removed from the list of entities you are following', () => {
    const mockFollowing = [
      {"handle":"@philt3r", "userHash": "wegwtrwrt"},
      {"handle":"Test 2", "userHash": "dddd"}
    ];
    const wrapper = shallow(<Follow following={mockFollowing} unfollow={() => mockFollowing.splice(0, 1)}/>);
    wrapper.find('li').first().find('button').simulate('click', {target: {value: 'dddd'}});
    expect(wrapper.find('li').length).toEqual(1);
  });
})
