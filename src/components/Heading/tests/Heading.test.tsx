import * as React from 'react';
import { mount } from 'enzyme';
import Heading from '../Heading';

const theme = {
  heading: 'Heading',
};

describe('<Heading />', () => {
  describe('when default props are provided', () => {
    it('basic heading should have rendered one h2 element', () => {
      const headingWrapper = mount(
                                        <Heading theme={theme} />
                                    );
      expect(headingWrapper.find('h2')).toHaveLength(1);
    });
    it('basic heading should have default Heading css class on h2', () => {
      const headingWrapper = mount(
                                        <Heading theme={theme} />
                                    );
      expect(headingWrapper.find('h2').hasClass('Heading')).toBe(true);
    });
  });

  describe('children property', () => {
    describe('when set', () => {
      it('basic heading should have rendered one h2 element', () => {
        const headingWrapper = mount(
                                            <Heading theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.find('h2')).toHaveLength(1);
      });
      it('basic heading should have default Heading css class on h2', () => {
        const headingWrapper = mount(
                                            <Heading theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.find('h2').hasClass('Heading')).toBe(true);
      });
      it('should verify children property is defined', () => {
        const headingWrapper = mount(
                                            <Heading theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.prop('children')).toBe('Online store dashboard');
      });
    });

    describe('when not set', () => {
      it('basic heading should have rendered one h2 element', () => {
        const headingWrapper = mount(
                                            <Heading theme={theme} />
                                        );
        expect(headingWrapper.find('h2')).toHaveLength(1);
      });
      it('basic heading should have default Heading css class on h2', () => {
        const headingWrapper = mount(
                                            <Heading theme={theme} />
                                        );
        expect(headingWrapper.find('h2').hasClass('Heading')).toBe(true);
      });
      it('should verify children property is not defined', () => {
        const headingWrapper = mount(
                                            <Heading theme={theme} />
                                        );
        expect(headingWrapper.prop('children')).toBeUndefined();
      });
      it('should not have children property', () => {
        const headingWrapper = mount(
                                        <Heading theme={theme} />
                                    );
        expect(headingWrapper.find('children')).toHaveLength(0);
      });
    });
  });

  describe('element property', () => {
    describe('when set', () => {
      it('basic heading should have default Heading css class on element property', () => {
        const headingWrapper = mount(
                                            <Heading element="h1" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.find('h1').hasClass('Heading')).toBe(true);
      });
      it('heading should have rendered one h1 element when set as h1', () => {
        const headingWrapper = mount(
                                            <Heading element="h1" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.find('h1')).toHaveLength(1);
      });
      it('should verify element property when set as h1', () => {
        const headingWrapper = mount(
                                            <Heading element="h1" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.prop('element')).toBe('h1');
      });
      it('heading should have rendered one h2 element when set as h2', () => {
        const headingWrapper = mount(
                                            <Heading element="h2" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.find('h2')).toHaveLength(1);
      });
      it('should verify element property when set as h2', () => {
        const headingWrapper = mount(
                                            <Heading element="h2" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.prop('element')).toBe('h2');
      });
      it('heading should have rendered one h3 element when set as h3', () => {
        const headingWrapper = mount(
                                            <Heading element="h3" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.find('h3')).toHaveLength(1);
      });
      it('should verify element property when set as h3', () => {
        const headingWrapper = mount(
                                            <Heading element="h3" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.prop('element')).toBe('h3');
      });
      it('heading should have rendered one h4 element when set as h4', () => {
        const headingWrapper = mount(
                                            <Heading element="h4" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.find('h4')).toHaveLength(1);
      });
      it('should verify element property when set as h4', () => {
        const headingWrapper = mount(
                                            <Heading element="h4" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.prop('element')).toBe('h4');
      });
      it('heading should have rendered one h5 element when set as h5', () => {
        const headingWrapper = mount(
                                            <Heading element="h5" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.find('h5')).toHaveLength(1);
      });
      it('should verify element property when set as h5', () => {
        const headingWrapper = mount(
                                            <Heading element="h5" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.prop('element')).toBe('h5');
      });
      it('heading should have rendered one h6 element when set as h6', () => {
        const headingWrapper = mount(
                                            <Heading element="h6" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.find('h6')).toHaveLength(1);
      });
      it('should verify element property when set as h6', () => {
        const headingWrapper = mount(
                                            <Heading element="h6" theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.prop('element')).toBe('h6');
      });
    });

    describe('when not set', () => {
      it('basic heading should have rendered one h2 element', () => {
        const headingWrapper = mount(
                                            <Heading theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.find('h2')).toHaveLength(1);
      });
      it('basic heading should have default Heading css class on h2', () => {
        const headingWrapper = mount(
                                            <Heading theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.find('h2').hasClass('Heading')).toBe(true);
      });
      it('should verify element property is not defined', () => {
        const headingWrapper = mount(
                                            <Heading theme={theme}>
                                                Online store dashboard
                                            </Heading>
                                        );
        expect(headingWrapper.prop('element')).toBeUndefined();
      });
      it('should not have element property', () => {
        const headingWrapper = mount(
                                        <Heading theme={theme}>
                                            Online store dashboard
                                        </Heading>
                                    );
        expect(headingWrapper.find('element')).toHaveLength(0);
      });
    });
  });
});
