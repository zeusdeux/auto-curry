auto-curry
==========

Supercharge your functions by giving them the ability to auto-curry.

#Installation

```javascript
npm install auto-curry --save
```

#Usage

In `node`, you can just `require('auto-curry')`.

In the browser, you can use `build/auto-curry.min.js`

- with `require.js`, `browserify` etc
- directly by using `window.autoCurry`

##Node

```javascript
var cu = require('auto-curry');
var add = cu(function (a, b) {
    return a + b;
});
var messWithThis = cu(function(v){
  this.a.push(v);
  return ++v;
});
var map = cu(function map(fn, list) {
  var self = arguments[2] ? arguments[2] : this;
  try {
    return list.map(fn, self);
  }
  catch (e) {
    return [].map.call(list, fn, self);
  }
});
var x = {a: []};

console.log(map(add(1), [1, 2, 3])); //[2, 3, 4]
console.log(map(messWithThis, [1,2,3], x)); //[2, 3, 4]
console.log(x.a); //[1, 2, 3]
```

##Browser
```javascript
var cu = window.autoCurry; //using it off the global
var add = cu(function (a, b) {
    return a + b;
});
var messWithThis = cu(function(v){
  this.a.push(v);
  return ++v;
});
var map = cu(function map(fn, list) {
  console.log(arguments[2]);
  var self = arguments[2] ? arguments[2] : this;
  try {
    return list.map(fn, self);
  }
  catch (e) {
    return [].map.call(list, fn, self);
  }
});
var x = {a: []};

console.log(map(add(1), [1, 2, 3])); //[2, 3, 4]
console.log(map(messWithThis, [1,2,3], x)); //[2, 3, 4]
console.log(x.a); //[1, 2, 3]
```

#License

[MIT](https://github.com/zeusdeux/auto-curry/blob/master/LICENSE)
