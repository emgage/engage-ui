import * as React from 'react';
import Canvas from './Canvas';
import ViewportScroll from './ViewportScrollMixin';
import cellMetaDataShape from './PropTypeShapes/CellMetaDataShape';

export interface Props {
    rowOffsetHeight: number,
    totalWidth: number | string,
    columnMetrics: any,
    rowGetter: any,
    selectedRows: any[],
    rowSelection: any,
    expandedRows: any[],
    rowRenderer: any,
    rowsCount: number,
    rowHeight: number,
    onRows: Function,
    onScroll: Function,
    minHeight: number,
    cellMetaData: cellMetaDataShape,
    rowKey: string,
    rowScrollTimeout: number,
    contextMenu: any,
    getSubRowDetails: Function,
    rowGroupRenderer: Function,
};

class Viewport extends React.Component<Props, any> {

  canvas: any;
  mixins: [ViewportScroll];

  onScroll(scroll: {scrollTop: number; scrollLeft: number}) {
    this.updateScroll(
      scroll.scrollTop, scroll.scrollLeft,
      this.state.height,
      this.props.rowHeight,
      this.props.rowsCount,
    );

    if (this.props.onScroll) {
      this.props.onScroll({scrollTop: scroll.scrollTop, scrollLeft: scroll.scrollLeft});
    }
  }

  getScroll(): {scrollLeft: number; scrollTop: number} {
    return this.canvas.getScroll();
  }

  setScrollLeft(scrollLeft: number) {
    this.canvas.setScrollLeft(scrollLeft);
  }

  render() {
    const style = {
      padding: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflow: 'hidden' as any,
      position: 'absolute' as any,
      top: this.props.rowOffsetHeight,
    };
    return (
      <div
        className="react-grid-Viewport"
        style={style}>
        <Canvas
          ref={(node: any) => this.canvas = node}
          rowKey={this.props.rowKey}
          totalWidth={this.props.totalWidth}
          width={this.props.columnMetrics.width}
          rowGetter={this.props.rowGetter}
          rowsCount={this.props.rowsCount}
          selectedRows={this.props.selectedRows}
          expandedRows={this.props.expandedRows}
          columns={this.props.columnMetrics.columns}
          rowRenderer={this.props.rowRenderer}
          displayStart={this.state.displayStart}
          displayEnd={this.state.displayEnd}
          visibleStart={this.state.visibleStart}
          visibleEnd={this.state.visibleEnd}
          colVisibleStart={this.state.colVisibleStart}
          colVisibleEnd={this.state.colVisibleEnd}
          colDisplayStart={this.state.colDisplayStart}
          colDisplayEnd={this.state.colDisplayEnd}
          cellMetaData={this.props.cellMetaData}
          height={this.state.height}
          rowHeight={this.props.rowHeight}
          onScroll={this.onScroll}
          onRows={this.props.onRows}
          rowScrollTimeout={this.props.rowScrollTimeout}
          contextMenu={this.props.contextMenu}
          rowSelection={this.props.rowSelection}
          getSubRowDetails={this.props.getSubRowDetails}
          rowGroupRenderer={this.props.rowGroupRenderer}
          isScrolling={this.state.isScrolling || false}
        />
      </div>
    );
  }
};

export default Viewport;
