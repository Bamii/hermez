const getType = o => Object.prototype.toString.call(o).split(' ')[1].slice(0, -1).toLowerCase();

const is = (type, value) => getType(value).toLowerCase() === type.toLowerCase();

const flatten = (obj, type = '') => {
  let top = [];
  for (let z in obj) {
    const val = obj[z];

    let root = [z];
    for (let value of val) {
      if (is('object', value)) {
        root.push(flatten(value));
      } else if (type === "all") {
        root.push(value);
      }
    }
    top.push(root);
    root = [];
  }
  return top;
}

module.exports = {
  getType,
  is,
  flatten
}