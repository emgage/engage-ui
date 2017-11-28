import * as React from 'react';
import { mount } from 'enzyme';
import Spinner from '../Spinner';

describe('<Spinner />', () => {
  describe('When default props provided', () => {
    const spinnerWrapper = mount(
      <Spinner />
    );
    it('Basic Spinner have rendered one span element', () => {
      expect(spinnerWrapper.find('span')).toHaveLength(1);
    });
  });

  describe('size property ', () => {
    describe('When not set', () => {
      const spinnerWrapper = mount(
        <Spinner />
      );
      it('Basic Spinner have rendered one span element', () => {
        expect(spinnerWrapper.find('span')).toHaveLength(1);
      });
      it('varify size property when it is not set', () => {
        expect(spinnerWrapper.prop('size')).toBeFalsy();
      });
    });
    describe('size property large applied', () => {
      const spinnerWrapper = mount(
        <Spinner size="large" />
      );
      it('Basic Spinner have rendered one span element', () => {
        expect(spinnerWrapper.find('span')).toHaveLength(1);
      });
      it('varify size property when it set to large', () => {
        expect(spinnerWrapper.prop('size')).toBe('large');
      });
    });
    describe('when size property small applied', () => {
      const spinnerWrapper = mount(
        <Spinner size="small" />
      );
      it('Basic Spinner have rendered one span element', () => {
        expect(spinnerWrapper.find('span')).toHaveLength(1);
      });
      it('varify size property when it set to small', () => {
        expect(spinnerWrapper.prop('size')).toBe('small');
      });
    });
  });

  describe('color property', () => {
    describe('when not set', () => {
      const spinnerWrapper = mount(
        <Spinner />
      );
      it('Basic Spinner have rendered one span element', () => {
        expect(spinnerWrapper.find('span')).toHaveLength(1);
      });
      it('Varify color property when it is not set', () => {
        expect(spinnerWrapper.prop('color')).toBeFalsy();
      });
    });
    describe('when set to white', () => {
      const spinnerWrapper = mount(
        <Spinner color="white" />
      );
      it('Basic Spinner have rendered one span element', () => {
        expect(spinnerWrapper.find('span')).toHaveLength(1);
      });
      it('Varify color property when it is set to white', () => {
        expect(spinnerWrapper.prop('color')).toBe('white');
      });
    });
  });

  describe('accessibilityLabel property', () => {
    describe('when not set', () => {
      const spinnerWrapper = mount(
        <Spinner />
      );
      it('Basic Spinner have rendered one span element', () => {
        expect(spinnerWrapper.find('span')).toHaveLength(1);
      });
      it('Varify accessibilityLabel property when it is not set', () => {
        expect(spinnerWrapper.prop('accessibilityLabel')).toBeFalsy();
      });
      it('Varify aria-label property of span when accessibilityLabel prop is not set', () => {
        expect(spinnerWrapper.find('span').prop('aria-label')).toBeFalsy();
      });
    });
    describe('when set to loading', () => {
      const spinnerWrapper = mount(
        <Spinner accessibilityLabel="loading" />
      );
      it('Basic Spinner have rendered one span element', () => {
        expect(spinnerWrapper.find('span')).toHaveLength(1);
      });
      it('Varify accessibilityLabel property when it is set', () => {
        expect(spinnerWrapper.prop('accessibilityLabel')).toBe('loading');
      });
      it('Varify aria-label property of span when accessibilityLabel prop is set', () => {
        expect(spinnerWrapper.find('span').prop('aria-label')).toBe('loading');
      });
    });
  });

  describe('verify all property together', () => {
    const spinnerWrapper = mount(
      <Spinner color="inkLightest" size="small" accessibilityLabel="loading" />
    );
    it('varify size property when it set to small', () => {
      expect(spinnerWrapper.prop('size')).toBe('small');
    });
    it('Basic Spinner have rendered one span element', () => {
      expect(spinnerWrapper.find('span')).toHaveLength(1);
    });
    it('Varify color property when it is set to inkLightest', () => {
      expect(spinnerWrapper.prop('color')).toBe('inkLightest');
    });
    it('Varify accessibilityLabel property when it is set', () => {
      expect(spinnerWrapper.prop('accessibilityLabel')).toBe('loading');
    });
    it('Varify aria-label property of span when accessibilityLabel prop is not set', () => {
      expect(spinnerWrapper.find('span').prop('aria-label')).toBe('loading');
    });
  });
});
