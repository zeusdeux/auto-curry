module.exports = function cu(fn) {
  var args = [].slice.call(arguments);
  if ('function' !== typeof fn) throw new Error('auto-curry: Invalid parameter. First parameter should be a function.');
  if ('function' === typeof fn && !fn.length) return fn;
  if (args.length - 1 >= fn.length) return fn.apply(this, args.slice(1));
  return function() {
    var tempArgs = args.concat([].slice.call(arguments));
    return cu.apply(this, tempArgs);
  };
};
