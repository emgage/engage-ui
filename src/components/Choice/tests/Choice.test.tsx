import * as React from 'react';
import { mount } from 'enzyme';
import Choice from '../Choice';

describe('<Choice />', () => {
  it('uses the id as the for attribute of a label', () => {
    const element = mount(<Choice id="MyChoice" label="Label" />);
    const label = element.find('label');

    expect(label.prop('htmlFor')).toBe('MyChoice');
    expect(label.text()).toBe('Label');
  });

  // We want the entire choice to be clickable, including the space
  // between the choice and the visual appearance of the label.
  it('renders the content as a child of the label', () => {
    const MYCOMPONENT = () => {
      return (
        <div />
      ); 
    };

    const element = mount(<Choice id="MyChoice" label="Label"><MYCOMPONENT /></Choice>);
    const label = element.find('label');

    expect(label.containsMatchingElement(<MYCOMPONENT />)).toBe(true);
  });
});
