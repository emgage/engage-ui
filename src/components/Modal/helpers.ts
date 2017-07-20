export const queryData = (value: string) => {
  return document.querySelector(`[data-${value}]`);
};

export const getElement = (dataId: string) => {
  return queryData(`id="${dataId}"`);
};

export const cleanClasses = (c: any) => {
  const str = (c).join(' ').trim().replace(/,/gi, ' ');
  return str !== '' ? str : null;
};

export const cleanProps = (ignoreKeys: any) => {
  const ignore = [
    ...ignoreKeys,
  ];

  return (obj: any) => {
    if (typeof obj !== 'object' || Array.isArray(obj)) {return null; } ;

    const newObj: any = { ...obj };

    for (let i = 0; i < ignore.length; i++) {
      if (obj[ignore[i]]) {
        newObj[ignore[i]] = null;
      }
    }

    const Aa = [Object.keys(newObj).forEach((key) =>
      (newObj[key] == null) && delete newObj[key]), newObj][1];
    return Aa;
  };
};

export default {
  cleanClasses,
  cleanProps,
  getElement,
  queryData,
};
