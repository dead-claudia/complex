var ComplexNumber = require('../complex').ComplexNumber;
var assert        = require('./assert').assert;

exports.runTests = function () {

var compInst = new ComplexNumber(1, 2);
var realInst = new ComplexNumber(1, 0);
var imagInst = new ComplexNumber(0, 2);
var zeroInst = new ComplexNumber(0, 0);

var testNumber   = 2;
var testReal     = new ComplexNumber(1, 0);
var testImag     = new ComplexNumber(0, 1);
var testComp     = new ComplexNumber(3, 2);
var testCompZero = new ComplexNumber(0, 0);

/***********/
/* .plus() */
/***********/
assert(compInst.plus(testNumber),
       new ComplexNumber(3, 2),
       'ComplexNumber');
assert(compInst.plus(testReal),
       new ComplexNumber(2, 2),
       'ComplexNumber');
assert(compInst.plus(testImag),
       new ComplexNumber(1, 3),
       'ComplexNumber');
assert(compInst.plus(testComp),
       new ComplexNumber(4, 4),
       'ComplexNumber');
assert(compInst.plus(testCompZero),
       compInst,
       'ComplexNumber');
assert(compInst.plus(0),
       compInst,
       'ComplexNumber');

assert(realInst.plus(testNumber),
       new ComplexNumber(3, 0),
       'ComplexNumber');
assert(realInst.plus(testReal),
       new ComplexNumber(2, 0),
       'ComplexNumber');
assert(realInst.plus(testImag),
       new ComplexNumber(1, 1),
       'ComplexNumber');
assert(realInst.plus(testComp),
       new ComplexNumber(4, 2),
       'ComplexNumber');
assert(realInst.plus(testCompZero),
       realInst,
       'ComplexNumber');
assert(realInst.plus(0),
       realInst,
       'ComplexNumber');

assert(imagInst.plus(testNumber),
       new ComplexNumber(2, 2),
       'ComplexNumber');
assert(imagInst.plus(testReal),
       new ComplexNumber(1, 2),
       'ComplexNumber');
assert(imagInst.plus(testImag),
       new ComplexNumber(1, 3),
       'ComplexNumber');
assert(imagInst.plus(testComp),
       new ComplexNumber(3, 4),
       'ComplexNumber');
assert(imagInst.plus(testCompZero),
       imagInst,
       'ComplexNumber');
assert(imagInst.plus(0),
       imagInst,
       'ComplexNumber');

/************/
/* .divide() */
/************/
assert(compInst.minus(testNumber),
       new ComplexNumber(-1, 2),
       'ComplexNumber');
assert(compInst.minus(testReal),
       new ComplexNumber(0, 2),
       'ComplexNumber');
assert(compInst.minus(testImag),
       new ComplexNumber(1, 1),
       'ComplexNumber');
assert(compInst.minus(testComp),
       new ComplexNumber(-2, 0),
       'ComplexNumber');
assert(compInst.minus(testCompZero),
       compInst,
       'ComplexNumber');
assert(compInst.minus(0),
       compInst,
       'ComplexNumber');

assert(realInst.minus(testNumber),
       new ComplexNumber(-1, 0),
       'ComplexNumber');
assert(realInst.minus(testReal),
       new ComplexNumber(0, 0),
       'ComplexNumber');
assert(realInst.minus(testImag),
       new ComplexNumber(1, -1),
       'ComplexNumber');
assert(realInst.minus(testComp),
       new ComplexNumber(-2, -2),
       'ComplexNumber');
assert(realInst.minus(testCompZero),
       realInst,
       'ComplexNumber');
assert(realInst.minus(0),
       realInst,
       'ComplexNumber');

assert(imagInst.minus(testNumber),
       new ComplexNumber(-2, 2),
       'ComplexNumber');
assert(imagInst.minus(testReal),
       new ComplexNumber(-1, 2),
       'ComplexNumber');
assert(imagInst.minus(testImag),
       new ComplexNumber(0, 1),
       'ComplexNumber');
assert(imagInst.minus(testComp),
       new ComplexNumber(-3, 0),
       'ComplexNumber');
assert(imagInst.minus(testCompZero),
       imagInst,
       'ComplexNumber');
assert(imagInst.minus(0),
       imagInst,
       'ComplexNumber');

/************/
/* .times() */
/************/
assert(compInst.times(testNumber),
       new ComplexNumber(2, 4),
       'ComplexNumber');
assert(compInst.times(testReal),
       new ComplexNumber(1, 2),
       'ComplexNumber');
assert(compInst.times(testImag),
       new ComplexNumber(-2, 1),
       'ComplexNumber');
assert(compInst.times(testComp),
       new ComplexNumber(-1, 8),
       'ComplexNumber');
assert(compInst.times(testCompZero),
       zeroInst,
       'ComplexNumber');
assert(compInst.times(0),
       zeroInst,
       'ComplexNumber');

assert(realInst.times(testNumber),
       new ComplexNumber(2, 0),
       'ComplexNumber');
assert(realInst.times(testReal),
       new ComplexNumber(1, 0),
       'ComplexNumber');
assert(realInst.times(testImag),
       new ComplexNumber(0, 1),
       'ComplexNumber');
assert(realInst.times(testComp),
       new ComplexNumber(3, 2),
       'ComplexNumber');
assert(realInst.times(testCompZero),
       zeroInst,
       'ComplexNumber');
assert(realInst.times(0),
       zeroInst,
       'ComplexNumber');

assert(imagInst.times(testNumber),
       new ComplexNumber(0, 4),
       'ComplexNumber');
assert(imagInst.times(testReal),
       new ComplexNumber(0, 2),
       'ComplexNumber');
assert(imagInst.times(testImag),
       new ComplexNumber(-2, 0),
       'ComplexNumber');
assert(imagInst.times(testComp),
       new ComplexNumber(-4, 6),
       'ComplexNumber');
assert(imagInst.times(testCompZero),
       imagInst,
       'ComplexNumber');
assert(imagInst.times(0),
       imagInst,
       'ComplexNumber');

/*************/
/* .divide() */
/*************/

assert(compInst.divide(testNumber),
       new ComplexNumber(.5, 1),
       'ComplexNumber');
assert(compInst.divide(testReal),
       new ComplexNumber(1, 2),
       'ComplexNumber');
assert(compInst.divide(testImag),
       new ComplexNumber(2, -1),
       'ComplexNumber');
assert(compInst.divide(testComp),
       new ComplexNumber(1.4, .8),
       'ComplexNumber');
assert(compInst.divide(testCompZero),
       new ComplexNumber(Infinity, Infinity),
       'ComplexNumber');
assert(compInst.divide(0),
       new ComplexNumber(Infinity, Infinity),
       'ComplexNumber');

assert(realInst.divide(testNumber),
       new ComplexNumber(.5, 0),
       'ComplexNumber');
assert(realInst.divide(testReal),
       new ComplexNumber(1, 0),
       'ComplexNumber');
assert(realInst.divide(testImag),
       new ComplexNumber(0, -1),
       'ComplexNumber');
assert(realInst.divide(testComp),
       new ComplexNumber(.6, -.4),
       'ComplexNumber');
assert(realInst.divide(testCompZero),
       new ComplexNumber(Infinity, 0),
       'ComplexNumber');
assert(realInst.divide(0),
       new ComplexNumber(Infinity, 0),
       'ComplexNumber');

assert(imagInst.divide(testNumber),
       new ComplexNumber(0, 1),
       'ComplexNumber');
assert(imagInst.divide(testReal),
       new ComplexNumber(0, 2),
       'ComplexNumber');
assert(imagInst.divide(testImag),
       new ComplexNumber(2, 0),
       'ComplexNumber');
assert(imagInst.divide(testComp),
       new ComplexNumber(.8, -.6),
       'ComplexNumber');
assert(imagInst.divide(testCompZero),
       new ComplexNumber(0, Infinity),
       'ComplexNumber');
assert(imagInst.divide(0),
       new ComplexNumber(0, Infinity),
       'ComplexNumber');

/***************/
/* test 0 + 0i */
/***************/

/***********/
/* .plus() */
/***********/
assert(zeroInst.plus(testNum),
       new ComplexNumber(testNum, 0),
       'ComplexNumber');
assert(zeroInst.plus(testReal),
       testReal,
       'ComplexNumber');
assert(zeroInst.plus(testImag),
       testImag,
       'ComplexNumber');
assert(zeroInst.plus(testComp),
       testComp,
       'ComplexNumber');
assert(zeroInst.plus(testCompZero),
       testZero,
       'ComplexNumber');
assert(zeroInst.plus(0),
       zeroInst,
       'ComplexNumber');

/************/
/* .minus() */
/************/
assert(zeroInst.minus(testNum),
       new ComplexNumber(-testNum, 0),
       'ComplexNumber');
assert(zeroInst.minus(testReal),
       testReal.negate(),
       'ComplexNumber');
assert(zeroInst.minus(testImag),
       testImag.negate(),
       'ComplexNumber');
assert(zeroInst.minus(testComp),
       testComp.negate(),
       'ComplexNumber');
assert(zeroInst.minus(testCompZero),
       testCompZero,
       'ComplexNumber');
assert(zeroInst.minus(0),
       zeroInst,
       'ComplexNumber');

/************/
/* .times() */
/************/
assert(zeroInst.times(testNum),
       zeroInst,
       'ComplexNumber');
assert(zeroInst.times(testNum),
       zeroInst,
       'ComplexNumber');
assert(zeroInst.times(testNum),
       zeroInst,
       'ComplexNumber');
assert(zeroInst.times(testNum),
       zeroInst,
       'ComplexNumber');
assert(zeroInst.times(testCompZero),
       zeroInst,
       'ComplexNumber');
assert(zeroInst.times(0),
       zeroInst,
       'ComplexNumber');

/*************/
/* .divide() */
/*************/
assert(zeroInst.divide(testNum),
       zeroInst,
       'ComplexNumber');
assert(zeroInst.divide(testNum),
       zeroInst,
       'ComplexNumber');
assert(zeroInst.divide(testNum),
       zeroInst,
       'ComplexNumber');
assert(zeroInst.divide(testNum),
       zeroInst,
       'ComplexNumber');
assert(zeroInst.divide(testCompZero),
       new ComplexNumber(NaN, NaN),
       'ComplexNumber');
assert(zeroInst.divide(0),
       new ComplexNumber(NaN, NaN),
       'ComplexNumber');

}; // end runTests()
