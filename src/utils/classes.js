/**
 *
 * @param  {...any} args
 * @usage classes('classname', {classname: true, classname: false}, {classname: true})
 * @returns 'classname classname'
 */
const classes = (...args) =>
  args
    .map((className) => {
      if (typeof className === 'string') return className;

      // it is object
      return Object.keys(className)
        .filter((className2) => className[className2])
        .join(' ');
    })
    .filter(Boolean)
    .join(' ');

export default classes;
