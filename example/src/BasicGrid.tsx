import * as React from 'react';
import { Grid } from '../../src/components';

export default class BasicExample extends React.Component<any, any> {

    _rows: any;

    constructor(props) {
        super(props);
        this.state = {columns: () => {
        this.createRows();
        return [
            { key: 'id', name: 'ID' },
            { key: 'title', name: 'Title' },
            { key: 'count', name: 'Count' } ];
        }};
    }

  createRows() {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000,
      });
    }

    this._rows = rows;
  }

  rowGetter(i) {
    return this._rows[i];
  }

  render() {
    return  (
      <Grid
        columns={this.state.columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={500} />);
  }
};
