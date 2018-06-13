import * as React from 'react';
import { mount } from 'enzyme';
import SideNavigation, { INavigationData } from '../SideNavigation';


describe('<SideNavigation />', () => {

  const children: INavigationData[] = [
    {
      id: 1,
      label: 'Basics',
      icon: 'notes',
      action: () => console.log('Basics is clicked!')
    },
  ];
  describe('when default props are provided', () => {
    it('default SideNavigation with default props', () => {
      const sideNavigationMenu = mount(<SideNavigation accordian source={children} drawerOpen hideCollapse={false} drawerExpand></SideNavigation>);
      expect(sideNavigationMenu.prop('accordian')).toBe(true);
      expect(sideNavigationMenu.prop('drawerOpen')).toBe(true);
      expect(sideNavigationMenu.prop('hideCollapse')).toBe(false);
    });
  });
});
