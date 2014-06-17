var ComplexNumber = require('../complex.js').ComplexNumber;
var assert = require('./assert.js').assert;

var type = {}.toString.call;

var test1 = new ComplexNumber(1, 2);
assert(type(test1), '[object ComplexNumber]', 'typeof');
assert(test1.real, 1, 'Number');
assert(test1.imag, 2, 'Number');
assert(test1.length, 2, 'Number');
assert(test1.toString(), '1 + 2i', 'String');

var test2 = new ComplexNumber(0, 2);
