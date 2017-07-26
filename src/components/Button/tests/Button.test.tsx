import * as React from 'react';
import { shallow } from 'enzyme';
import Button from './../Button';

describe('<Button />', () => {
  describe('onClick()', () => {
    it('is called when the button is clicked', () => {
      const spy = jest.fn();
      shallow(<Button onClick={spy}>Test</Button>).simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onFocus()', () => {
    it('is called when the button is focused', () => {
      const spy = jest.fn();
      shallow(<Button onFocus={spy}>Test</Button>).simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the button is blurred', () => {
      const spy = jest.fn();
      shallow(<Button onBlur={spy}>Test</Button>).simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the button', () => {
      const button = shallow(<Button disabled>Disabled test</Button>);
      expect(button.prop('disabled')).toBe(true);
    });

    it('sets the disabled attribute on the button', () => {
      const button = shallow(<Button disabled={false}>Disabled test</Button>);
      expect(button.prop('disabled')).toBeFalsy();
    });
  });

  describe('style', () => {
    it('sets the style attribute on the button to color: red ', () => {
      const button = shallow(<Button style={{ color: 'red' }}>Disabled test</Button>);
      expect(button.prop('style')).toMatchObject({ color: 'red' });
    });

    it('sets the style attribute on the button to undefined', () => {
      const button = shallow(<Button>Disabled test</Button>);
      expect(button.prop('style')).toBeUndefined();
    });
  });

  describe('submit', () => {
    it('sets the button’s type to submit', () => {
      const button = shallow(<Button submit>Submit test</Button>);
      expect(button.prop('submit')).toBe(true);
    });

    it('sets the button’s type to button when submit is not true', () => {
      let button = shallow(<Button>Button test</Button>);
      expect(button.prop('submit')).toBe(undefined);

      button = shallow(<Button submit={false}>Button test</Button>);
      expect(button.prop('submit')).toBe(false);
    });
  });

  describe('accessibilityLabel', () => {
    it('sets the aria-label on the button', () => {
      const button = shallow(<Button accessibilityLabel="This deletes a thing" icon="delete" />);
      expect(button.prop('accessibilityLabel')).toBe('This deletes a thing');
    });
  });
});
