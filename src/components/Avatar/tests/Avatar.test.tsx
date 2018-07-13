import * as React from 'react';
import { mount } from 'enzyme';
import Avatar from '../Avatar';

const theme = {
  avatar: 'Avatar',
  sizeSmall: 'sizeSmall',
  sizeMedium: 'sizeMedium',
  sizeLarge: 'sizeLarge',
  styleOne: 'styleOne',
  styleTwo: 'styleTwo',
  styleThree: 'styleThree',
  styleFour: 'styleFour',
  styleFive: 'styleFive',
  styleSix: 'styleSix',
  hasImage: 'hasImage',
  Image: 'Image',
  Initials: 'Initials',
};

describe('<Avatar />', () => {
  describe('when default props are provided', () => {
    it('basic avatar should have rendered one div clss element', () => {
      const avatarWrapper = mount(
                                  <Avatar theme = {theme} />
                            );
      expect(avatarWrapper.find('div')).toHaveLength(1);
    });
    it('basic avatar should have default avatar css clss on div', () => {
      const avatarWrapper = mount(
                                  <Avatar theme={theme} />
                            );
      expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
    });
    it('basic avatar should have default styleOne css clss on div', () => {
      const avatarWrapper = mount(
                                  <Avatar theme={theme} />
                            );
      expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
    });
    it('basic avatar should have default sizeMedium css clss on div', () => {
      const avatarWrapper = mount(
                                  <Avatar theme={theme} />
                            );
      expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
    });
  });

  describe('size property', () => {
    describe('when not set', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                  <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify size property when not set or which consider default', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.prop('componentSize')).toBeFalsy();
      });
    });
    describe('when set', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer componentSize="small" theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                  <Avatar customer componentSize="small" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer componentSize="small" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('should verify the avatar image size property set as small', () => {
        const avatarWrapper = mount(
                                    <Avatar customer componentSize="small" theme={theme} />
                              );
        expect(avatarWrapper.prop('componentSize')).toBe('small');
      });
      it('should have sizeSmall css clss on div when size set as small', () => {
        const avatarWrapper = mount(
                                    <Avatar customer componentSize="small" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeSmall')).toBe(true);
      });
      it('should verify the avatar image size property set as medium', () => {
        const avatarWrapper = mount(
                                    <Avatar customer componentSize="medium" theme={theme} />
                              );
        expect(avatarWrapper.prop('componentSize')).toBe('medium');
      });
      it('should have sizeSmall css clss on div when size set as medium', () => {
        const avatarWrapper = mount(
                                    <Avatar customer componentSize="medium" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify the avatar image size property set as large', () => {
        const avatarWrapper = mount(
                                    <Avatar customer componentSize="large" theme={theme} />
                              );
        expect(avatarWrapper.prop('componentSize')).toBe('large');
      });
      it('should have sizeSmall css clss on div when size set as large', () => {
        const avatarWrapper = mount(
                                    <Avatar customer componentSize="large" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeLarge')).toBe(true);
      });
    });
  });
  describe('name property', () => {
    describe('when not set', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                  <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify name property when not set', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} theme={theme} />
                              );
        expect(avatarWrapper.prop('componentName')).toBeFalsy();
      });
    });
    describe('when set', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} componentName="Hardik Shah" theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                  <Avatar customer={false} componentName="Hardik Shah" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} componentName="Hardik Shah" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} componentName="Hardik Shah" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify name property when set', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} componentName="Hardik Shah" theme={theme} />
                              );
        expect(avatarWrapper.prop('componentName')).toBe('Hardik Shah');
      });
    });
  });
  describe('initials property', () => {
    describe('when not set', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                  <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify initials property when not set', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} theme={theme} />
                              );
        expect(avatarWrapper.prop('initials')).toBeFalsy();
      });
    });
    describe('when set', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} initials="HS" theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                  <Avatar customer={false} initials="HS" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} initials="HS" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} initials="HS" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify initials property when set', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} initials="HS" theme={theme} />
                              );
        expect(avatarWrapper.prop('initials')).toBe('HS');
      });
    });
  });

  describe('customer property', () => {
    describe('when not set', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify customer property when not set', () => {
        const avatarWrapper = mount(
                                    <Avatar theme={theme} />
                              );
        expect(avatarWrapper.prop('customer')).toBeFalsy();
      });
    });

    describe('when set to true', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify customer property when set as true', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.prop('customer')).toBe(true);
      });
    });

    describe('when set to false', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify customer property when set as false', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} theme={theme} />
                              );
        expect(avatarWrapper.prop('customer')).toBe(false);
      });
    });
  });

  describe('source property', () => {
    describe('when not set', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify source property when not set', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} theme={theme} />
                              );
        expect(avatarWrapper.prop('source')).toBeFalsy();
      });
    });

    describe('when set', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false}
                                    source="https://cdn.vectorstock.com/i/thumb-large/66/60/9646660.jpg/9646660.jpg" theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false}
                                    source="https://cdn.vectorstock.com/i/thumb-large/66/60/9646660.jpg/9646660.jpg" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false}
                                    source="https://cdn.vectorstock.com/i/thumb-large/66/60/9646660.jpg/9646660.jpg" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false}
                                    source="https://cdn.vectorstock.com/i/thumb-large/66/60/9646660.jpg/9646660.jpg" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('basic avatar should have default hasImage css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false}
                                    source="https://cdn.vectorstock.com/i/thumb-large/66/60/9646660.jpg/9646660.jpg" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('hasImage')).toBe(true);
      });
      it('should verify source property when set', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false}
                                    source="https://cdn.vectorstock.com/i/thumb-large/66/60/9646660.jpg/9646660.jpg" theme={theme} />
                              );
        expect(avatarWrapper.prop('source')).toBe('https://cdn.vectorstock.com/i/thumb-large/66/60/9646660.jpg/9646660.jpg');
      });
    });
  });

  describe('accessibilityLabel property', () => {
    describe('when not set', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                  <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify accessibilityLabel property when not set', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} theme={theme} />
                              );
        expect(avatarWrapper.prop('accessibilityLabel')).toBeFalsy();
      });
    });

    describe('when set', () => {
      it('basic avatar should have rendered one div clss element', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} accessibilityLabel="helloavatar" theme={theme} />
                              );
        expect(avatarWrapper.find('div')).toHaveLength(1);
      });
      it('basic avatar should have default avatar css clss on div', () => {
        const avatarWrapper = mount(
                                  <Avatar customer={false} accessibilityLabel="helloavatar" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
      });
      it('basic avatar should have default styleOne css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} accessibilityLabel="helloavatar" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
      });
      it('basic avatar should have default sizeMedium css clss on div', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} accessibilityLabel="helloavatar" theme={theme} />
                              );
        expect(avatarWrapper.find('div').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify accessibilityLabel property when set', () => {
        const avatarWrapper = mount(
                                    <Avatar customer={false} accessibilityLabel="helloavatar" theme={theme} />
                              );
        expect(avatarWrapper.prop('accessibilityLabel')).toBe('helloavatar');
      });
    });
  });

  describe('verify all property together', () => {
    it('basic avatar should have rendered one div clss element', () => {
      const avatarWrapper = mount(
                                  <Avatar customer theme={theme}
                                  componentSize="large"
                                  componentName="Hardik Shah"
                                  initials="HS"
                                  source="http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg"
                                  accessibilityLabel="hello"/>
                            );
      expect(avatarWrapper.find('div')).toHaveLength(1);
    });
    it('basic avatar should have default avatar css clss on div', () => {
      const avatarWrapper = mount(
                                  <Avatar customer theme={theme}
                                  componentSize="large"
                                  componentName="Hardik Shah"
                                  initials="HS"
                                  source="http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg"
                                  accessibilityLabel="hello"/>
                            );
      expect(avatarWrapper.find('div').at(0).hasClass('Avatar')).toBe(true);
    });
    it('basic avatar should have default styleOne css clss on div', () => {
      const avatarWrapper = mount(
                                  <Avatar customer theme={theme}
                                  componentSize="large"
                                  componentName="Hardik Shah"
                                  initials="HS"
                                  source="http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg"
                                  accessibilityLabel="hello"/>
                            );
      expect(avatarWrapper.find('div').at(0).hasClass('styleOne')).toBe(true);
    });
    it('basic avatar should have default sizeMedium css clss on div', () => {
      const avatarWrapper = mount(
                                  <Avatar customer theme={theme}
                                  componentSize="large"
                                  componentName="Hardik Shah"
                                  initials="HS"
                                  source="http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg"
                                  accessibilityLabel="hello"/>
                            );
      expect(avatarWrapper.find('div').at(0).hasClass('sizeLarge')).toBe(true);
    });
    it('basic avatar should have default hasImage css clss on div', () => {
      const avatarWrapper = mount(
                                  <Avatar customer theme={theme}
                                  componentSize="large"
                                  componentName="Hardik Shah"
                                  initials="HS"
                                  source="http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg"
                                  accessibilityLabel="hello"/>
                            );
      expect(avatarWrapper.find('div').at(0).hasClass('hasImage')).toBe(true);
    });
    it('should verify all properties are set', () => {
      const avatarWrapper = mount(
                                  <Avatar customer theme={theme}
                                  componentSize="large"
                                  componentName="Hardik Shah"
                                  initials="HS"
                                  source="http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg"
                                  accessibilityLabel="hello"/>
                            );
      expect(avatarWrapper.prop('customer')).toBe(true);
      expect(avatarWrapper.prop('componentSize')).toBe('large');
      expect(avatarWrapper.prop('componentName')).toBe('Hardik Shah');
      expect(avatarWrapper.prop('initials')).toBe('HS');
      expect(avatarWrapper.prop('source')).toBe('http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg');
      expect(avatarWrapper.prop('accessibilityLabel')).toBe('hello');
    });
  });
});
