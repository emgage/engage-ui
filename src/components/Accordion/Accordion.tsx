import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { ACCORDION } from '../ThemeIdentifiers';
import AccordionItem from './AccordionItem';
import * as baseTheme from './Accordion.scss';

export interface AccordionItemProps {
  header: React.ReactElement<any>;
  children: React.ReactElement<any>;
  active?: boolean;
  toggle?(): void;
}

export interface Props {
  Items: AccordionItemProps[]
}

const getUniqueID = createUniqueIDFactory('Accordion');
const getItemUniqueID = createUniqueIDFactory('AccordionItems');

class Accordion extends React.Component<Props, never> {
  public id = getUniqueID();
  
  render() {
    const {
      Items
    } = this.props;

    const itemsComponent = Items.map((item,index) => 
        <AccordionItem
          key= {getItemUniqueID()}
          toggle = {item.toggle}
          active = {item.active}
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
}

export default themr(ACCORDION, baseTheme)(Accordion) as ThemedComponentClass<Props, {}>;