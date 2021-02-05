import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { ItemType } from './PopoverPicker';
import { POPOVERPICKER } from '../ThemeIdentifiers';
import * as baseTheme from './PopoverPicker.scss';
import { Table } from '../Table';

export interface ComboItemProps {
  type?: ItemType;
  key?: string;
  value: any;
  column?: any;
}

export interface AccordianItem {
  header: React.ReactElement<any>;
  children: React.ReactElement<any>;
}

export interface Props {
  item: ComboItemProps;
  serverSort?: any;
  clickHandler?(value: string | null | boolean, key?: string): void;
  theme?: any;
}

class PopoverPikerItem extends React.PureComponent<Props, never> {
  render() {
    const {
      serverSort,
      item,
      theme,
    } = this.props;

    const { key, value, column: columnConfig } = item;

    return (
      <div data-isparent={true} data-key={key ? key : false} className={theme.itemContainer}>
        <Table
          sorting="all"
          data={value}
          column={columnConfig}
          onRowClick={this.handleRowClick}
          rowCallbackValue="id"
          serverSort={serverSort}
        />
      </div>
    );
  }

  private handleRowClick = (data: any) => {
    const dataId: number = data;
    const { item : { value } } = this.props;
    const findIndex = value.findIndex((i: any) => i.id === dataId);

    if (findIndex !== -1 && this.props.clickHandler) {
      this.props.clickHandler(value[findIndex]);
    }
  }
}

export default themr(POPOVERPICKER, baseTheme)(PopoverPikerItem) as ThemedComponentClass<Props, never>;
