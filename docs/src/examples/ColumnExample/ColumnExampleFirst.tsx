import * as React from 'react';
import { Column } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class ColumnExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>1. Small column:</h3>
        <Column small="1-6">
          Size 1-6:
          <br/>
            <span>
              Column responsivewidth size are vary and show information in multiple line based on it.
            </span>
        </Column>
        <br/>
        <Column small="2-8">
          Size 2-8:
          <br/>
            <span>
              Column responsivewidth size are vary and show information in multiple line based on it.
            </span>
        </Column>
        <br/>
        <h3>2. Medium column:</h3>
        <Column medium="3-6">
          Size 3-6:
          <br/>
            <span>
            Column responsivewidth size are vary and show information in multiple line based on it.
            </span>
        </Column>
        <br/>
        <Column medium="4-5">
          Size 4-5:
          <br/>
            <span>
                Column responsivewidth size are vary and show information in multiple line based on it.
            </span>
        </Column>
      </div>
    );
  }
}

export default ColumnExample;
