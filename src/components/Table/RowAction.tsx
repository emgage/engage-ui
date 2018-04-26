import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { TABLE } from '../ThemeIdentifiers';

// import Button from '../Button';

// import Item from '../List/Item';
// import List from '../List';
// import Popover from '../Dropdown';
// import Pane from '../Dropdown/Pane';

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
}

class RowAction extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  render () {
    // const { actionConfig } = this.props;

    return (
      <TableData>
        {/* <Popover
          active={this.state.active}
          >
          <Pane>
            <List type="striped">
              {
                actionConfig.map((action: any, index: number) => {
                  return (
                    <Item key={index}>{ action.label }</Item>
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
