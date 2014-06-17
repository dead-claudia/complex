exports.runTests = function () {

var test1 = new ComplexNumber(1, 2);

assert(test1.plus(new ComplexNumber(1, 3)),
       new ComplexNumber(2, 5),
       'ComplexNumber');
assert(test1.plus(new ComplexNumber(-1, 3)),
       new ComplexNumber(0, 5),
       'ComplexNumber');
assert(test1.plus(1),
       new ComplexNumber(2, 2),
       'ComplexNumber');
assert(test1.plus(new ComplexNumber(1, -2)),
       new ComplexNumber(2, 0),
       'ComplexNumber'
foo[5]  = test.minus(new ComplexNumber(2, 3));
foo[6]  = test.minus(1);
foo[7]  = test.times(new ComplexNumber(3, 4));
foo[8]  = test.times(2);
foo[9]  = test.divide(new ComplexNumber(1, 2));
foo[10] = test.divide(3);

}; // end runTests()