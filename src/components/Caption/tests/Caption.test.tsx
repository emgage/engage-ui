import * as React from 'react';
import { mount } from 'enzyme';
import Caption from './../Caption';

describe('<Caption />', () => {
  describe('When no child provided', () => {
    const captionWrapper =  mount(
      <Caption />
    );
    it('It should have renderer blank p', () => {
      expect(captionWrapper.find('p').length).toBe(1);
      expect(captionWrapper.find('p').text()).toBe('');
    });
    it('It should not have child prop', () => {
      expect(captionWrapper.prop('children')).toBeUndefined();
    });
    it('p should not have class', () => {
      expect(captionWrapper.find('p').at(0).hasClass('caption')).toBe(false);
    });
  });
  describe('When child provided', () => {
    const captionWrapper =  mount(
      <Caption>text12</Caption>
    );
    it('It should have renderer p with child', () => {
      expect(captionWrapper.find('p').length).toBe(1);
      expect(captionWrapper.find('p').text()).toBe('text12');
    });
    it('It should have child prop', () => {
      expect(captionWrapper.prop('children')).toBe('text12');
    });
    it('p should not have class', () => {
      expect(captionWrapper.find('p').at(0).hasClass('caption')).toBe(false);
    });
  });
  describe('When child and theme provided', () => {
    const theme = {
      caption: 'caption',
    };
    const captionWrapper =  mount(
      <Caption theme={theme}>text12</Caption>
    );
    it('It should have renderer p with child', () => {
      expect(captionWrapper.find('p').length).toBe(1);
      expect(captionWrapper.find('p').text()).toBe('text12');
    });
    it('It should have child prop', () => {
      expect(captionWrapper.prop('children')).toBe('text12');
    });
    it('p should have a class', () => {
      expect(captionWrapper.find('p').at(0).hasClass('caption')).toBe(true);
    });
  });
});
