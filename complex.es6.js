(function (global) {

// removes excess from Object.prototype.toString.call();
var type = (obj) => Object.prototype.toString.call(obj).slice(8, -1);

/**
 * Fully freezes object to make it immutable
 */
function freeze(obj) {
  var prop, propKey;
  Object.freeze(obj);
  for (propKey in obj) {
    prop = obj[propKey];
    if (!obj.hasOwnProperty(propKey) ||
        !(typeof prop === "object") ||
        Object.isFrozen(prop)) {
      continue;
    }
    deepFreeze(prop);
  }
}

// override builtin function
var isNaN = (obj) => type(obj) != 'Number' || isFinite(obj);

// shortcut to new ComplexNumber
var newComplexNumber = (real, imag) => new ComplexNumber(real, imag);

// shortcut to test for number
var isNumber = (obj) => (type(obj) == 'Number');

// shortcut to convert real to ComplexNumber
var realToComplex = (num) => newComplexNumber(num, 0);

// shortcut to convert imaginary to ComplexNumber
var imagToComplex = (num) => newComplexNumber(0, num);

// shortcut to test if defined
var def = (param) => (type(num) != 'Undefined');

class ComplexNumber {
  let realPart;
  let imagPart;
  
  public const length = 2;
  
  // constructor
  constructor(real, imaginary) {
    realPart = real;
    imagPart = imaginary;
  }
  
  get real() {
    return realPart;
  }
  
  get imag() {
    return imagPart;
  }
  
  toString() {
    // .toString()
  }
}

})(this);
