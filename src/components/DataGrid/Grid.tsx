import * as React from 'react';
import ReactMixin from 'react-mixin';
import Header from './Header';
import Viewport from './Viewport';
import GridScrollMixin from './GridScrollMixin';
import { MetricsComputatorMixin } from './DOMMetrics';
import cellMetaDataShape from './PropTypeShapes/CellMetaDataShape';
import { DEFINE_SORT } from './cells/headerCells/SortableHeaderCell';
// // TODO: Add CSS require('../../../themes/react-data-grid-core.css');

export interface Props {
    rowGetter: any,
    columns: any,
    columnMetrics: any,
    minHeight: number,
    totalWidth: any,
    headerRows: any,
    rowHeight: number,
    rowRenderer: any,
    emptyRowsView: any,
    expandedRows: any,
    selectedRows: any,
    rowSelection: any,
    rowsCount: number,
    onRows?: Function,
    sortColumn: string,
    sortDirection: typeof DEFINE_SORT,
    rowOffsetHeight: number,
    onViewportKeydown: any,
    onViewportKeyup: any,
    onViewportDragStart: any,
    onViewportDragEnd: any,
    onViewportDoubleClick: any,
    onColumnResize: Function,
    onSort: Function,
    onHeaderDrop?: Function,
    cellMetaData: cellMetaDataShape,
    rowKey: string,
    rowScrollTimeout: number,
    contextMenu: any,
    getSubRowDetails?: Function,
    draggableHeaderCell: Function,
    getValidFilterValues: Function,
    rowGroupRenderer: Function,
    overScan: object,
};

class Grid extends React.Component<Props, {}> {
    public static defaultProps: Partial<Props> = {
      rowHeight: 35,
      minHeight: 350,
    };

    row: any;
    emptyView: any;
    header: any;
    viewport: any;
    viewPortContainer: any;

    getStyle = (): { overflow: any; outline: number; position: any; minHeight: number } => {
        return {
        overflow: 'hidden',
        outline: 0,
        position: 'relative',
        minHeight: this.props.minHeight,
        };
    }

    render() {
        const headerRows = this.props.headerRows || [{ref: (node: any) => this.row = node}];
        const EmptyRowsView = this.props.emptyRowsView;

    return (
        <div style={this.getStyle()} className="react-grid-Grid">
            <Header
                ref={(input: any) => { this.header = input; } }
                columnMetrics={this.props.columnMetrics}
                onColumnResize={this.props.onColumnResize}
                height={this.props.rowHeight}
                totalWidth={this.props.totalWidth}
                headerRows={headerRows}
                sortColumn={this.props.sortColumn}
                sortDirection={this.props.sortDirection}
                draggableHeaderCell={this.props.draggableHeaderCell}
                onSort={this.props.onSort}
                onHeaderDrop={this.props.onHeaderDrop as any}
                onScroll={GridScrollMixin.onHeaderScroll}
                getValidFilterValues={this.props.getValidFilterValues}
                cellMetaData={this.props.cellMetaData}
            />
          {this.props.rowsCount >= 1 || (this.props.rowsCount === 0 && !this.props.emptyRowsView) ?
            <div ref={(node: any) => { this.viewPortContainer = node; } } tabIndex={0} onKeyDown={this.props.onViewportKeydown} onKeyUp={this.props.onViewportKeyup} onDoubleClick={this.props.onViewportDoubleClick}   onDragStart={this.props.onViewportDragStart} onDragEnd={this.props.onViewportDragEnd}>
                <Viewport
                  ref={(node: any) => { this.viewport = node; } }
                  rowKey={this.props.rowKey}
                  rowHeight={this.props.rowHeight}
                  rowRenderer={this.props.rowRenderer}
                  rowGetter={this.props.rowGetter}
                  rowsCount={this.props.rowsCount}
                  selectedRows={this.props.selectedRows}
                  expandedRows={this.props.expandedRows}
                  columnMetrics={this.props.columnMetrics}
                  totalWidth={this.props.totalWidth}
                  onScroll={GridScrollMixin.onScroll}
                  onRows={this.props.onRows as any}
                  cellMetaData={this.props.cellMetaData}
                  rowOffsetHeight={this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length}
                  minHeight={this.props.minHeight}
                  rowScrollTimeout={this.props.rowScrollTimeout}
                  contextMenu={this.props.contextMenu}
                  rowSelection={this.props.rowSelection}
                  getSubRowDetails={this.props.getSubRowDetails as any}
                  rowGroupRenderer={this.props.rowGroupRenderer}
                />
            </div>
        :
            <div ref={(node) => { this.emptyView = node; } } className="react-grid-Empty">
                <EmptyRowsView />
            </div>
        }
      </div>
    );
    }
};

ReactMixin(Grid.prototype, GridScrollMixin);
ReactMixin(Grid.prototype, MetricsComputatorMixin);

export default Grid;
