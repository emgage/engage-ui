import * as React from 'react';
import { mount } from 'enzyme';
import Avatar from '../Avatar';

describe('Avatar Component Test Suit', () => {
    describe('Verify Avatar component size', () => {
      it('should verify the avatar image size prop set as default', () => {
          const avatarWrapper = mount(<Avatar customer />);
          expect(avatarWrapper.prop('size')).toBeFalsy();
          });

      it('should verify the avatar image size prop set as small', () => {
        const avatarWrapper = mount(<Avatar customer size="small" />);
        expect(avatarWrapper.prop('size')).toBe('small');
        });

      it('should verify the avatar image size prop set as medium', () => {
        const avatarWrapper = mount(<Avatar customer size="medium" />);
        expect(avatarWrapper.prop('size')).toBe('medium');
        });

      it('should verify the avatar image size prop set as large', () => {
        const avatarWrapper = mount(<Avatar customer size="large" />);
        expect(avatarWrapper.prop('size')).toBe('large');
        });
    });

    describe('Verify Avatar component name, initials, customer, source and accessibilityLabel prop', () => {
      it('should verify the avatar image name prop', () => {
        const avatarWrapper = mount(<Avatar customer={false} name="Hardik Shah" />);
        expect(avatarWrapper.prop('name')).toBe('Hardik Shah');
        });

      it('should verify the avatar initials prop', () => {
        const avatarWrapper = mount(<Avatar customer initials="HS" />);
        expect(avatarWrapper.prop('initials')).toBe('HS');
        });

      it('should verify the avatar customer prop set as true', () => {
        const avatarWrapper = mount(<Avatar customer initials="HS" size="small" />);
        expect(avatarWrapper.prop('customer')).toBe(true);
        });

      it('should verify the avatar customer prop set as fasle', () => {
        const avatarWrapper = mount(<Avatar customer={false} />);
        expect(avatarWrapper.prop('customer')).toBe(false);
        });

      it('should verify the avatar source prop', () => {
        const avatarWrapper = mount(<Avatar customer  size="small" accessibilityLabel="helloavatar"
        source="http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg" />);
        expect(avatarWrapper.prop('source')).toBe('http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg');
        });

      it('should verify the avatar accessibilityLabel prop', () => {
        const avatarWrapper = mount(<Avatar customer  size="small"  accessibilityLabel="helloavatar"/>);
        expect(avatarWrapper.prop('accessibilityLabel')).toBe('helloavatar');
        });
    });

    describe('Verify Avatar component prop datatype', () => {
      it('should verify the avatar name prop datatype', () => {
        const avatarWrapper = mount(<Avatar customer={ false } name="Hardik Shah" />).prop('name');
        expect(typeof (avatarWrapper)).toBe('string');
        });

      it('should verify the avatar initials prop datatype', () => {
        const avatarWrapper = mount(<Avatar customer={ false } initials="HS" />).prop('initials');
        expect(typeof (avatarWrapper)).toBe('string');
        });

      it('should verify the avatar customer prop datatype', () => {
        const avatarWrapper = mount(<Avatar customer={ false } />).prop('customer');
        expect(typeof (avatarWrapper)).toBe('boolean');
        });

      it('should verify the avatar source prop datatype', () => {
        const avatarWrapper = mount(<Avatar customer={ false }
        source="http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg" />).prop('source');
        expect(typeof (avatarWrapper)).toBe('string');
        });

      it('should verify the avatar accessibilityLabel prop datatype', () => {
        const avatarWrapper = mount(<Avatar customer={ false } accessibilityLabel="helloavatar" />).prop('accessibilityLabel');
        expect(typeof (avatarWrapper)).toBe('string');
        });
    });
});
