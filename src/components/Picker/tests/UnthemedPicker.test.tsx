import * as React from 'react';
import { mount } from 'enzyme';
import Chip from '../../Chip/Chip';
import { MockPickerSource } from './MockPickerSource';
import { UnthemedPicker } from '..';

const theme = {
  pickerResultHide: 'pickerResultHide',
  pickerResultShow: 'pickerResultShow',
};
const searchData = [
    { Id: 0, Name: 'ranmal0', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 1, Name: 'ranmal1', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 2, Name: 'ranmal2', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 3, Name: 'ranmal3', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 4, Name: 'ranmal4', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 5, Name: 'ranmal5', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 6, Name: 'ranmal6', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 7, Name: 'ranmal7', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 8, Name: 'ranmal8', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 9, Name: 'ranmal9', Description: 'r', ImageUrl: '', Url: '' },
];
const selectedData = [
    { Id: 0, Name: 'ranmal0', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 1, Name: 'ranmal1', Description: 'r', ImageUrl: '', Url: '' },
];
describe('when default props are provided', () => {
  describe('onSelect()', () => {
    it('is called with the select', () => {
      const spySearch = jest.fn();
      const spyClick = jest.fn();
      const subject = mount(<UnthemedPicker
                source={new MockPickerSource()}
                chipComponent={Chip}
                searchResultComponent={Chip}
                searchBehavior={spySearch}
                onSelect={spyClick}
                theme={theme}
            />).setState({ ['searchItems']: searchData });
      (subject.find('input') as any).node.value = 'ran';
      subject.find('input').simulate('change');
      expect(spySearch).toHaveBeenCalledWith('ran');
      expect(subject.find('span').length).toBeGreaterThan(searchData.length);
      subject.find('span').first().find('a').simulate('click');
      expect(spyClick).toHaveBeenCalled();
    });
  });
  describe('onRemove()', () => {
    it('is called with the remove', () => {
      const spySearch = jest.fn();
      const spyClick = jest.fn();
      const spyRemove = jest.fn();
      const subject = mount(<UnthemedPicker
                source={new MockPickerSource()}
                chipComponent={Chip}
                searchResultComponent={Chip}
                searchBehavior={spySearch}
                onSelect={spyClick}
                onRemove={spyRemove}
                theme={theme}
            />).setState({ ['searchItems']: searchData, ['selectedItems']: selectedData });
      (subject.find('input') as any).node.value = 'ran';
      subject.find('input').simulate('change');
      expect(spySearch).toHaveBeenCalledWith('ran');
      expect(subject.find('span').length).toBeGreaterThan(searchData.length);
      subject.find('span').find('a').first().simulate('click');
      expect(spyClick).toHaveBeenCalled();
      expect(subject.find('span').length).toBeGreaterThan(selectedData.length);
      subject.find('span').first().find('button').simulate('click');
      expect(spyRemove).toHaveBeenCalled();
    });
  });
});
