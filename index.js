module.exports = function cu(fn) {
  'use strict'

  var args = [].slice.call(arguments)
  var typeOfFn = typeof fn

  if ('function' !== typeOfFn) throw new Error('auto-curry: Invalid parameter. Expected function, received ' + typeOfFn)
  if (fn.length <= 1) return fn
  if (args.length - 1 >= fn.length) return fn.apply(this, args.slice(1))

  return function() {
    return cu.apply(this, args.concat([].slice.call(arguments)))
  };
};
