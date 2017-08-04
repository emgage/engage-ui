import * as React from 'react';
import { mount } from 'enzyme';
import Chip from '../../Chip';
import ClickableChip from '../ClickableChip';

describe('<ClickableChip />', () => {
  describe('when default props are provided', () => {
    it('basic chip should have rendered elements', () => {
      const subject = mount(<ClickableChip chip={<Chip>Batman</Chip>} />);
      expect(subject.find('span')).toHaveLength(2);
    });
  });
});
