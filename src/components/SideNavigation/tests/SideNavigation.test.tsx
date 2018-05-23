import * as React from 'react';
import { mount } from 'enzyme';
import SideNavigation from '../SideNavigation';

describe('<SideNavigation />', () => {

  const children = <div><p>Test</p><ul><li>Link 1</li><li>Link 2</li><li>Link 3</li></ul></div>;

  describe('when default props are provided', () => {
    it('default OffCanvas with default props', () => {
      const sideNavigationMenu = mount(<SideNavigation>{children}</SideNavigation>);

      expect(sideNavigationMenu.prop('accordian')).toBeUndefined;
    });
  });
});
