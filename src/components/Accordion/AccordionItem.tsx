import * as React from 'react';
import * as baseTheme from './Accordion.scss';
import { autobind } from '@shopify/javascript-utilities/decorators';

export interface Props {
  index: number;
  header: React.ReactElement<any>;
  children: React.ReactElement<any>;
  active?: boolean;
  toggle?(index: number): void;
  style?:any;
}

export default class AccordionItem extends React.PureComponent<Props, never> {

  render() {
    const {
      header,
      children,
      active,
      style
    } = this.props;

    return (
      <div className={baseTheme.accordionItem}>
        <div className={active ? baseTheme.header : baseTheme.headerCollapsed} style={style} onClick={this.clickHandler}>
          {header}
        </div>
        <div className={active ? baseTheme.body : baseTheme.bodyCollapsed}>
          {children}
        </div>
      </div>
    );
  }

  @autobind
  private clickHandler() {
    if (typeof this.props.toggle !== 'undefined') {
      this.props.toggle(this.props.index);
    }
  }
}
