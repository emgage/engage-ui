import * as React from 'react';

import AutoSuggestText from '../../src/components/Picker/AutoSuggestText';
import Card from '../../src/components/Picker/Card';

import {
  Chip,
  Picker,
} from '../../src/components';

class PickerAutoSuggestExample extends React.Component<{}, {}> {
  render() {

    return (
      <Picker
        chipComponent={Chip}
        filterPlaceHolder={'hello'}
        searchResultComponent={Chip}
      />
    );
  }
};

export default PickerAutoSuggestExample;