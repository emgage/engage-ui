function isEmpty(obj: any) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

module.exports = isEmpty;
