import * as React from 'react';
import { mount } from 'enzyme';
import Heading from '../Heading';

describe('<Heading />', () => {
  describe('Test children property', () => {
    it('should verify children property is defined', () => {
      const headingWrapper = mount(<Heading>Online store dashboard</Heading>);
      expect(headingWrapper.prop('children')).toBe('Online store dashboard');
    });

    it('should verify children property is not defined', () => {
      const headingWrapper = mount(<Heading/>);
      expect(headingWrapper.prop('children')).toBeUndefined();
    });
  });

  describe('Test element property', () => {
    it('should verify element property when set as h1', () => {
      const headingWrapper = mount(<Heading element="h1">Online store dashboard</Heading>);
      expect(headingWrapper.prop('element')).toBe('h1');
    });

    it('should verify element property when set as h2', () => {
      const headingWrapper = mount(<Heading element="h2">Online store dashboard</Heading>);
      expect(headingWrapper.prop('element')).toBe('h2');
    });

    it('should verify element property when set as h3', () => {
      const headingWrapper = mount(<Heading element="h3">Online store dashboard</Heading>);
      expect(headingWrapper.prop('element')).toBe('h3');
    });

    it('should verify element property when set as h4', () => {
      const headingWrapper = mount(<Heading element="h4">Online store dashboard</Heading>);
      expect(headingWrapper.prop('element')).toBe('h4');
    });

    it('should verify element property when set as h5', () => {
      const headingWrapper = mount(<Heading element="h5">Online store dashboard</Heading>);
      expect(headingWrapper.prop('element')).toBe('h5');
    });

    it('should verify element property when set as h6', () => {
      const headingWrapper = mount(<Heading element="h6">Online store dashboard</Heading>);
      expect(headingWrapper.prop('element')).toBe('h6');
    });

    it('should verify element property when set as p', () => {
      const headingWrapper = mount(<Heading element="p">Online store dashboard</Heading>);
      expect(headingWrapper.prop('element')).toBe('p');
    });

    it('should verify element property when not defined', () => {
      const headingWrapper = mount(<Heading>Online store dashboard</Heading>);
      expect(headingWrapper.prop('element')).toBeUndefined();
    });
  });
});
