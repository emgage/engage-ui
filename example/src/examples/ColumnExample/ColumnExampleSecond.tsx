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

    this.state = {
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>3. Large column:</h3>
        <Column large="5-9">
          Size 5-9:
          <br/>
            <span>
              Column responsivewidth size are vary and show information in multiple line based on it.
            </span>
        </Column>
        <br/>
        <Column large="6-8">
          Size 6-8:
          <br/>
            <span>
              Column responsivewidth size are vary and show information in multiple line based on it.
            </span>
        </Column>
        <br/>
        <h3>4. ExtarLarge column:</h3>
        <Column extraLarge="8-9">
          Size 8-9:
          <br/>
            <span>
              Column responsivewidth size are vary and show information in multiple line based on size selected for column by user.
            </span>
        </Column>
        <br/>
        <Column extraLarge="9-10">
          Size 9-10:
          <br/>
            <span>
            Column responsivewidth size are vary and show information in multiple line based on size selected for column by user.
            </span>
        </Column>
        <br/>
        <h3>5. All size of columns together:</h3>
          <Column small="1-2" medium="3-4" large="5-7" extraLarge="8-10">
          small=1-2 medium=3-4 large=5-7 extraLarge=8-10:
          <br/>
            <span>
              Column responsivewidth size are vary and show information in column based on it.
            </span>
          </Column>
          <br/>
          <Column small="1-2" medium="3-4" large="4-10">
          small=1-2 medium=3-4 large=4-10:
          <br/>
            <span>
              Column responsivewidth size are vary and show information in column based on it.
            </span>
          </Column>
      </div>
    );
  }
}

export default ColumnExample;
