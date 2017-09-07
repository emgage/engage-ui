import * as React from 'react';
import { Icon } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class IconExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>3.Icon with color,backdrop and accessibilityLabel properties:</h3>
        <Icon
          source="notes"
          color="black"
          backdrop
          accessibilityLabel="This is an icon" />
      </div>
    );
  }
}

export default IconExampleSecond;
