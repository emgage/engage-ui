import * as React from 'react';
import {
  Chip,
  Picker,
} from '../../src/components';

class PickerAutoSuggestExample extends React.Component<{}, {}> {
  render() {

    const pickerdata = [
      { key: 1, name: 'John Doe', description: 'John Doe', email: 'test@gmail.com' },
      { key: 2, name: 'Pedro Sanchez', description: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
      { key: 3, name: 'Jane Doe', description: 'Jane Doe', email: 'jane@gmail.com' },
      { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', description: 'Person McPerson', email: 'yahoogmail@gmail.com' },
      { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person',  email: 'yahooldjadslkjgmail@gmail.com' },
      { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', description: 'Laura Person',  email: 'slkjgmail@gmail.com' },
    ];

    return (
      <Picker
        label="Picker Component"
        chipComponent={Chip}
        filterPlaceHolder="placeholder"
        helpText="Helper Text"
        // loading
        source={pickerdata}
        autoSuggest
        searchResultComponent={Chip}
        onSelect={(value: any) => console.log('I am here:', value)}
        onRemove={(value: any) => console.log('I am removed:', value)}
      />
    );
  }
}

export default PickerAutoSuggestExample;
