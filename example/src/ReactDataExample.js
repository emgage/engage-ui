import { ReactDataGrid } from '../../src/components';
const React = require('react');

const ReactDataExample = React.createClass({
  getInitialState() {
    this.createRows();
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'count', name: 'Count' } ];
    return null;
  },

  createRows() {
    let rows = [];
    for (let i = 1; i < 100; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i
      });
    }
    this._rows = rows;
  },

  rowGetter(i) {
    return this._rows[i];
  },

  render() {
    return  (
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={500} 
        summary={'This is the summary'}
        caption={'This is the caption'}/>);
  }
});

export default ReactDataExample;