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
        expect(spinnerWrapper.prop('componentSize')).toBeFalsy();
      });
    });
    describe('size property large applied', () => {
      const spinnerWrapper = mount(
        <Spinner componentSize="large" />
      );
      it('Basic Spinner have rendered one span element', () => {
        expect(spinnerWrapper.find('span')).toHaveLength(1);
      });
      it('varify size property when it set to large', () => {
        expect(spinnerWrapper.prop('componentSize')).toBe('large');
      });
    });
    describe('when size property small applied', () => {
      const spinnerWrapper = mount(
        <Spinner componentSize="small" />
      );
      it('Basic Spinner have rendered one span element', () => {
        expect(spinnerWrapper.find('span')).toHaveLength(1);
      });
      it('varify size property when it set to small', () => {
        expect(spinnerWrapper.prop('componentSize')).toBe('small');
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
        expect(spinnerWrapper.prop('componentColor')).toBeFalsy();
      });
    });
    describe('when set to reverse', () => {
      const spinnerWrapper = mount(
        <Spinner componentColor="reverse" />
      );
      it('Basic Spinner have rendered one span element', () => {
        expect(spinnerWrapper.find('span')).toHaveLength(1);
      });
      it('Varify color property when it is set to reverse', () => {
        expect(spinnerWrapper.prop('componentColor')).toBe('reverse');
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
      <Spinner componentColor="disabled" componentSize="small" accessibilityLabel="loading" />
    );
    it('varify size property when it set to small', () => {
      expect(spinnerWrapper.prop('componentSize')).toBe('small');
    });
    it('Basic Spinner have rendered one span element', () => {
      expect(spinnerWrapper.find('span')).toHaveLength(1);
    });
    it('Varify color property when it is set to disabled', () => {
      expect(spinnerWrapper.prop('componentColor')).toBe('disabled');
    });
    it('Varify accessibilityLabel property when it is set', () => {
      expect(spinnerWrapper.prop('accessibilityLabel')).toBe('loading');
    });
    it('Varify aria-label property of span when accessibilityLabel prop is not set', () => {
      expect(spinnerWrapper.find('span').prop('aria-label')).toBe('loading');
    });
  });
});
