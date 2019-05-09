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

class PopoverExampleFifth extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  private toggle(e : React.FormEvent<HTMLElement>) {
    this.setState({
      active: !this.state.active,
      anchorEl: e.target as HTMLElement
    });
  }

  render() {
    return (
      <div className={styles.example}>
        <Button onClick={e => this.toggle(e)}>Popover5</Button>
        <Popover
          anchorEl={this.state.anchorEl}>
          I am popover <Button>Hello popover</Button>
        </Popover>
      </div>
        );
  }
}

export default PopoverExampleFifth;
