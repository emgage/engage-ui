import * as React from 'react';
import { mount } from 'enzyme';
import Chip from '../../Chip/Chip';
import { UnthemedPicker } from '..';

const theme = {
  pickerResultHide: 'pickerResultHide',
  pickerResultShow: 'pickerResultShow',
};
const searchData = [
  { id: 0, name: 'ranmal0', description: 'r', imageUrl: '', url: '' },
  { id: 1, name: 'ranmal1', description: 'r', imageUrl: '', url: '' },
  { id: 2, name: 'ranmal2', description: 'r', imageUrl: '', url: '' },
  { id: 3, name: 'ranmal3', description: 'r', imageUrl: '', url: '' },
  { id: 4, name: 'ranmal4', description: 'r', imageUrl: '', url: '' },
  { id: 5, name: 'ranmal5', description: 'r', imageUrl: '', url: '' },
  { id: 6, name: 'ranmal6', description: 'r', imageUrl: '', url: '' },
  { id: 7, name: 'ranmal7', description: 'r', imageUrl: '', url: '' },
  { id: 8, name: 'ranmal8', description: 'r', imageUrl: '', url: '' },
  { id: 9, name: 'ranmal9', description: 'r', imageUrl: '', url: '' },
];
const selectedData = [
  { id: 0, name: 'ranmal0', description: 'r', imageUrl: '', url: '' },
  { id: 1, name: 'ranmal1', description: 'r', imageUrl: '', url: '' },
];
describe('when default props are provided', () => {
  describe('onSelect()', () => {
    it('is called with the select', () => {
      const spySearch = jest.fn();
      const spyClick = jest.fn();
      const subject = mount(<UnthemedPicker
        source={searchData}
        chipComponent={Chip}
        searchResultComponent={Chip}
        searchBehavior={spySearch}
        onSelect={spyClick}
        theme={theme}
      />).setState({ ['searchItems']: searchData });
      (subject.find('input') as any).node.value = 'ran';
      subject.find('input').first().simulate('change');
      expect(spySearch).toHaveBeenCalledWith('ran');
      expect(subject.find('span').length).toEqual(searchData.length);
      subject.find('div').first().find('a').first().simulate('click');
      expect(spyClick).toHaveBeenCalled();
    });
  });
  describe('onRemove()', () => {
    it('is called with the remove', () => {
      const spySearch = jest.fn();
      const spyClick = jest.fn();
      const spyRemove = jest.fn();
      const subject = mount(<UnthemedPicker
        source={searchData}
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
      subject.find('div').find('a').first().simulate('click');
      expect(spyClick).toHaveBeenCalled();
      expect(subject.find('span').length).toBeGreaterThan(selectedData.length);
      subject.find('div').first().find('button').first().simulate('click');
      expect(spyRemove).toHaveBeenCalled();
    });
  });
});
