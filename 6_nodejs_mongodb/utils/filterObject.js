function filterObject(obj, allowedKeys) {
  return Object.keys(obj)
    .filter((key) => allowedKeys.includes(key))
    .reduce((filteredObj, key) => {
      filteredObj[key] = obj[key];
      return filteredObj;
    }, {});
}

module.exports = filterObject;
