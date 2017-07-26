import * as React from 'react';
import { mount } from 'enzyme';
import Button from '../../Button/Button';
import Chip from '../../Chip/Chip';
import { DisplayMoreInfo } from '../PickerEnum';
import { MockPickerSource } from './MockPickerSource';
import Picker from '../Picker';

const theme = {
  pickerResultHide: 'pickerResultHide',
  pickerResultShow: 'pickerResultShow',
};
const chipTheme = {
  chip: 'chip',
  chipClickable: 'chipClickable',
  chipImage: 'chipImage',
  chipRemovable: 'chipRemovable',
  chipTransparent: 'chipTransparent',
  chipRemove: 'chipRemove',
};
describe('when default props are provided', () => {
  it('div should have default picker elements', () => {
    const subject = mount(<Picker
            required={true}
            source={new MockPickerSource()}
            chipComponent={Chip}
            searchResultComponent={Chip}
            filterPlaceHolder="Search people and group"
            maxSelectedItems={3}
            millisecondsToWaitBeforeSearch={3}
            minSelectedItems={2}
            moreInfoComponent={<Button children="More Info about picker" />}
            moreInfoComponentShowOn={DisplayMoreInfo.onHover}
            selectedResultsBehavior="mark"
            theme={theme}
        />);
    expect(subject.find('label').length).toBe(1);
    expect(subject.find('label').text()).toBe('lbl');
    expect(subject.find('input').length).toBe(1);
    const input = subject.find('input');
    expect(input.prop('id')).toBe('TextField1');
    expect(input.prop('placeholder')).toBe('Search people and group');
  });
  describe('searchBehavior()', () => {
    it('is called with the search', () => {
      const spy = jest.fn();
      const subject = mount(<Picker
                source={new MockPickerSource()}
                chipComponent={<Chip theme={chipTheme} />}
                searchResultComponent={<Chip theme={chipTheme} />}
                searchBehavior={spy}
                theme={theme}
            />);
      (subject.find('input') as any).node.value = 'ran';
      subject.find('input').simulate('change');
      expect(spy).toHaveBeenCalledWith('ran');
    });
  });
});
