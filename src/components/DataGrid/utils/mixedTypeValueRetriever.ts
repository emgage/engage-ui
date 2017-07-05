const getMixedTypeValueRetriever = (isImmutable: boolean) => {
  let retObj: any = {};
  const retriever = (item: any, key: any) => item[key];
  const immutableRetriever =  (immutable: any, key: any) => immutable.get(key);

  retObj.getValue = isImmutable ? immutableRetriever : retriever;

  return retObj;
};

export default getMixedTypeValueRetriever;
