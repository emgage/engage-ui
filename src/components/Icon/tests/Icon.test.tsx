import * as React from 'react';
import { shallow } from 'enzyme';
import Icon from '../Icon';

describe('<Icon />', () => {
  describe('accessibilityLabel', () => {
    it('uses the label as the aria-label for the icon', () => {
      const element = shallow(<Icon source="placeholder" accessibilityLabel="This is an icon" />);
      expect(element.prop('accessibilityLabel')).toBe('This is an icon');
    });
  });
});
