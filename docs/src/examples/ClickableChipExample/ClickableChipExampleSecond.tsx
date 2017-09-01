import * as React from 'react';
import { ClickableChip ,Chip ,Card } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class ClickableChipExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>2.ClickableChip with detail on click:</h3>
        <ClickableChip chip={<Chip>Batman</Chip>}>
          <Card title="More about Batman">
            <p>Batman is a fictional superhero who appears in American comic books published by DC Comics.
              The character was created by artist Bob Kane and writer Bill Finger, and first appeared in Detective Comics #27</p>
          </Card>
        </ClickableChip>
      </div>
    );
  }
}

export default ClickableChipExampleSecond;
