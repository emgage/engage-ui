import * as React from 'react';
import { mount } from 'enzyme';
import SideNavigation from '../SideNavigation';
import { INavigationData } from '../SideNavigation';

describe('<SideNavigation />', () => {

  const children: INavigationData[] = [
    {
        id: 1,
        label: 'Basics', 
        icon: 'notes',
        action: () => console.log('Basics is clicked!')
    },
  ]
  describe('when default props are provided', () => {
    it('default OffCanvas with default props', () => {
      const sideNavigationMenu = mount(<SideNavigation source={children}></SideNavigation>);

      expect(sideNavigationMenu.prop('accordian')).toBeUndefined;
    });
  });
});
