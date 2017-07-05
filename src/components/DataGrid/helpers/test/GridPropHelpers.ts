let rows: any[] = [];
for (let i = 0; i < 1000; i++) {
  rows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000,
  });
}
export default {
  columns: [{
    key: 'id',
    name: 'ID',
    width: 100,
  },
  {
    key: 'title',
    name: 'Title',
    width: 100,
  },
  {
    key: 'count',
    name: 'Count',
    width: 100,
  },
  ],
  rowGetter(i: number) {
    return rows[i];
  },
  rowsCount() {
    return rows.length;
  },
  cellMetaData: {
    selected: { idx: 2, rowIdx: 3 },
    dragged: null,
    copied: null,
  },
};
