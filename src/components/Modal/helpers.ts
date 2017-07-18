export const getElement: any = (dataId: any) => {
  return queryData(`kitid="${dataId}"`);
};

export const cleanClasses = (c: any) => {
  const str = (c).join(' ').trim().replace(/,/gi, ' ');
  return str !== '' ? str : null;
};


export const cleanProps = (ignoreKeys: any) => {
  const ignore = [
    ...ignoreKeys,
    'animate',
    'center',
    'children',
    'classes',
    'contrast',
    'col',
    'colLarge',
    'colMedium',
    'colSmall',
    'kitid',
    'list'
  ];

  return (obj: any) => {
    if (typeof obj !== 'object' || Array.isArray(obj)) return null;

    const newObj: any = {...obj};

    for (let i = 0; i < ignore.length; i++) {
      if (obj[ignore[i]]) {
        newObj[ignore[i]] = null;
      }
    }

   const Aa = [Object.keys(newObj).forEach((key) => 
  (newObj[key] == null) && delete newObj[key]), newObj][1]
    return Aa;
  };
};


export const colSpan = [
  '1-1',
  '1-2',
  '1-3', '2-3',
  '1-4', '2-4', '3-4',
  '1-5', '2-5', '3-5', '4-5',
  '1-6', '2-6', '3-6', '4-6', '5-6',
  '1-10', '2-10', '3-10', '4-10', '5-10', '6-10', '7-10', '8-10', '9-10'
];


export const stringToClasses = (str: string, cssClasses: any) => {
  let classes = str.split(' ').map(item => {
    return cssClasses[item];
  });

  return classes.join(' ');
};


export const getClasses = (str: string, cssClasses: any) => {
  return typeof str === 'string' ? stringToClasses(str, cssClasses) : '';
};


export const getClass = (str: string, cssClasses: any) => {
  return cssClasses[str] ? cssClasses[str] : '';
};


export const queryData = (value: any) => {
  return document.querySelector(`[data-${value}]`);
};


export const queryDataAll = (value: any) => {
  return document.querySelectorAll(`[data-${value}]`);
};




export default {
  //closeClass,
  colSpan,
  cleanClasses,
  cleanProps,
  getClasses,
  getClass,
  getElement,
  stringToClasses,
  queryData,
  queryDataAll
};
