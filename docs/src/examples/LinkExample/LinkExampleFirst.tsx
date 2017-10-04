import * as React from 'react';
import { Link } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class LinkExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        1. Link with url prop:
        <br/>
        <Link
          url="http://www.lipsum.com/"
        >
        Click on lipsum Link
        </Link>
      </div>
    );
  }
}

export default LinkExampleFirst;
