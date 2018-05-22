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

const data: IPickerInfo[] = [
  { id: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', description: 'John Doe', email: 'test@gmail.com' },
  { id: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', description: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
];
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
    // expect(subject.find('label').length).toBe(2);
    expect(subject.find('input').length).toBe(1);
  });
});
