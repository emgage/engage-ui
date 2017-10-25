import * as React from 'react';
import { Picker, Button, Chip } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  showModalState: boolean;
}

class PickerExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showModalState: false,
    };
  }

  render() {

    const pickerdata = [
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

    return (
      <div className={styles.example}>
        <h3>1. Picker with all property:</h3>
        <br/>
         <Picker
            required
            chipComponent={Chip}
            filterPlaceHolder="!People!!"
            searchResultComponent={Chip}
            source={pickerdata}
            maxSelectedItems={5}
            minSelectedItems={2}
            moreInfoComponent={<Button children="ranmal" />}
          />
        <br/>
      </div>
    );
  }
}

export default PickerExample;
