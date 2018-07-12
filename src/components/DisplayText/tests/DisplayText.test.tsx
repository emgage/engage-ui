import * as React from 'react';
import { mount } from 'enzyme';
import DisplayText from '../DisplayText';

const theme = {
  displayText: 'DisplayText',
  sizeSmall: 'sizeSmall',
  sizeMedium: 'sizeMedium',
  sizeLarge: 'sizeLarge',
  sizeExtraLarge: 'sizeExtraLarge',
};

describe('<DisplayText />', () => {
  describe('when default props are provided', () => {
    it('basic displaytext should have rendered one div element', () => {
      const displaytextWrapper = mount(
                                       <DisplayText theme={theme} />
                                 );
      expect(displaytextWrapper.find('p')).toHaveLength(1);
    });
    it('basic displaytext should have default DisplayText css class on div', () => {
      const displaytextWrapper = mount(
                                      <DisplayText theme={theme} />
                                 );
      expect(displaytextWrapper.find('p').at(0).hasClass('DisplayText')).toBe(true);
    });
    it('basic displaytext should have default sizeMedium css class on div', () => {
      const displaytextWrapper = mount(
                                      <DisplayText theme={theme} />
                                 );
      expect(displaytextWrapper.find('p').at(0).hasClass('sizeMedium')).toBe(true);
    });
  });

  describe('element property', () => {
    describe('when not set', () => {
      it('basic displaytext should have rendered one div element', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} >
                                             Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.find('p')).toHaveLength(1);
      });
      it('basic displaytext should have default DisplayText css class on div', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} >
                                             Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.find('p').at(0).hasClass('DisplayText')).toBe(true);
      });
      it('basic displaytext should have default sizeMedium css class on div', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} >
                                             Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.find('p').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify element when not defined/set', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} >
                                             Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.prop('element')).toBeUndefined();
        expect(displaytextWrapper.find('element')).toHaveLength(0);
      });
    });
    describe('when set', () => {
      it('should verify element when set as h1 with css class and div', () => {
        const displaytextWrapper = mount(
                                        <DisplayText element={'h1'} theme={theme}>
                                            Good Morning, Hardik.
                                        </DisplayText>
                                  );
        expect(displaytextWrapper.prop('element')).toBe('h1');
        expect(displaytextWrapper.find('h1')).toHaveLength(1);
        expect(displaytextWrapper.find('h1').at(0).hasClass('DisplayText')).toBe(true);
        expect(displaytextWrapper.find('h1').at(0).hasClass('sizeMedium')).toBe(true);
      });
    });
  });

  describe('size property', () => {
    describe('when not set', () => {
      it('basic displaytext should have rendered one div element', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} />
                                   );
        expect(displaytextWrapper.find('p')).toHaveLength(1);
      });
      it('basic displaytext should have default DisplayText css class on div', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} />
                                   );
        expect(displaytextWrapper.find('p').at(0).hasClass('DisplayText')).toBe(true);
      });
      it('basic displaytext should have default sizeMedium css class on div', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} />
                                   );
        expect(displaytextWrapper.find('p').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify size when not defined/set', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} >
                                            Good Morning, Hardik.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.prop('componentSize')).toBeUndefined();
        expect(displaytextWrapper.find('componentSize')).toHaveLength(0);
      });
    });
    describe('when set', () => {
      it('basic displaytext should have rendered one div element', () => {
        const displaytextWrapper = mount(
                                         <DisplayText componentSize={'extraLarge'} theme={theme} >
                                            Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.find('p')).toHaveLength(1);
      });
      it('basic displaytext should have default DisplayText css on div', () => {
        const displaytextWrapper = mount(
                                         <DisplayText componentSize={'extraLarge'} theme={theme} >
                                            Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.find('p').at(0).hasClass('DisplayText')).toBe(true);
      });
      it('should verify size when set as extraLarge with css class', () => {
        const displaytextWrapper = mount(
                                         <DisplayText componentSize={'extraLarge'} theme={theme} >
                                            Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.prop('componentSize')).toBe('extraLarge');
        expect(displaytextWrapper.find('p').at(0).hasClass('sizeExtraLarge')).toBe(true);
      });
      it('should verify size when set as large with css class', () => {
        const displaytextWrapper = mount(
                                         <DisplayText componentSize={'large'} theme={theme} >
                                            Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.prop('componentSize')).toBe('large');
        expect(displaytextWrapper.find('p').at(0).hasClass('sizeLarge')).toBe(true);
      });
      it('should verify size when set as medium with css class', () => {
        const displaytextWrapper = mount(
                                         <DisplayText componentSize={'medium'} theme={theme} >
                                            Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.prop('componentSize')).toBe('medium');
        expect(displaytextWrapper.find('p').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify size when set as medium with css class', () => {
        const displaytextWrapper = mount(
                                         <DisplayText componentSize={'small'} theme={theme} >
                                            Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.prop('componentSize')).toBe('small');
        expect(displaytextWrapper.find('p').at(0).hasClass('sizeSmall')).toBe(true);
      });
    });
  });

  describe('children property', () => {
    describe('when not set', () => {
      it('basic displaytext should have rendered one div element', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} />
                                   );
        expect(displaytextWrapper.find('p')).toHaveLength(1);
      });
      it('basic displaytext should have default DisplayText css class on div', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} />
                                   );
        expect(displaytextWrapper.find('p').at(0).hasClass('DisplayText')).toBe(true);
      });
      it('basic displaytext should have default sizeMedium css class on div', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} />
                                   );
        expect(displaytextWrapper.find('p').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify children not defined', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} />
                                   );
        expect(displaytextWrapper.prop('children')).toBeUndefined();
        expect(displaytextWrapper.find('children')).toHaveLength(0);
      });
    });
    describe('when set', () => {
      it('basic displaytext should have rendered one div element', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} >
                                            Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.find('p')).toHaveLength(1);
      });
      it('basic displaytext should have default DisplayText css on div', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} >
                                           Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.find('p').at(0).hasClass('DisplayText')).toBe(true);
      });
      it('basic displaytext should have default sizeMedium css class on div', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} >
                                            Good Morning.
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.find('p').at(0).hasClass('sizeMedium')).toBe(true);
      });
      it('should verify children when set', () => {
        const displaytextWrapper = mount(
                                         <DisplayText theme={theme} >
                                            Good Morning
                                         </DisplayText>
                                   );
        expect(displaytextWrapper.prop('children')).toBe('Good Morning');
        expect(displaytextWrapper.prop('children')).toBeDefined();
      });
      it('should verify children when set in same tag', () => {
        const displaytextWrapper = mount(
                                         <DisplayText children="Good Morning" theme={theme} />
                                   );
        expect(displaytextWrapper.prop('children')).toBe('Good Morning');
        expect(displaytextWrapper.prop('children')).toBeDefined();
      });
      it('should verify children when set as blank', () => {
        const displaytextWrapper = mount(
                                         <DisplayText children="" theme={theme} />
                                   );
        expect(displaytextWrapper.prop('children')).toBeDefined();
      });
    });
  });
  describe('Verify all property together', () => {
    it('basic displaytext should have rendered one div element', () => {
      const displaytextWrapper = mount(
                                       <DisplayText element="h3" componentSize="small" theme={theme} >
                                          Good evening
                                       </DisplayText>
                                 );
      expect(displaytextWrapper.find('h3')).toHaveLength(1);
    });
    it('basic displaytext should have DisplayText css class on div', () => {
      const displaytextWrapper = mount(
                                       <DisplayText element="h3" componentSize="small" theme={theme} >
                                          Good evening
                                       </DisplayText>
                                 );
      expect(displaytextWrapper.find('h3').at(0).hasClass('DisplayText')).toBe(true);
    });
    it('basic displaytext should have sizeSmall css class on div', () => {
      const displaytextWrapper = mount(
                                       <DisplayText element="h3" componentSize="small" theme={theme} >
                                          Good evening
                                       </DisplayText>
                                 );
      expect(displaytextWrapper.find('h3').at(0).hasClass('sizeSmall')).toBe(true);
    });
    it('should verify all properties are set', () => {
      const displaytextWrapper = mount(
                                       <DisplayText element="h3" componentSize="small" theme={theme} >
                                          Good evening
                                       </DisplayText>
                                 );
      expect(displaytextWrapper.prop('element')).toBe('h3');
      expect(displaytextWrapper.prop('componentSize')).toBe('small');
      expect(displaytextWrapper.prop('children')).toBe('Good evening');
    });
  });
});
