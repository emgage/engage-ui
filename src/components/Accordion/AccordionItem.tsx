import * as React from 'react';
import * as baseTheme from './Accordion.scss';

export interface Props {
  header: React.ReactElement<any>;
  children: React.ReactElement<any>;
  active?: boolean;
  toggle?(): void;
}

export default class Accordion extends React.PureComponent<Props, never> {
  
  render() {
    const {
      header,
      children,
      active,
      toggle
    } = this.props;

    return (
      <div className={baseTheme.accordionItem}>
        <div className={active ? baseTheme.header : baseTheme.headerCollapsed} onClick={toggle}>
          {header}
        </div>
        <div className={active ? baseTheme.body : baseTheme.bodyCollapsed}>
          {children}
        </div>
      </div>
    );
  }
}