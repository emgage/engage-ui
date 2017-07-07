import * as React from 'react';

export interface SimpleRowsContainerProps {
  width: number,
  rows: Array<any>,
};

const SimpleRowsContainer = (props: SimpleRowsContainerProps) => {
  return (
    <div key="rows-container">
      {props.rows}
    </div>
  );
};

export interface RowsContainerProps {
  contextMenu: any,
  rowIdx: number,
  idx: number,
  window?: any,
};

class RowsContainer extends React.Component<RowsContainerProps & SimpleRowsContainerProps, any> {

  plugins: any;

  constructor(props: RowsContainerProps & SimpleRowsContainerProps) {
    super(props);
    this.plugins = props.window ? props.window.ReactDataGridPlugins : (window as any).ReactDataGridPlugins;
    this.hasContextMenu = this.hasContextMenu.bind(this);
    this.renderRowsWithContextMenu = this.renderRowsWithContextMenu.bind(this);
    this.getContextMenuContainer = this.getContextMenuContainer.bind(this);
    this.state = {ContextMenuContainer: this.getContextMenuContainer()};
  }

  getContextMenuContainer() {
    if (this.hasContextMenu()) {
      if (!this.plugins) {
        throw new Error('You need to include ReactDataGrid UiPlugins in order to initialise context menu');
      }
      return this.plugins.Menu.ContextMenuLayer('reactDataGridContextMenu')(SimpleRowsContainer);
    }
  }

  hasContextMenu() {
    return this.props.contextMenu && React.isValidElement(this.props.contextMenu);
  }

  renderRowsWithContextMenu() {
    const ContextMenuRowsContainer = this.state.ContextMenuContainer;
    const newProps = {rowIdx: this.props.rowIdx, idx: this.props.idx};
    const contextMenu = React.cloneElement(this.props.contextMenu, newProps);
    // Initialise the context menu if it is available
    return (<div><ContextMenuRowsContainer {...this.props} />{contextMenu}</div>);
  }

  render() {
    return this.hasContextMenu() ? this.renderRowsWithContextMenu() : <SimpleRowsContainer {...this.props} />;
  }
};

export default RowsContainer;
export {SimpleRowsContainer};
