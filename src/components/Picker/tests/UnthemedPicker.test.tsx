import * as React from 'react';
import { mount } from 'enzyme';
import Chip from '../../Chip/Chip';
import { UnthemedPicker } from '..';

const theme = {
  pickerResultHide: 'pickerResultHide',
  pickerResultShow: 'pickerResultShow',
};
const Data = [
  { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', description: 'John Doe', email: 'test@gmail.com' },
  { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', description: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
  { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', description: 'Jane Doe', email: 'jane@gmail.com' },
  { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', description: 'Person McPerson', email: 'yahoogmail@gmail.com' },
  { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
  { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'slkjgmail@gmail.com' },

];
const searchData = [
  { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', description: 'John Doe', email: 'test@gmail.com' },
  { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', description: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
  { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', description: 'Jane Doe', email: 'jane@gmail.com' },
  { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', description: 'Person McPerson', email: 'yahoogmail@gmail.com' },
  { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
  { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'slkjgmail@gmail.com' },

];
const selectedData = [
  { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', description: 'John Doe', email: 'test@gmail.com' },
  { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', description: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
  { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', description: 'Jane Doe', email: 'jane@gmail.com' },
  { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', description: 'Person McPerson', email: 'yahoogmail@gmail.com' },
  { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
  { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'slkjgmail@gmail.com' },

];
describe('when default props are provided', () => {
  describe('onSelect()', () => {
    it('is called with the select', (event) => {
      const spySearch = jest.fn(event);
      const spyClick = jest.fn();
      const subject = mount(<UnthemedPicker
        source={Data}
        autoSuggest
        chipComponent={Chip}
        searchResultComponent={Chip}
        searchBehavior={spySearch()}
        onSelect={spyClick()}
        theme={theme}
      />).setState({ ['searchItems']: searchData });

      expect(subject.find('input').length).toBe(1);
      (subject.find('input') as any).node.value = 'Pedro';
      subject.find('input').at(0).simulate('change');
      expect(spySearch).toBeCalled();
      expect(spySearch).toHaveBeenCalledWith('Pedro');
      expect(subject.find('span').length).toBeGreaterThan(searchData.length);
      subject.find('span').first().find('a').simulate('click');
      expect(spyClick).toHaveBeenCalled();
    });
  });
  describe('onRemove()', () => {
    it('is called with the remove', (event: any) => {
      const spySearch = jest.fn();
      const spyClick = jest.fn();
      const spyRemove = jest.fn(event);
      const subject = mount(<UnthemedPicker
        source={Data}
        autoSuggest
        chipComponent={Chip}
        searchResultComponent={Chip}
        searchBehavior={spySearch()}
        onSelect={spyClick()}
        onRemove={spyRemove()}
        theme={theme}
      />).setState({ ['searchItems']: searchData, ['selectedItems']: selectedData });

      (subject.find('input') as any).node.value = 'Joh';
      subject.find('input').at(0).simulate('change');
      expect(spySearch).toBeCalled();
      expect(subject.find('span').length).toBeGreaterThan(searchData.length);
      subject.find('span').find('a').first().simulate('click');
      expect(spyClick).toBeCalled();
      expect(spyClick).toHaveBeenCalledWith('Joh');
      expect(subject.find('span').length).toBeGreaterThan(selectedData.length);
      subject.find('span').first().find('button').simulate('click');
      expect(spyRemove).toHaveBeenCalled();
    });
  });
});
