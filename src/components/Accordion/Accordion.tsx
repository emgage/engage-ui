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
  items: AccordionItemProps[],
  mode?: Mode
}

interface State {
  active: boolean[]
}

const getUniqueID = createUniqueIDFactory('Accordion');
const getItemUniqueID = createUniqueIDFactory('AccordionItems');

class Accordion extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let initialState: boolean[] = [];
    props.items.forEach(element => {
      initialState.push(false)
    });

    this.state = {
      active: initialState
    };
  }
  
  public id = getUniqueID();
  
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
          key= {getItemUniqueID()}
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
  private toggleItem(index: number) {
    let updatedPopoverActive = this.state.active;
    updatedPopoverActive[index] = !updatedPopoverActive[index];

    this.setState({
      active: updatedPopoverActive
    });
  }
}

export default themr(ACCORDION, baseTheme)(Accordion) as ThemedComponentClass<Props, {}>;