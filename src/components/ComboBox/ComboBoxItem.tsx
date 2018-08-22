import * as React from 'react';

import Label from '../Label';
import Accordion from '../Accordion';
import { ItemType } from './ComboBox';

export interface ComboItemProps {
  type?: ItemType;
  key?: string;
  value: any;
  renderer?(value: any, type?: string): React.ReactElement<any>;
}

export interface AccordianItem {
  header: React.ReactElement<any>;
  children: React.ReactElement<any>;
}

export interface Props {
  item: ComboItemProps;
  clickHandler?(value: string | null | boolean, key?: string): void;
}

export default class ComboBoxItem extends React.PureComponent<Props, never> {

  render() {
    const {
      item,
    } = this.props;

    const { key, type, value, renderer } = item;
    switch (type) {
      case 'Accordian' :
        const accordianItems: AccordianItem[] = [];
        value.forEach((val: any, index: number) => {
          const headerKey = val.key;
          const indexStr: string = index.toString();
          if (val.children.length === 0) return null;
          accordianItems.push({
            header: renderer ? renderer(val, 'header') : <Label componentId={indexStr}>{val.header}</Label>,
            children: val.children.map((child: any) => {
              const data = headerKey ? child[headerKey] : (key ? child[key] : child);
              return (
                <div data-key={headerKey ? headerKey : false} data-value={val} data-object={JSON.stringify(child)}>{renderer ? renderer(child, 'children') : data}</div>
              );
            })
          });
        });
        return (
          <div onClick={this.handleClick} data-isparent={true}>
            <Accordion items={accordianItems} />
          </div>
        );
      default:
        return (
          <div data-key={key ? key : false} onClick={this.handleClick}>
            {this.getItem(value, key, renderer)}
          </div>
        );
    }
  }

  private findParent(dom: HTMLElement | null): boolean | string | null {
    if (dom && dom.getAttribute('data-value')) {
      return dom.getAttribute('data-value');
    }
    if (dom && dom.getAttribute('data-isparent')) {
      return false;
    }
    return dom ? this.findParent(dom.parentElement) : false;
  }

  private handleClick = (event: any) => {
    const target = event.target;
    const dataValue: boolean | string | any  = this.findParent(target);
    if (dataValue && this.props.clickHandler) {
      const hasKey = event.currentTarget.getAttribute('data-key');
      const valueToPass = hasKey ?  JSON.parse(dataValue) : dataValue;
      this.props.clickHandler(valueToPass, hasKey);
    }
  }

  private getItem = (value: any, key: string|undefined, renderer: any) => {
    return value.map((val: any) => {
      const data = key ? val[key] : val;
      return (
        <div data-value={JSON.stringify(val)} data-key={key ? key : false} data-object={JSON.stringify(val)}>
          {renderer ? renderer(val) : data}
        </div>
      );
    });
  }
}
