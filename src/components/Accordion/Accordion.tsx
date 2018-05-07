import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { ACCORDION } from '../ThemeIdentifiers';
import AccordionItem from './AccordionItem';
import * as baseTheme from './Accordion.scss';

export type Mode = 'collapsible' | 'multiple';

export interface AccordionItemProps {
  header: React.ReactElement<any>;
  children: React.ReactElement<any>;
}

export interface Props {
  items: AccordionItemProps[];
  mode?: Mode;
}

interface State {
  active: boolean[];
}

class Accordion extends React.Component<Props, State> {
  private getUniqueID = createUniqueIDFactory('Accordion');
  private getItemUniqueID = createUniqueIDFactory('AccordionItems');
  private id = this.getUniqueID();

  constructor(props: Props) {
    super(props);

    const initialState: boolean[] = [];
    props.items.forEach((element) => {
      initialState.push(false);
    });

    this.state = {
      active: initialState
    };
  }

  render() {
    const {
      items
    } = this.props;

    const {
      active
    } = this.state;

    const itemsComponent = items.map((item, index) =>
        <AccordionItem
          index= {index}
          key= {this.getItemUniqueID()}
          toggle = {this.toggleItem}
          active = {active[index] ? true : false}
          header = {item.header}
        >
          {item.children}
        </AccordionItem>
      );

    return (
      <div key={this.id}>
        {itemsComponent}
      </div>
    );
  }

  @autobind
  public toggleItem(toggleIndex: number) {
    if (this.props.mode === 'collapsible') {
      this.setState({
        active: this.state.active.map((value: boolean, index: number) =>
          index === toggleIndex ? !value : false
        )
      });
    } else {
      this.setState({
        active: this.state.active.map((value: boolean, index: number) =>
          index === toggleIndex ? !value : value
        )
      });
    }
  }
}

export { Accordion as UnthemedAccordion };
export default themr(ACCORDION, baseTheme)(Accordion) as ThemedComponentClass<Props, {}>;
