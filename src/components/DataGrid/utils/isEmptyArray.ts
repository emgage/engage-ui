const isEmptyArray = (obj: any) => {
  return Array.isArray(obj) && obj.length === 0;
};

module.exports = isEmptyArray;
