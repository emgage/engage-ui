import * as React from 'react';
import { mount } from 'enzyme';
import Chip from '../../Chip/Chip';
import ClickableChip from '..';

const theme = {
  chip: 'chip',
};

describe('<ClickableChip />', () => {
  describe('when default props are provided', () => {
    it('basic chip should have rendered elements', () => {
      const subject = mount(<ClickableChip chip={Chip} />);
      console.log(subject.html());
      expect(subject.find('span')).toHaveLength(2);
    });
  });
});
