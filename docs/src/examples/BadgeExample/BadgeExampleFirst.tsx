import * as React from 'react';
import { Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class BadgeExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>1. Default badge:</h3>
        <br/>
          <Badge>
            Badge Example 1
          </Badge>
        <br/>
        <br/>
        <h3>2. Badge with progress=complete and status=success:</h3>
        <br/>
          <Badge
            progress="complete"
            status="success"
          >
            Badge Example 2
          </Badge>
        <br/>
        <br/>
        <h3>3. Badge with progress=partiallyComplete and status=info:</h3>
        <br/>
          <Badge
            progress="partiallyComplete"
            status="info"
          >
            Badge Example 3
          </Badge>
        <br/>
        <br/>
        <h3>4. Badge with progress=incomplete and status=attention:</h3>
        <br/>
          <Badge
            progress="incomplete"
            status="attention"
          >
            Badge Example 4
          </Badge>
          <br/>
          <br/>
        <h3>5. Badge with status=warning and without progress:</h3>
        <br/>
          <Badge
            status="warning"
          >
            Badge Example 5
          </Badge>
      </div>
    );
  }
}

export default BadgeExample;
