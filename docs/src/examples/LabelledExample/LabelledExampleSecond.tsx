import * as React from 'react';
import { Labelled  } from '../../../../src/components/';
import { Action } from '../../../../src/types';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}
const action: Action = {
  content: 'Click Here',
  onAction: () => { alert('Clicked'); },
};

class LabelledExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
        <div className={styles.example}>
            2. Labelled with reuired and HelpText prop:
            <Labelled id="Id" label="Click Here" action ={action} required={false} helpText="HelpText">
            </Labelled>
            3. Labelled with labelHidden:
            <Labelled id="Id" label="Click Here" action ={action} labelHidden>
            </Labelled>
            4. Labelled with focused and hasValue prop:
            <Labelled id="Id" label="Click Here" action ={action} focused={false} hasValue={false}>
            </Labelled>
        </div>
    );
  }
}

export default LabelledExampleSecond;
