export const queryData = (value: string) => {
  return document.querySelector(`[data-${value}]`);
};

export const getElement = (dataId: string) => {
  return queryData(`id="${dataId}"`);
};

export const cleanClasses = (c: string[]) => {
  const str = (c).join(' ').trim().replace(/,/gi, ' ');
  return str;
};

export const cleanProps = (ignoreKeys: string[]) => {
  const ignore: string[] = [
    ...ignoreKeys,
  ];

  return (
    (obj: object) => {

      const objtest = Object.getPrototypeOf(obj);

      for (let i: number = 0; i < ignore.length; i++) {
        if (objtest[ignore[i]]) {
          objtest[ignore[i]] = null;
        }
      }
      return objtest;
    }
  );
};

export default {
  cleanClasses,
  cleanProps,
  getElement,
  queryData,
};
