import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Link from '../Link';
const theme = {
  external: 'external',
  url: 'https://www.google.co.in',
  children: 'children',
};

describe('<Link />', () => {

  describe('onClick()', () => {
    it('should verify the Link is clicked', () => {
      const spy = jest.fn();
      const linkWrapper = shallow(
                                <Link onClick={spy}>
                                    Test
                                </Link>
                                );
      linkWrapper.simulate('click');
    });
  });
  describe('external property', () => {
    describe('when not set', () => {
      it('should not have external element', () => {
        const linkWrapper = mount(
                                <Link />
                            );
        expect(linkWrapper.find('external')).toHaveLength(0);
      });
      it('should external element is undfine', () => {
        const linkWrapper = mount(
                                <Link />
                            );
        expect(linkWrapper.prop('external')).toBeUndefined();
      });
    });
    describe('when set to true', () => {
      it('should verify the external is true', () => {
        const linkWrapper = mount(
                                    <Link external />
                                );
        expect(linkWrapper.prop('external')).toBe(true);
      });
    });
    describe('when set to false', () => {
      it('should verify the external is false', () => {
        const linkWrapper = mount(
                                    <Link external={false} />
                                );
        expect(linkWrapper.prop('external')).toBe(false);
      });
    });
  });
  describe('url prop', () => {
    describe('when set', () => {
      it('should verify the url', () => {
        const linkWrapper = mount(
                                        <Link url={theme.url}/>
                                     );
        expect(linkWrapper.prop('url')).toBe(theme.url);
      });
    });
    describe('when not set', () => {
      it('should verify the url', () => {
        const linkWrapper = mount(
                                        <Link />
                                     );
        expect(linkWrapper.prop('url')).toBeUndefined();
      });
      it('should not have url element', () => {
        const linkWrapper = mount(
                                        <Link />
                                     );
        expect(linkWrapper.find('url')).toHaveLength(0);
      });
    });
  });
  describe('set children property', () => {
    it('should verify children text', () => {
      const linkWrapper = mount(
                                <Link>
                                  Please click here
                                </Link>);
      expect(linkWrapper.prop('children')).toBe('Please click here');
    });
  });
});
