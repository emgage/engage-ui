import * as React from 'react';
import {
  Chip,
  Picker,
} from '../../src/components';

class PickerAutoSuggestExample extends React.Component<{}, {}> {
  render() {

    const pickerdata = [
      { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', description: 'John Doe', email: 'test@gmail.com' },
      { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', description: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
      { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', description: 'Jane Doe', email: 'jane@gmail.com' },
      { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', description: 'Person McPerson', email: 'yahoogmail@gmail.com' },
      { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person',  email: 'yahooldjadslkjgmail@gmail.com' },
      { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person',  email: 'slkjgmail@gmail.com' },
    ];

    return (
      <Picker
        chipComponent={Chip}
        filterPlaceHolder={'hello'}
        source = {pickerdata}
        searchResultComponent={Chip}
      />
    );
  }
}

export default PickerAutoSuggestExample;
