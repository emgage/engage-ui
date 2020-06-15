import * as React from 'react';
import { Picker, Button, Chip } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class PickerExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
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
        <h3>1. Normal Picker:</h3>
        <br/>
         <Picker
            chipComponent={Chip}
            filterPlaceHolder="!People!!"
            searchResultComponent={Chip}
            source={pickerdata}
            moreInfoComponent={
              <Button
                children="ranmal"
                disabled={false}
                disclosure={false}
                destructive={false}
                external={false}
                fullWidth={false}
                outline={false}
                primary={false}
                submit={false}
                plain={false}
              />
            }
            autoSuggest={false}
            disabled={false}
            labelHidden={false}
            loading={false}
          />
        <br/>
        <h3>2. Picker with limited selection:</h3>
        <h4>User must select minimum number of items upto maximum limit. In below example, user must select minimum Two items and can select upto Five items.</h4>
        <br/>
         <Picker
            chipComponent={Chip}
            filterPlaceHolder="!People!!"
            searchResultComponent={Chip}
            source={pickerdata}
            maxSelectedItems={5}
            minSelectedItems={2}
            moreInfoComponent={
              <Button
                children="ranmal"
                disabled={false}
                disclosure={false}
                destructive={false}
                external={false}
                fullWidth={false}
                outline={false}
                primary={false}
                submit={false}
                plain={false}
              />
            }
            autoSuggest={false}
            disabled={false}
            loading={false}
            labelHidden={false}
          />
        <br/>
      </div>
    );
  }
}

export default PickerExample;
