import * as React from 'react';
import { Accordion, AccordionItemProps, DisplayText, Label } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface Props {};

export interface State {
  Item1: boolean,
  Item2: boolean,
  Item3: boolean
};

class AccordionExample extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      Item1: false,
      Item2: false,
      Item3: false
    };

    this.Item1Toggle = this.Item1Toggle.bind(this);
    this.Item2Toggle = this.Item2Toggle.bind(this);
    this.Item3Toggle = this.Item3Toggle.bind(this);
  }

  private Item1Toggle() {
    this.setState({
      Item1: !this.state.Item1
    });
  }

  private Item2Toggle() {
    this.setState({
      Item2: !this.state.Item2
    });
  }

  private Item3Toggle() {
    this.setState({
      Item3: !this.state.Item3
    });
  }

  render() {
    const items : AccordionItemProps[] = [{
        children: <DisplayText children='This is item 1'/>,
        header: <Label id="1">Item1</Label>
      }, {
        children: <DisplayText children='This is item 2'/>,
        header: <Label id="2">Item2</Label>
      }, {
        children: <DisplayText children='This is item 3'/>,
        header: <Label id="3">Item3</Label>
      }
    ];

    return (
      <div className={styles.example}>
        <Accordion
          items = {items} 
        />
      </div>
    );
  }
};

export default AccordionExample;