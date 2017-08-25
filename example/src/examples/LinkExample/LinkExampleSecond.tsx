import * as React from 'react';
import { Link } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class LinkExampleFirst extends React.Component<IProps> {
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
      2. Link with url and external prop:
      <br/>
       <Link
            url="http://www.lipsum.com/"
            external
            >
            Link open with another browser
        </Link>
      </div>
    );
  }
}

export default LinkExampleFirst;
