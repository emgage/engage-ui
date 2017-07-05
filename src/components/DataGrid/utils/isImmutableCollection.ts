import { Iterable } from 'immutable';

const isImmutableCollection = (objToVerify: any) => {
  return Iterable.isIterable(objToVerify);
};

export default isImmutableCollection;
