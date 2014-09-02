auto-curry
==========

Supercharge your functions by giving them the ability to auto-curry.

#Installation

```javascript
npm install auto-curry --save
```

#Usage

```javascript
var cu = require('auto-curry');
var add = cu(function (a, b) {
    return a + b;
});
var map = cu(function map(list, fn) {
  try {
    return list.map(fn);
  }
  catch (e) {
    return [].map.call(list, fn);
  }
});

console.log(map([1, 2, 3], add(1))); //[2, 3, 4]
```

#License

[MIT](https://github.com/zeusdeux/auto-curry/blob/master/LICENSE)
