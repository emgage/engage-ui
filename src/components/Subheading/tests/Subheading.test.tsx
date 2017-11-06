import * as React from 'react';
import { mount } from 'enzyme';
import Subheading from '../Subheading';

const theme = {
  subheading: 'Subheading',
};

describe('<Subheading />', () => {

  describe('when default props are provided', () => {
    it('basic subheading should have rendered one h3 element', () => {
      const subheadingWrapper = mount(
                                      <Subheading theme={theme} />
                                );
      expect(subheadingWrapper.find('h3')).toHaveLength(1);
    });
    it('basic subheading should have default Subheading css class on h3', () => {
      const subheadingWrapper = mount(
                                      <Subheading theme={theme} />
                                );
      expect(subheadingWrapper.find('h3').hasClass('Subheading')).toBe(true);
    });
  });

  describe('children property', () => {
    describe('when set', () => {
      it('basic subheading should have rendered one h3 element', () => {
        const subheadingWrapper = mount(
                                          <Subheading theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.find('h3')).toHaveLength(1);
      });
      it('basic subheading should have default Subheading css class on h3', () => {
        const subheadingWrapper = mount(
                                          <Subheading theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.find('h3').hasClass('Subheading')).toBe(true);
      });
      it('should verify children property is defined', () => {
        const subheadingWrapper = mount(
                                          <Subheading theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.prop('children')).toBe('Online store dashboard');
      });
    });

    describe('when not set', () => {
      it('basic subheading should have rendered one h3 element', () => {
        const subheadingWrapper = mount(
                                          <Subheading theme={theme} />
                                  );
        expect(subheadingWrapper.find('h3')).toHaveLength(1);
      });
      it('basic subheading should have default Subheading css class on h3', () => {
        const subheadingWrapper = mount(
                                          <Subheading theme={theme} />
                                  );
        expect(subheadingWrapper.find('h3').hasClass('Subheading')).toBe(true);
      });
      it('should verify children property is not defined', () => {
        const subheadingWrapper = mount(
                                          <Subheading theme={theme} />
                                  );
        expect(subheadingWrapper.prop('children')).toBeUndefined();
      });
      it('should not have children property', () => {
        const subheadingWrapper = mount(
                                          <Subheading theme={theme} />
                                  );
        expect(subheadingWrapper.find('children')).toHaveLength(0);
      });
    });
  });

  describe('element property', () => {
    describe('when set', () => {
      it('basic subheading should have default Subheading css class on element property', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h1" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.find('h1').hasClass('Subheading')).toBe(true);
      });
      it('subheading should have rendered one h1 element when set as h1', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h1" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.find('h1')).toHaveLength(1);
      });
      it('should verify element property when set as h1', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h1" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.prop('element')).toBe('h1');
      });
      it('subheading should have rendered one h2 element when set as h2', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h2" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.find('h2')).toHaveLength(1);
      });
      it('should verify element property when set as h2', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h2" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.prop('element')).toBe('h2');
      });
      it('subheading should have rendered one h3 element when set as h3', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h3" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.find('h3')).toHaveLength(1);
      });
      it('should verify element property when set as h3', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h3" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.prop('element')).toBe('h3');
      });
      it('subheading should have rendered one h4 element when set as h4', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h4" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.find('h4')).toHaveLength(1);
      });
      it('should verify element property when set as h4', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h4" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.prop('element')).toBe('h4');
      });
      it('subheading should have rendered one h5 element when set as h5', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h5" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.find('h5')).toHaveLength(1);
      });
      it('should verify element property when set as h5', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h5" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.prop('element')).toBe('h5');
      });
      it('subheading should have rendered one h6 element when set as h6', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h6" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.find('h6')).toHaveLength(1);
      });
      it('should verify element property when set as h6', () => {
        const subheadingWrapper = mount(
                                          <Subheading element="h6" theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.prop('element')).toBe('h6');
      });
    });

    describe('when not set', () => {
      it('basic subheading should have rendered one h3 element', () => {
        const subheadingWrapper = mount(
                                          <Subheading theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.find('h3')).toHaveLength(1);
      });
      it('basic subheading should have default Heading css class on h3', () => {
        const subheadingWrapper = mount(
                                          <Subheading theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.find('h3').hasClass('Subheading')).toBe(true);
      });
      it('should verify element property is not defined', () => {
        const subheadingWrapper = mount(
                                          <Subheading theme={theme}>
                                              Online store dashboard
                                          </Subheading>
                                  );
        expect(subheadingWrapper.prop('element')).toBeUndefined();
      });
      it('should not have element property', () => {
        const subheadingWrapper = mount(
                                        <Subheading theme={theme}>
                                            Online store dashboard
                                        </Subheading>
                                  );
        expect(subheadingWrapper.find('element')).toHaveLength(0);
      });
    });
  });
});
