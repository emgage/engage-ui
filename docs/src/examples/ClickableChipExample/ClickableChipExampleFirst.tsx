import * as React from 'react';
import { ClickableChip ,Chip ,Card } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}


class ClickableChipExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>1.Default ClickableChip with Card:</h3>
        <ClickableChip chip={<Chip>Batman</Chip>}>
        <Card title="More about Batman"/>
        </ClickableChip>
      </div>
    );
  }
}

export default ClickableChipExampleFirst;
