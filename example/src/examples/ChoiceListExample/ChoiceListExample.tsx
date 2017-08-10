import * as React from 'react';
import { ChoiceList } from '../../../../src/components/';

export interface IState {
  radioValues?: string[];
}

class ChoiceListExample extends React.Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      radioValues: undefined,
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div>
        <ChoiceList
          title="Company name"
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
          selected={['hidden']}
          onChange={this.valueUpdater('radioValues')}/>
      </div>
    );
  }
}

export default ChoiceListExample;
