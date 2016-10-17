var cu = require('../');
var a = require('assert');

/*---------------------------------------------------------------------
Some tests taken from:

  https://github.com/dominictarr/curry/blob/master/test/curry-test.js

Two tests from dominic's `curry` have been dropped. They are:

  1. 'extra' arguments test: I do not want to drop extra arguments to
  support functions like Array.prototype.map which have an arity of 1
  but can accept more parameters (thisArg in case of map as 2nd param).

  2. reporting arity test: I do not go the way of most libraries that
  curry by using `eval` to create a new function with defined arity.
  I go the recursive route and thus have no way of setting the arity
  as the `length` property on Function is not configurable.
---------------------------------------------------------------------*/

describe('auto-curry', function() {
  it('should curry in the haskell sense, taking the arity from the function', function() {
    var sum5 = function(a, b, c, d, e) {
      return a + b + c + d + e;
    };
    var sum5C = cu(sum5);

    a.equal(sum5(1, 2, 3, 4, 5), sum5C(1)(2)(3)(4)(5));
  });

  it('should be pure - each new argument should not affect the overall list', function() {
    var add = cu(function(a, b) {
      return a + b;
    });
    var add1 = add(1);
    var add2 = add(2);

    a.equal(add1(1), 2);
    a.equal(add1(2), 3);
    a.equal(add1(3), 4);
    a.equal(add1(4), 5);

    a.equal(add2(1), 3);
    a.equal(add2(2), 4);
    a.equal(add2(3), 5);
    a.equal(add2(4), 6);
  });

  it('should throw if first argument is not a function', function() {
    a.throws(cu.bind(null, 1), /Invalid parameter/);
  });

  it('should allow multiple arguments to be passed at a time', function() {
    var sum3 = cu(function(a, b, c) {
      return a + b + c;
    });

    a.equal(sum3(1, 2, 3), sum3(1, 2)(3));
    a.equal(sum3(1, 2, 3), sum3(1)(2, 3));
    a.equal(sum3(1, 2, 3), sum3(1)(2)(3));
  });

  it('should allow for optional parameters', function() {
    //thisArg is optional
    var map = cu(function(predicate, list) {
      var self = arguments[2] ? arguments[2] : this;
      return list.map(predicate, self);
    });
    var x = {
      a: []
    };
    var result = map(function(v) {
      this.a.push(v);
      return ++v;
    }, [3, 4, 5, 6], x);

    a.deepEqual(result, [4, 5, 6, 7]);
    a.deepEqual(x.a, [3, 4, 5, 6]);
  });

  it('should return the function if its arity is zero or one', function() {
    var fn = function() {
      console.log('most useful function EVER!');
    };
    var id = function(x) {
      return x;
    };

    var curriedFn = cu(fn);
    a.strictEqual(curriedFn, fn);

    curriedFn = cu(id);
    a.strictEqual(curriedFn, id);
  });

  it('should all "just work"', function() {
    var map = cu(function map(fn, list) {
      var self = arguments[2] ? arguments[2] : this;
      try {
        return list.map(fn, self);
      }
      catch (e) {
        return [].map.call(list, fn, self);
      }
    });
    var filter = cu(function filter(fn, list) {
      var self = arguments[2] ? arguments[2] : this;
      try {
        return list.filter(fn, self);
      }
      catch (e) {
        return [].filter.call(list, fn, self);
      }
    });
    var add = cu(function(a, b) {
      return a + b;
    });
    var lessThan = cu(function(a, b) {
      return b < a;
    });
    var flip = function(fn) {
      return cu(function(a, b) {
        return fn.call(this, b, a);
      });
    };

    a.deepEqual(filter(lessThan(4), [0,1,2,3,4]), [0,1,2,3]);
    a.deepEqual(map(flip(add)(' ola'), 'abcd'), ['a ola', 'b ola', 'c ola', 'd ola']);
  });
});
