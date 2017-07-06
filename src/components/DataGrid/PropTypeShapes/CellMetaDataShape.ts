export default interface CellMetaDataShape {
  selected: any,
  copied: any,
  dragged: any,
  onCellClick(obj: {}): void,
  onCellDoubleClick(): void,
  onCommit(): void,
  onCommitCancel(): void,
  handleDragEnterRow(): void,
  handleTerminateDrag(): void,
};
