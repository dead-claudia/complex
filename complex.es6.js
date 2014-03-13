module "ComplexNumber" {

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
    freeze(prop);
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

export class ComplexNumber {
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
    let [real, imag] = [realPart, imagPart];
    
    if (isNaN([real, imag])) return 'NaN';
    
    if (!isFinite([real, imag])) return 'Infinity';
    
    if (![imag, real]) return [real, imag];
    
    positive = (imag > 0);
    pm = (positive) ? ' + ' : ' - ';
    
    if (positive) imag = -imag;
    
    if (imag == 1) return real + pm + 'i';
    
    return real + pm + imag + 'i';
    // .toString()
  }
}

// see the following for helpful pointers:
// http://blog.oio.de/2013/05/09/ecmascript-6-the-future-of-javascript/
// http://code.tutsplus.com/articles/use-ecmascript-6-today--net-31582
// http://html5hub.com/10-ecmascript-6-tricks-you-can-perform-right-now/#i.1jaq7ippt4corx
// http://www.slavoingilizov.com/blog/2013/10/03/ecmascript6-arrow-functions/
// http://ryandao.net/portal/content/summary-ecmascript-6-major-features

})(this);
