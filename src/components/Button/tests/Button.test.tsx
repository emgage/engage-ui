import * as React from 'react';
import {mount} from 'enzyme';
import Button from '..';

describe('<Button />', () => {
  describe('onClick()', () => {
    it('is called when the button is clicked', () => {
      const spy = jest.fn();
      mount(<Button onClick={spy}>Test</Button>).simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onFocus()', () => {
    it('is called when the button is focused', () => {
      const spy = jest.fn();
      mount(<Button onFocus={spy}>Test</Button>).simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the button is blurred', () => {
      const spy = jest.fn();
      mount(<Button onBlur={spy}>Test</Button>).simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the button', () => {
      const button = mount(<Button disabled>Disabled test</Button>);
      expect(button.find('button').prop('disabled')).toBe(true);
    });

    it('sets the disabled attribute on the button', () => {
      const button = mount(<Button disabled={false}>Disabled test</Button>);
      expect(button.find('button').prop('disabled')).toBeFalsy();
    });
  });

  describe('style', () => {
    it('sets the style attribute on the button to color: red ', () => {
      const button = mount(<Button style={{color: 'red'}}>Disabled test</Button>);
      expect(button.find('button').prop('style').color).toBe('red');
    });

    it('sets the style attribute on the button to null', () => {
      const button = mount(<Button>Disabled test</Button>);
      expect(button.find('button').prop('style')).toBeUndefined();
    });
  });

  describe('submit', () => {
    it('sets the button’s type to submit', () => {
      const button = mount(<Button submit>Submit test</Button>);
      expect(button.find('button').prop('type')).toBe('submit');
    });

    it('sets the button’s type to button when submit is not true', () => {
      let button = mount(<Button>Button test</Button>);
      expect(button.find('button').prop('type')).toBe('button');

      button = mount(<Button submit={false}>Button test</Button>);
      expect(button.find('button').prop('type')).toBe('button');
    });
  });

  describe('accessibilityLabel', () => {
    it('sets the aria-label on the button', () => {
      const button = mount(<Button accessibilityLabel="This deletes a thing">Button</Button>);
      // For some reason, TSLint complains about needing to pass an explicit prop.
      // tslint:disable-next-line
      expect(button.find('button').prop('aria-label')).toBe('This deletes a thing');
    });
  });
});
