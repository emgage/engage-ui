import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';

import ChoiceList from '../ChoiceList';
import RadioButton from '../../RadioButton';
import Checkbox from '../../Checkbox';

describe('<ChoiceList />', () => {
  let choices: ({ label: string, value: string })[];

  beforeEach(() => {
    choices = [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
      { label: 'Three', value: 'three' },
    ];
  });

  it('renders a fieldset', () => {
    const element = mount(<ChoiceList selected={[]} choices={choices} />);
    expect(element.find('fieldset').exists()).toBe(true);
  });

  describe('title', () => {
    it('renders a legend for the fieldset', () => {
      const element = mount(<ChoiceList title="My title" selected={[]} choices={choices} />);
      expect(element.find('legend').text()).toBe('My title');
    });
  });

  describe('choices', () => {
    it('renders a choice with the label and value properties', () => {
      const choiceElements = mount(<ChoiceList selected={[]} choices={choices} />).find(RadioButton);

      choiceElements.forEach((choiceElement, index) => {
        expect(choiceElement.prop('label')).toBe(choices[index].label);
        expect(choiceElement.prop('value')).toBe(choices[index].value);
      });
    });
  });

  describe('selected', () => {
    it('sets the appropriate choices to be selected', () => {
      const selectedIndexes = [0, 2];
      const selected = selectedIndexes.map(index => choices[index].value);
      const choiceElements = mount(<ChoiceList selected={selected} choices={choices} />).find(RadioButton);

      choiceElements.forEach((choiceElement, index) => {
        expect(choiceElement.prop('checked')).toBe(selectedIndexes.includes(index));
      });
    });
  });

  describe('onChange()', () => {
    it('is called with the newly-selected choices', () => {
      let selected = [choices[0].value];
      const spy = jest.fn((newSelected: string[]) => {
        selected = newSelected;
      });
      const choiceList = mount(<ChoiceList allowMultiple onChange={spy} selected={selected} choices={choices} />);
      const choiceElements = choiceList.find(Checkbox);
      changeCheckedForChoice(choiceElements.at(1), true);
      expect(spy).toHaveBeenLastCalledWith(['one', 'two']);
      choiceList.setProps({ selected });
      changeCheckedForChoice(choiceElements.at(2), true);
      expect(spy).toHaveBeenLastCalledWith(['one', 'two', 'three']);
      choiceList.setProps({ selected });
      changeCheckedForChoice(choiceElements.at(0), false);
      expect(spy).toHaveBeenLastCalledWith(['two', 'three']);
      choiceList.setProps({ selected });
    });

    function changeCheckedForChoice(choice: ReactWrapper<any, any>, checked: boolean, triggerChange = true) {
      const input = choice.find('input');
      (input as any).node.checked = checked;

      if (triggerChange) {
        input.simulate('change');
      }
    }
  });

  describe('name', () => {
    it('provides a unique name when none is provided', () => {
      const choiceElements = shallow(<ChoiceList selected={[]} choices={choices} />).find(RadioButton);
      let name: string;

      choiceElements.forEach((choiceElement) => {
        const choiceName = choiceElement.prop<string>('name');
        if (name == null) {
          name = choiceName;
        } else {
          expect(choiceName).toBe(name);
        }

        expect(typeof choiceName).toBe('string');
      });
    });

    it('uses the same name for every choice', () => {
      const name = 'MyChoiceList';
      const choiceElements = shallow(<ChoiceList name={name} selected={[]} choices={choices} />).find(RadioButton);
      choiceElements.forEach((choiceElement) => {
        expect(choiceElement.prop('name')).toBe(name);
      });
    });

    it('postpends [] when multiple options are allowed', () => {
      const name = 'MyChoiceList';
      const choiceElements = shallow(<ChoiceList allowMultiple name={name} selected={[]} choices={choices} />).find(RadioButton);

      choiceElements.forEach((choiceElement) => {
        expect(choiceElement.prop('name')).toBe(`${name}[]`);
      });
    });
  });

  describe('allowMultiple', () => {
    it('renders a radio button for each option when allowMultiple is not true', () => {
      let element = mount(<ChoiceList selected={[]} choices={choices} />);
      expect(element.find(RadioButton).length).toBe(choices.length);
      expect(element.find(Checkbox).exists()).toBe(false);

      element = mount(<ChoiceList selected={[]} choices={choices} allowMultiple={false} />);
      expect(element.find(RadioButton).length).toBe(choices.length);
      expect(element.find(Checkbox).exists()).toBe(false);
    });

    it('renders a checkbox each option when allowMultiple is true', () => {
      const element = mount(<ChoiceList allowMultiple selected={[]} choices={choices} />);
      expect(element.find(RadioButton).exists()).toBe(false);
      expect(element.find(Checkbox).length).toBe(choices.length);
    });
  });
});
