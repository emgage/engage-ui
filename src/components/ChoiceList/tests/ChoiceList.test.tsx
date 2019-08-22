import * as React from 'react';
import { shallow, mount } from 'enzyme';

import ChoiceList from '../ChoiceList';
import RadioButton from '../../RadioButton';
import Checkbox from '../../Checkbox';

const theme = {
  choiceList: 'choiceList',
  titleHidden: 'titleHidden',
  choices: 'choices',
  title: 'title',
};

describe('<ChoiceList />', () => {
  let choices: ({ label: string, value: string })[];

  beforeEach(() => {
    choices = [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
      { label: 'Three', value: 'three' },
    ];
  });
  describe('when default props are provided', () => {
    it('should verify renders a fieldset', () => {
      const element = mount(
                            <ChoiceList selected={[]} choices={choices} theme={theme} />
                          );
      expect(element.find('div').exists()).toBe(true);
      expect(element.find('div').at(0).hasClass('choiceList')).toBe(true);
    });
  });

  describe('title property', () => {
    describe('when not set', () => {
      it('should verify not renders a legend for the fieldset', () => {
        const element = mount(
                              <ChoiceList selected={[]} choices={choices} theme={theme} />
                             );
        expect(element.prop('div')).toBeUndefined();
      });
    });
    describe('when set', () => {
      it('should verify renders a legend for the fieldset', () => {
        const element = mount(
                              <ChoiceList componentTitle="My title" selected={[]} choices={choices} theme={theme} />
                             );
        expect(element.find('div.title')).toHaveLength(1);
        expect(element.find('div').at(1).hasClass('title')).toBe(true);
        expect(element.find('div').at(1).text()).toBe('My title');
      });
    });
  });

  describe('choices property', () => {
    it('shoild verify renders a choice with the label and value properties', () => {
      const choiceElements = mount(
                                   <ChoiceList selected={[]} choices={choices} theme={theme} />
                                  ).find(RadioButton);
      choiceElements.forEach((choiceElement, index) => {
        expect(choiceElement.prop('label')).toBe(choices[index].label);
        expect(choiceElement.prop('value')).toBe(choices[index].value);
      });
    });
  });

  describe('selected property', () => {
    it('sets the appropriate choices to be selected', () => {
      const selectedIndexes = [0, 2];
      const selected = selectedIndexes.map(index => choices[index].value);
      const choiceElements = mount(
                                   <ChoiceList selected={selected} choices={choices} theme={theme} />
                                  ).find(RadioButton);
      choiceElements.forEach((choiceElement, index) => {
        expect(choiceElement.prop('checked')).toBe(selectedIndexes.includes(index));
      });
    });
  });

  describe('name property', () => {
    it('provides a unique name when none is provided', () => {
      const choiceElements = shallow(
                                     <ChoiceList selected={[]} choices={choices} theme={theme} />
                                    ).find(RadioButton);
      let name: string;

      choiceElements.forEach((choiceElement) => {
        const choiceName = choiceElement.prop<string>('componentName');
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
      const choiceElements = shallow(
                                     <ChoiceList componentName={name} selected={[]} choices={choices} theme={theme} />
                                    ).find(RadioButton);
      choiceElements.forEach((choiceElement) => {
        expect(choiceElement.prop('componentName')).toBe(name);
      });
    });

    it('postpends [] when multiple options are allowed', () => {
      const name = 'MyChoiceList';
      const choiceElements = shallow(
                                     <ChoiceList allowMultiple componentName={name} selected={[]} choices={choices} theme={theme} />
                                    ).find(RadioButton);
      choiceElements.forEach((choiceElement) => {
        expect(choiceElement.prop('componentName')).toBe(`${name}[]`);
      });
    });
  });

  describe('allowMultiple property', () => {
    it('renders a radio button for each option when allowMultiple is not true', () => {
      let element = mount(
                          <ChoiceList selected={[]} choices={choices} theme={theme} />
                         );
      expect(element.find(RadioButton).length).toBe(choices.length);
      expect(element.find(Checkbox).exists()).toBe(false);

      element = mount(
                      <ChoiceList selected={[]} choices={choices} allowMultiple={false} theme={theme} />
                     );
      expect(element.find(RadioButton).length).toBe(choices.length);
      expect(element.find(Checkbox).exists()).toBe(false);
    });

    it('renders a checkbox each option when allowMultiple is true', () => {
      const element = mount(
                            <ChoiceList allowMultiple selected={[]} choices={choices} theme={theme} />
                           );
      expect(element.find(RadioButton).exists()).toBe(false);
      expect(element.find(Checkbox).length).toBe(choices.length);
    });
  });

  describe('titlehidden property', () => {
    describe('when not set', () => {
      it('should verify not renders a titlehidden for the choicelist', () => {
        const element = mount(
                              <ChoiceList selected={[]} choices={choices} theme={theme} />
                             );
        expect(element.prop('titleHidden')).toBeUndefined();
        expect(element.find('div').at(0).hasClass('titleHidden')).toBe(false);
      });
    });
    describe('when  set as true', () => {
      it('should verify renders a titlehidden for the choicelist when set as true', () => {
        const element = mount(
                              <ChoiceList componentTitle="My title" titleHidden={true}
                              selected={[]} choices={choices} theme={theme} />
                             );
        expect(element.prop('titleHidden')).toBe(true);
        expect(element.find('div').at(0).hasClass('titleHidden')).toBe(true);
      });
    });
    describe('when  set as false', () => {
      it('should verify renders a titlehidden for the choicelist when set as false', () => {
        const element = mount(
                              <ChoiceList componentTitle="My title" titleHidden={false}
                              selected={[]} choices={choices} theme={theme} />
                             );
        expect(element.prop('titleHidden')).toBe(false);
        expect(element.find('div').at(0).hasClass('titleHidden')).toBe(false);
      });
    });
  });
});
