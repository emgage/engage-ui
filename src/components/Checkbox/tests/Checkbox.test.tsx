import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Checkbox from '../Checkbox';

describe('<Checkbox />', () => {
  it('sets all pass through properties on the input', () => {
    const subject = shallow(
      <Checkbox
        label="Checkbox"
        checked
        name="Checkbox"
        value="Some value"
      />,
    );

    expect(subject.prop('checked')).toBe(true);
    expect(subject.prop('name')).toBe('Checkbox');
    expect(subject.prop('value')).toBe('Some value');
  });

  describe('onChange()', () => {
    it('is called with the new checked value of the input on change', () => {
      const spy = jest.fn();
      const subject = mount(<Checkbox label="Checkbox" onChange={spy} />);

      (subject.find('input') as any).node.checked = true;
      subject.find('input').simulate('change');
      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mount(<Checkbox label="Checkbox" onFocus={spy} />);
      element.find('input').simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mount(<Checkbox label="Checkbox" onBlur={spy} />);
      element.find('input').simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = mount(<Checkbox id="MyCheckbox" label="Checkbox" />).find('input').prop('id');
      expect(id).toBe('MyCheckbox');
    });

    it('sets a random id on the input when none is passed', () => {
      const id = mount(<Checkbox label="Checkbox" />).find('input').prop('id');
      expect(typeof id).toBe('string');
      expect(id).toBeTruthy();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the input', () => {
      const button = mount(<Checkbox label="Checkbox" disabled />);
      expect(button.find('input').prop('disabled')).toBe(true);
    });

    it('is only disabled when disabled is explicitly set to true', () => {
      let element = mount(<Checkbox label="Checkbox" />);
      expect(element.find('input').prop('disabled')).toBeFalsy();

      element = mount(<Checkbox label="Checkbox" disabled={false} />);
      expect(element.find('input').prop('disabled')).toBeFalsy();
    });
  });

  describe('helpText', () => {
    it('connects the input to the help text', () => {
      const checkbox = mount(<Checkbox label="Checkbox" helpText="Some help" />);
      const helpTextID = checkbox.find('input').prop<string>('aria-describedby');
      expect(typeof helpTextID).toBe('string');
      expect(checkbox.find(`#${helpTextID}`).text()).toBe('Some help');
    });
  });

  describe('error', () => {
    it('marks the input as invalid', () => {
      const checkbox = mount(<Checkbox error label="Checkbox" />);
      expect(checkbox.find('input').prop<string>('aria-invalid')).toBe(true);

      checkbox.setProps({ error: 'Some error' });
      expect(checkbox.find('input').prop<string>('aria-invalid')).toBe(true);
    });

    it('connects the input to the error', () => {
      const checkbox = mount(<Checkbox label="Checkbox" error="Some error" />);
      const errorID = checkbox.find('input').prop<string>('aria-describedby');
      expect(typeof errorID).toBe('string');
      expect(checkbox.find(`#${errorID}`).text()).toBe('Some error');
    });

    it('connects the input to both an error and help text', () => {
      const checkbox = mount(<Checkbox label="Checkbox" error="Some error" helpText="Some help" />);
      const descriptions = checkbox.find('input').prop<string>('aria-describedby').split(' ');
      expect(descriptions.length).toBe(2);
      expect(checkbox.find(`#${descriptions[0]}`).text()).toBe('Some error');
      expect(checkbox.find(`#${descriptions[1]}`).text()).toBe('Some help');
    });
  });
});
