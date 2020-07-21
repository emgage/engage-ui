import * as React from 'react';
import { mount } from 'enzyme';
import { Sticky } from '../';

export type Position = 'top' | 'bottom';

const theme = {
  footerStyle: 'footerStyle',
  sticky: 'sticky',
  headerSticky: 'headerSticky',
  footerSticky: 'footerSticky',
};

describe('<Sticky />', () => {
  describe('when default props are provided', () => {
    it('should have default elements with StickyHeader', () => {
      const subject = mount(
        <Sticky
          position={'top'}
          theme={theme}
          footerType="inline"
        >
        Batman is a <br/>
        fictional<br/>
        superhero<br/>
        who appears<br/>
        in American<br/>
        comic books<br/>
        published by<br/>
        DC Comics.<br/>
        The character<br/>
        was created by<br/>
        artist Bob Kane<br/>
        and writer Bill<br/>
        Finger, and first<br/>
        appeared in Detective<br/>
        Comics #27
        </Sticky>);
      console.log(subject.html());
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('div').length).toBe(1);
    });
  });

  describe('when default props are provided', () => {
    it('should have default elements with StickyFooter', () => {
      const subject = mount(
        <Sticky
          position={'bottom'}
          theme={theme}
          footerType="inline"
        >
        Batman is a <br/>
        fictional<br/>
        superhero<br/>
        who appears<br/>
        in American<br/>
        comic books<br/>
        published by<br/>
        DC Comics.<br/>
        The character<br/>
        was created by<br/>
        artist Bob Kane<br/>
        and writer Bill<br/>
        Finger, and first<br/>
        appeared in Detective<br/>
        Comics #27
        </Sticky>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('div').length).toBe(1);
    });
  });
});
