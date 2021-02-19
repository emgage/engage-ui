import * as React from 'react';
import { mount } from 'enzyme';
import BodyText from '../BodyText';

const theme = {
  displayText: 'BodyText',
  sizeSmall: 'sizeSmall',
  sizeDefault: 'sizeDefault',
  sizeLarge: 'sizeLarge',
};

describe('<BodyText />', () => {
  describe('when default props are provided', () => {
    it('basic bodytext should have rendered one div element', () => {
      const bodytextWrapper = mount(
                                       <BodyText theme={theme} />
                                 );
      expect(bodytextWrapper.find('p')).toHaveLength(1);
    });
    it('basic bodytext should have default BodyText css class on div', () => {
      const bodytextWrapper = mount(
                                      <BodyText theme={theme} />
                                 );
      expect(bodytextWrapper.find('p').at(0).hasClass('BodyText')).toBe(true);
    });
    it('basic bodytext should have default sizeDefault css class on div', () => {
      const bodytextWrapper = mount(
                                      <BodyText theme={theme} />
                                 );
      expect(bodytextWrapper.find('p').at(0).hasClass('sizeDefault')).toBe(true);
    });
  });

  describe('element property', () => {
    describe('when not set', () => {
      it('basic bodytext should have rendered one div element', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} >
                                             Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.find('p')).toHaveLength(1);
      });
      it('basic bodytext should have default BodyText css class on div', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} >
                                             Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.find('p').at(0).hasClass('BodyText')).toBe(true);
      });
      it('basic bodytext should have default sizeDefault css class on div', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} >
                                             Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.find('p').at(0).hasClass('sizeDefault')).toBe(true);
      });
      it('should verify element when not defined/set', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} >
                                             Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.prop('element')).toBeUndefined();
        expect(bodytextWrapper.find('element')).toHaveLength(0);
      });
    });
    describe('when set', () => {
      it('should verify element when set as h1 with css class and div', () => {
        const bodytextWrapper = mount(
                                        <BodyText element={'h1'} theme={theme}>
                                            Good Morning, Hardik.
                                        </BodyText>
                                  );
        expect(bodytextWrapper.prop('element')).toBe('h1');
        expect(bodytextWrapper.find('h1')).toHaveLength(1);
        expect(bodytextWrapper.find('h1').at(0).hasClass('BodyText')).toBe(true);
        expect(bodytextWrapper.find('h1').at(0).hasClass('sizeDefault')).toBe(true);
      });
    });
  });

  describe('size property', () => {
    describe('when not set', () => {
      it('basic bodytext should have rendered one div element', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} />
                                   );
        expect(bodytextWrapper.find('p')).toHaveLength(1);
      });
      it('basic bodytext should have default BodyText css class on div', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} />
                                   );
        expect(bodytextWrapper.find('p').at(0).hasClass('BodyText')).toBe(true);
      });
      it('basic bodytext should have default sizeDefault css class on div', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} />
                                   );
        expect(bodytextWrapper.find('p').at(0).hasClass('sizeDefault')).toBe(true);
      });
      it('should verify size when not defined/set', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} >
                                            Good Morning, Hardik.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.prop('componentSize')).toBeUndefined();
        expect(bodytextWrapper.find('componentSize')).toHaveLength(0);
      });
    });
    describe('when set', () => {
      it('basic bodytext should have rendered one div element', () => {
        const bodytextWrapper = mount(
                                         <BodyText componentSize={'large'} theme={theme} >
                                            Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.find('p')).toHaveLength(1);
      });
      it('basic bodytext should have default BodyText css on div', () => {
        const bodytextWrapper = mount(
                                         <BodyText componentSize={'large'} theme={theme} >
                                            Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.find('p').at(0).hasClass('BodyText')).toBe(true);
      });
      it('should verify size when set as extraLarge with css class', () => {
        const bodytextWrapper = mount(
                                         <BodyText componentSize={'large'} theme={theme} >
                                            Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.prop('componentSize')).toBe('sizeLarge');
        expect(bodytextWrapper.find('p').at(0).hasClass('sizeExtraLarge')).toBe(true);
      });
      it('should verify size when set as large with css class', () => {
        const bodytextWrapper = mount(
                                         <BodyText componentSize={'large'} theme={theme} >
                                            Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.prop('componentSize')).toBe('large');
        expect(bodytextWrapper.find('p').at(0).hasClass('sizeLarge')).toBe(true);
      });
      it('should verify size when set as medium with css class', () => {
        const bodytextWrapper = mount(
                                         <BodyText componentSize={'default'} theme={theme} >
                                            Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.prop('componentSize')).toBe('default');
        expect(bodytextWrapper.find('p').at(0).hasClass('sizeDefault')).toBe(true);
      });
      it('should verify size when set as medium with css class', () => {
        const bodytextWrapper = mount(
                                         <BodyText componentSize={'small'} theme={theme} >
                                            Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.prop('componentSize')).toBe('small');
        expect(bodytextWrapper.find('p').at(0).hasClass('sizeSmall')).toBe(true);
      });
    });
  });

  describe('children property', () => {
    describe('when not set', () => {
      it('basic bodytext should have rendered one div element', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} />
                                   );
        expect(bodytextWrapper.find('p')).toHaveLength(1);
      });
      it('basic bodytext should have default BodyText css class on div', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} />
                                   );
        expect(bodytextWrapper.find('p').at(0).hasClass('BodyText')).toBe(true);
      });
      it('basic bodytext should have default sizeDefault css class on div', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} />
                                   );
        expect(bodytextWrapper.find('p').at(0).hasClass('sizeDefault')).toBe(true);
      });
      it('should verify children not defined', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} />
                                   );
        expect(bodytextWrapper.prop('children')).toBeUndefined();
        expect(bodytextWrapper.find('children')).toHaveLength(0);
      });
    });
    describe('when set', () => {
      it('basic bodytext should have rendered one div element', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} >
                                            Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.find('p')).toHaveLength(1);
      });
      it('basic bodytext should have default BodyText css on div', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} >
                                           Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.find('p').at(0).hasClass('BodyText')).toBe(true);
      });
      it('basic bodytext should have default sizeDefault css class on div', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} >
                                            Good Morning.
                                         </BodyText>
                                   );
        expect(bodytextWrapper.find('p').at(0).hasClass('sizeDefault')).toBe(true);
      });
      it('should verify children when set', () => {
        const bodytextWrapper = mount(
                                         <BodyText theme={theme} >
                                            Good Morning
                                         </BodyText>
                                   );
        expect(bodytextWrapper.prop('children')).toBe('Good Morning');
        expect(bodytextWrapper.prop('children')).toBeDefined();
      });
      it('should verify children when set in same tag', () => {
        const bodytextWrapper = mount(
                                         <BodyText children="Good Morning" theme={theme} />
                                   );
        expect(bodytextWrapper.prop('children')).toBe('Good Morning');
        expect(bodytextWrapper.prop('children')).toBeDefined();
      });
      it('should verify children when set as blank', () => {
        const bodytextWrapper = mount(
                                         <BodyText children="" theme={theme} />
                                   );
        expect(bodytextWrapper.prop('children')).toBeDefined();
      });
    });
  });
  describe('Verify all property together', () => {
    it('basic bodytext should have rendered one div element', () => {
      const bodytextWrapper = mount(
                                       <BodyText element="h3" componentSize="small" theme={theme} >
                                          Good evening
                                       </BodyText>
                                 );
      expect(bodytextWrapper.find('h3')).toHaveLength(1);
    });
    it('basic bodytext should have BodyText css class on div', () => {
      const bodytextWrapper = mount(
                                       <BodyText element="h3" componentSize="small" theme={theme} >
                                          Good evening
                                       </BodyText>
                                 );
      expect(bodytextWrapper.find('h3').at(0).hasClass('BodyText')).toBe(true);
    });
    it('basic bodytext should have sizeSmall css class on div', () => {
      const bodytextWrapper = mount(
                                       <BodyText element="h3" componentSize="small" theme={theme} >
                                          Good evening
                                       </BodyText>
                                 );
      expect(bodytextWrapper.find('h3').at(0).hasClass('sizeSmall')).toBe(true);
    });
    it('should verify all properties are set', () => {
      const bodytextWrapper = mount(
                                       <BodyText element="h3" componentSize="small" theme={theme} >
                                          Good evening
                                       </BodyText>
                                 );
      expect(bodytextWrapper.prop('element')).toBe('h3');
      expect(bodytextWrapper.prop('componentSize')).toBe('small');
      expect(bodytextWrapper.prop('children')).toBe('Good evening');
    });
  });
});
