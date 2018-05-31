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
  // Items of the accordion component
  items: AccordionItemProps[];
  // Mode of accordion. it can be collapsible or multiple
  mode?: Mode;
  // Index of item which you want to be active
  openIndex?: number;
  // Index of item which you want to be in-active
  closeIndex?: number;
}

interface State {
  // to maintain state of accordion component (active/inactive)
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

    if (props.openIndex !== undefined) {
      initialState[props.openIndex] = true;
    }

    this.state = {
      active: initialState
    };
  }

  // tslint:disable-next-line:function-name
  UNSAFE_componentWillReceiveProps(nextProps : Props) {
    // if both not present don't change the state
    if (nextProps.openIndex === undefined && nextProps.closeIndex === undefined) {
      return null;
    }

    if (nextProps.openIndex !== undefined && nextProps.closeIndex !== undefined) {
      if (nextProps.closeIndex < this.state.active.length && nextProps.openIndex < this.state.active.length &&
          (this.state.active[nextProps.closeIndex] || !this.state.active[nextProps.openIndex])) {
        if (this.props.mode === 'collapsible') {
          this.setState({
            active: this.state.active.map((value: boolean, index: number) =>
              index === nextProps.openIndex ? true : false
            )
          });
        } else {
          const newActive = this.state.active;
          newActive[nextProps.closeIndex] = false;
          newActive[nextProps.openIndex] = true;
          this.setState({
            active: newActive
          });
        }
      }
    } else if (nextProps.closeIndex !== undefined && nextProps.closeIndex < this.state.active.length && this.state.active[nextProps.closeIndex]) {
      const newActive = this.state.active;
      newActive[nextProps.closeIndex] = false;
      this.setState({
        active: newActive
      });
    } else if (nextProps.openIndex !== undefined && nextProps.openIndex < this.state.active.length && !this.state.active[nextProps.openIndex]) {
      if (this.props.mode === 'collapsible') {
        this.setState({
          active: this.state.active.map((value: boolean, index: number) =>
            index === nextProps.openIndex ? true : false
          )
        });
      } else {
        const newActive = this.state.active;
        newActive[nextProps.openIndex] = true;
        this.setState({
          active: newActive
        });
      }
    }
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
  private toggleItem(toggleIndex: number) {
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
