import * as React from 'react';
import { mount} from 'enzyme';
import Icon from '..';

describe('<Icon />', () => {
  describe('accessibilityLabel', () => {
    it('uses the label as the aria-label for the icon', () => {
      const element = mount(<Icon source="placeholder" accessibilityLabel="This is an icon"/>);
      expect(element.html().indexOf('aria-label')).not.toBe(-1);
    });
  });
});
