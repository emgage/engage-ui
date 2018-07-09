import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

import Button from '../Button';

import Dropdown from '../Dropdown';

import TableData from './TableData';

import * as baseTheme from './Table.scss';

export interface Props {
  dataId?: string | number;
  // Individual row action, if available add it in last of the column
  actionConfig?: any;
  theme?: any;
}

export interface State {
  active: boolean;
  anchorEl?: HTMLElement;
}

class RowAction extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  dropdownToggle = (e: React.FormEvent<HTMLElement>) => {
    this.setState({
      anchorEl: e.target as HTMLElement,
      active: !this.state.active
    });

    // return () =>  item.action(this.props.dataId);
  }

  render () {
    const { actionConfig, dataId } = this.props;

    return (
      <TableData>
        <Button icon="horizontalDots" onClick={(e: React.FormEvent<HTMLElement>) => this.dropdownToggle(e)} />

        <Dropdown
          active={this.state.active}
          dropdownItems={actionConfig}
          toggle={() => this.dropdownToggle}
          anchorEl = {this.state.anchorEl}
          returnValue={dataId}
          closeOnClickOutside
        />

        {/* <Popover
          active={this.state.active}
          >
          <Pane>
            <List type="striped">
              {
                actionConfig.map((item: any, index: number) => {
                  return (
                    <Item key={index} onClick={this.triggerAction(item)}>{ item.label }</Item>
                  );
                })
              }
            </List>
          </Pane>
        </Popover> */}
      </TableData>
    );
  }
}

export default themr(TABLE, baseTheme)(RowAction) as ThemedComponentClass<Props, State>;
