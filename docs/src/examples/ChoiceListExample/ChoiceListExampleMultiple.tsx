import * as React from 'react';
import { ChoiceList } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  radioValues: string[];
}

class ChoiceListExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      radioValues: [],
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>2. Choice list with multiple selection:</h3>
        <ChoiceList
          title="Company name"
          allowMultiple
          choices={[
            {
              label: 'Hidden',
              value: 'hidden',
            }, {
              label: 'Optional',
              value: 'optional',
            }, {
              label: 'Required',
              value: 'required',
            },
          ]}
          selected={this.state.radioValues}
          onChange={this.valueUpdater('radioValues')}/>
      </div>
    );
  }
}

export default ChoiceListExample;
