import * as React from 'react';
import { ChoiceList } from '../../../../src/components/';

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
      <div>
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
