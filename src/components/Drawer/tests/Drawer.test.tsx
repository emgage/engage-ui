import * as React from 'react';
import { mount } from 'enzyme';
import Drawer from '../Drawer';

describe('<Drawer />', () => {

  const children = <div><p>Test</p><ul><li>Link 1</li><li>Link 2</li><li>Link 3</li></ul></div>;

  describe('when default props are provided', () => {
    it('default OffCanvas with default props', () => {
      const drawerMenu = mount(<Drawer>{children}</Drawer>);

      expect(drawerMenu.prop('mode')).toBeUndefined;
      expect(drawerMenu.prop('overlay')).toBeUndefined;
      expect(drawerMenu.prop('flip')).toBeUndefined;
    });
  });
});
