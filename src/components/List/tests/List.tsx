import * as React from 'react';
import { mount } from 'enzyme';
import List from '../List';

describe('<List />', () => {
  it('sets the list type to ul when is a bullet list', () => {
    const list = mount(<List componentType="bullet">test</List>);
    expect(list.find('ul').exists()).toBeTruthy();
  });

  it('sets the list type to ul when no type is provided', () => {
    const list = mount(<List>test</List>);
    expect(list.find('ul').exists()).toBeTruthy();
  });

  it('sets the list type to ol when is a number list', () => {
    const list = mount(<List componentType="number">test</List>);
    expect(list.find('ol').exists()).toBeTruthy();
  });
});
