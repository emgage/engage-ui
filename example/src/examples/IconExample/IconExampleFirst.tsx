import * as React from 'react';
import { Icon } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class IconExampleFirst extends React.Component<IProps, IState> {
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
        <h3>1.Default Icon(Source as SVG):</h3>
        <Icon source="notes" />

        <h3>2.Icon(Source as Placeholder):</h3>
        <Icon source="placeholder" />
      </div>
    );
  }
}

export default IconExampleFirst;
