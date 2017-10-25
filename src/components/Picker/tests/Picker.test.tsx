import * as React from 'react';
import { mount } from 'enzyme';
import Button from '../../Button/Button';
import Chip from '../../Chip/Chip';
import { DisplayMoreInfo } from '../PickerEnum';
import { IPickerInfo, UnthemedPicker } from '../Picker';

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
const data: IPickerInfo[] = [];
describe('when default props are provided', () => {
  it('div should have default picker elements', () => {
    const subject = mount(<UnthemedPicker
      required={true}
      source={data}
      chipComponent={Chip}
      searchResultComponent={Chip}
      filterPlaceHolder="Search people and group"
      maxSelectedItems={3}
      minSelectedItems={2}
      moreInfoComponent={<Button children="More Info about picker" />}
      moreInfoComponentShowOn={DisplayMoreInfo.onHover}
      selectedResultsBehavior="mark"
      theme={theme}
    />);
    expect(subject.find('label').length).toBe(2);
    expect(subject.find('input').length).toBe(1);
    expect(subject.find('input').prop('id')).toBe('TextField1');
    expect(subject.find('input').prop('placeholder')).toBe('Search people and group');
  });
  describe('searchBehavior()', () => {
    it('is called with the search', () => {
      const spy = jest.fn();
      const subject = mount(<UnthemedPicker
        source={data}
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
