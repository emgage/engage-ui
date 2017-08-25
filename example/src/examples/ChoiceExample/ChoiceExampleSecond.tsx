import * as React from 'react';
import { Choice } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class ChoiceExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>3.Choice with helptext:</h3>
        <Choice id="MyChoice" label="ChoiceLabel" helpText="This is Choice Component."/>

        <h3>4.Choice with all properties:</h3>
        <Choice id="MyChoice" label="ChoiceLabel" error="Error" helpText="This is Choice Component." labelHidden={false}/>
      </div>
    );
  }
}

export default ChoiceExampleSecond;
