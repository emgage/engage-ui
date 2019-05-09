import * as React from 'react';
import { Button } from '../../../../src/components';
import { Popover } from '../../../../src/components/';

import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  active: boolean;
  anchorEl?: HTMLElement;
}

class PopoverExampleFourth extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  private toggle(e : React.FormEvent<HTMLElement>) {
    this.setState({
      active:!this.state.active,
      anchorEl: e.target as HTMLElement
    });
  }

  render() {
    return (
      <div className={styles.example}>
        <Button onClick={e => this.toggle(e)}>Popover4</Button>
        <Popover
          anchorEl={this.state.anchorEl}
          preferredPosition="right">
          I am popover <Button>Hello popover</Button>
        </Popover>
      </div>
    );
  }
}

export default PopoverExampleFourth;
