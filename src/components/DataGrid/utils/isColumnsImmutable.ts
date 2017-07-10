import Immutable from 'immutable';

export default function isColumnsImmutable(columns: Array<any>) {
  return (typeof Immutable !== 'undefined' && (columns instanceof Immutable.List));
};
