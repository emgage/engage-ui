import * as React from 'react';
import { mount } from 'enzyme';
import Button from '../../Button/Button';
import Chip from '../../Chip/Chip';
import { DisplayMoreInfo } from '../PickerEnum';
import Picker from '../Picker';

const theme = {
  pickerResultHide: 'pickerResultHide',
  pickerResultShow: 'pickerResultShow',
};

export interface IPickerInfo {
  id?: number;
  image?: string;
  name: string;
  description: string;
  email?: string;
}

const data: IPickerInfo[] = [];
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
      source={data}
      chipComponent={Chip}
      searchResultComponent={Chip}
      maxSelectedItems={3}
      minSelectedItems={2}
      moreInfoComponent={<Button children="More Info about picker" />}
      moreInfoComponentShowOn={DisplayMoreInfo.onHover}
      selectedResultsBehavior="mark"
      theme={theme}
    />);
    expect(subject.find('label').length).toBe(2);
    expect(subject.find('input').length).toBe(1);
  });
  describe('searchBehavior()', () => {
    it('is called with the search', () => {
      const spy = jest.fn();
      const subject = mount(<Picker
        source={data}
        autoSuggest
        chipComponent={<Chip theme={chipTheme} />}
        searchResultComponent={<Chip theme={chipTheme} />}
        searchBehavior={spy()}
        theme={theme}
      />);

      const event = {
        target: {
          value: 'Pedro',
        },
      };
      (subject.find('input') as any).node.value = 'Pedro';
      subject.find('input').at(0).simulate('change', event);
      expect(spy).toBeCalled();
    });
  });
});
