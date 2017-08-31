import * as React from 'react';
import { Tag } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class TagExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
            <div className={styles.example}>
                1. Default Tag
                <br/>
                <Tag>Tag</Tag>
            </div>
    );
  }
}

export default TagExampleFirst;
