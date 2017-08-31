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

class LabelledExampleFirst extends React.Component<IProps ,IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
        <div className={styles.example}>
            1. Basic Labelled:
            <Labelled id="Id" label="Click Here" action ={action} >
            </Labelled>
        </div>
    );
  }
}

export default LabelledExampleFirst;
