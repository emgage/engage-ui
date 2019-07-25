import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import Label from '../Label';
import Accordion from '../Accordion';
import { ItemType } from './ComboBox';
import { COMBOBOX } from '../ThemeIdentifiers';

import * as baseTheme from './ComboBox.scss';
import Icon from '../Icon';

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
  theme?: any;
}

class ComboBoxItem extends React.PureComponent<Props, never> {
  render() {
    const {
      item,
      theme,
    } = this.props;

    const { key, type, value, renderer } = item;

    switch (type) {
      case 'Accordian' :
        const accordianItems: AccordianItem[] = [];

        value.forEach((val: any, index: number) => {
          const headerKey = key;
          const indexStr: string = index.toString();

          if (val.children.length === 0) {
            return null;
          }

          accordianItems.push({
            header: renderer ? renderer(val, 'header') :
              <Label componentClass={theme.accordionItemHeader} componentId={indexStr} theme={theme}>
                <Icon source="chevronRight" theme={theme} />
                <span className={theme.headerText}>{val.header}</span>
              </Label>,
            children: val.children.map((child: any, index: number) => {
              const data = headerKey ? child[headerKey] : (key ? child[key] : child);

              return (
                <div
                  key={index}
                  data-key={headerKey ? headerKey : false}
                  data-value={JSON.stringify(child)}
                  data-object={JSON.stringify(child)}
                  className={theme.accordionItem}>
                    {renderer ? renderer(child, 'children') : data}
                </div>
              );
            })
          });
        });

        return (
          <div key={new Date().getUTCMilliseconds()} onClick={this.handleClick} data-isparent={true}>
            <Accordion items={accordianItems} theme={theme} />
          </div>
        );
      default:
        return (
          <div key={new Date().getUTCMilliseconds()} data-key={key ? key : false} onClick={this.handleClick} className={theme.itemContainer}>
            {this.getItem(value, key, renderer)}
          </div>
        );
    }
  }

  // get the parent of the clicked element, to fetch the selected value
  private findParent(dom: HTMLElement | null): boolean | string | null {
    if (dom && dom.getAttribute('data-value')) {
      return dom.getAttribute('data-value');
    }
    if (dom && dom.getAttribute('data-isparent')) {
      return false;
    }

    return dom ? this.findParent(dom.parentElement) : false;
  }

  // Get fetching key which get the field key
  private getDataKey(dom: HTMLElement | null, event: any): boolean | string | null {
    if (dom && dom.getAttribute('data-key')) {
      return dom.getAttribute('data-key');
    }

    if (event.currentTarget.getAttribute('data-key')) {
      return event.currentTarget.getAttribute('data-key');
    }

    return dom ? this.getDataKey(dom.parentElement, event) : false;
  }

  private handleClick = (event: any) => {
    const target = event.target;
    const dataValue: boolean | string | any  = this.findParent(target);

    if (dataValue && this.props.clickHandler) {
      const hasKey = this.getDataKey(target, event);
      const valueToPass = hasKey ?  JSON.parse(dataValue) : dataValue;

      this.props.clickHandler(valueToPass, hasKey as string);
    }
  }

  private getItem = (value: any, key: string | undefined, renderer: any) => {
    const { theme } = this.props;

    return value.map((val: any, index: number) => {
      const data = key ? val[key] : val;

      return (
        <div
          key={index + data}
          data-value={JSON.stringify(val)}
          data-key={key ? key : false}
          data-object={JSON.stringify(val)}
          className={theme.comboboxItem}>
          {renderer ? renderer(val) : data}
        </div>
      );
    });
  }
}

export default themr(COMBOBOX, baseTheme)(ComboBoxItem) as ThemedComponentClass<Props, never>;
