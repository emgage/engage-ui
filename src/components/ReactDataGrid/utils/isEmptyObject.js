function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

module.exports = isEmpty;
