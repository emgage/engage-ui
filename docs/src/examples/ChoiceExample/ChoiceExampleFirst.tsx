import * as React from 'react';
import { Choice } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class ChoiceExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>1.Default Choice:</h3>
        <Choice id="MyChoice" label="ChoiceLabel"/>

        <h3>2.Choice with Error property:</h3>
        <Choice id="MyChoice" label="ChoiceLabel" error="test"/>
      </div>
    );
  }
}

export default ChoiceExampleFirst;
