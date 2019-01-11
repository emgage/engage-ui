import * as React from 'react';
import { mount } from 'enzyme';
import Chip from '../../Chip/Chip';
import { UnthemedPicker } from '..';

const theme = {
  pickerResultHide: 'pickerResultHide',
  pickerResultShow: 'pickerResultShow',
};
const Data = [
  { id: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', description: 'John Doe', email: 'test@gmail.com' },
  { id: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', description: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
  { id: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', description: 'Jane Doe', email: 'jane@gmail.com' },
  { id: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', description: 'Person McPerson', email: 'yahoogmail@gmail.com' },
  { id: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
  { id: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'slkjgmail@gmail.com' },

];
const searchData = [
  { id: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', description: 'John Doe', email: 'test@gmail.com' },
  { id: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', description: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
  { id: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', description: 'Jane Doe', email: 'jane@gmail.com' },
  { id: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', description: 'Person McPerson', email: 'yahoogmail@gmail.com' },
  { id: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
  { id: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'slkjgmail@gmail.com' },

];
// const selectedData = [
//   { id: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', description: 'John Doe', email: 'test@gmail.com' },
//   { id: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', description: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
//   { id: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', description: 'Jane Doe', email: 'jane@gmail.com' },
//   { id: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', description: 'Person McPerson', email: 'yahoogmail@gmail.com' },
//   { id: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
//   { id: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person', email: 'slkjgmail@gmail.com' },

// ];
describe('when default props are provided', () => {
  describe('onSelect()', () => {
    it('is called with the select', () => {
      const spyClick = jest.fn();
      const subject = mount(<UnthemedPicker
        source={Data}
        autoSuggest
        chipComponent={Chip}
        searchResultComponent={Chip}
        onSelect={spyClick}
        theme={theme}
      />).setState({ ['searchItems']: searchData });

      expect(subject.find('input').length).toBe(1);
    });
  });
});
