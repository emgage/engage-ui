import * as React from 'react';
import {mount} from 'enzyme';
import DisplayText from '../DisplayText';

describe('<DisplayText />', () => {

    it('Verify the element prop of display text.', () => {
      const displaytextWrapper = mount(<DisplayText element={'h1'}>Good Morning, Hardik.</DisplayText>);
      expect(displaytextWrapper.prop('element')).toBe('h1');
      });

    it('Verify the children prop of display text.', () => {
      const displaytextWrapper = mount(<DisplayText element={'h1'}>Good Morning, Hardik.</DisplayText>);
      expect(displaytextWrapper.prop('children')).toBe('Good Morning, Hardik.');
      });

    it('Verify the size prop of display text.', () => {
      const displaytextWrapper = mount(<DisplayText size={'extraLarge'}>Good Morning, Sandip.</DisplayText>);
      expect(displaytextWrapper.prop('size')).toBe('extraLarge');
      });

    it('Verify the size, element and children prop together of display text.', () => {
      const displaytextWrapper = mount(<DisplayText element="h3" size="small">Good evening, HS.</DisplayText>);
      expect(displaytextWrapper.prop('element')).toBe('h3');
      expect(displaytextWrapper.prop('size')).toBe('small');
      expect(displaytextWrapper.prop('children')).toBe('Good evening, HS.');
      });

    it('Verify the children prop of display text is blank.', () => {
      const displaytextWrapper = mount(<DisplayText element="h3" size="small" children=""></DisplayText>);
      expect(displaytextWrapper.prop('children')).toBeDefined;
      });

});
