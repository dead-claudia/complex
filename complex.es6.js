module 'ComplexNumber' {
import {*} from '@iter';

// removes excess from Object.prototype.toString.call();
var type = (obj) => Object.prototype.toString.call(obj).slice(8, -1);

/**
 * Fully freezes object to make it immutable . Not used
 */
function freeze(obj) {
  Object.freeze(obj);
  let prop;
  [if (typeof prop == 'object' && !Object.isFrozen(prop)) freeze(prop)
    for (prop in allKeys(obj))];
}

// override builtin function
let isNaN = (obj) => type(obj) != 'Number' || isFinite(obj);

// shortcut to test for number
let isNumber = (obj) => (type(obj) == 'Number');

// shortcut to convert real to ComplexNumber
let realToComplex = (num) => new ComplexNumber(num, 0);

// shortcut to convert imaginary to ComplexNumber
let imagToComplex = (num) => new ComplexNumber(0, num);

// shortcut to test if defined
let def = (param) => (type(num) != 'Undefined');

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
    let [real, imag] = [realPart, imagPart];
    
    if (isNaN([real, imag])) return 'NaN';
    
    if (!isFinite([real, imag])) return 'Infinity';
    
    if (![imag, real]) return '0';
    
    let positive = (imag > 0);
    let pm = (positive) ? ' + ' : ' - ';
    
    if (positive) imag = -imag;
    
    if (imag == 1) return real + pm + 'i';
    
    return real + pm + imag + 'i';
  }
  
  plus(num) {
    if (isNumber(num))
      return new ComplexNumber(realPart + num, imagPart);
    
    return (realPart + num.real, imagPart + num.imag);
  }
  
  minus(num) {
    if (isNumber(num))
      return new ComplexNumber(realPart - num, imagPart);
    
    return (realPart - num.real, imagPart - num.imag);
  }
  
  times(num) {
    if (isNumber(num))
      return new ComplexNumber(this['real', 'imag'] / num);
    
    return new ComplexNumber(realPart * num.real - imagPart * num.imag,
                             realPart * num.imag + imagPart * num.real);
  }
  
  divide(num) {
    if (isNumber(num))
      return new ComplexNumber(this['real', 'imag'] / num);
    
    return this.times(num.recip());
  }
  
  arg() {
    if (!imagPart) return Math.abs(realPart);
    if (!realPart) return Math.abs(imagPart);
    
    return Math.hypot(realPart, imagPart);
  }
  
  conj() {
    return new ComplexNumber(realPart, -imagPart);
  }
  
  negate() {
    return new ComplexNumber(-realPart, -imagPart);
  }
  
  exp() {
    if (!imagPart) return realToComplex(Math.exp(realPart));
    
    return new ComplexNumber(Math.exp(realPart) * Math.cos(imagPart),
                             Math.exp(realPart) * Math.sin(imagPart));
  }
  
  sin() {
    if (!imagPart) return realToComplex(Math.sin(realPart));
    
    return new ComplexNumber(Math.sin(realPart) * Math.cosh(imagPart),
                             Math.cos(realPart) * Math.sinh(imagPart));
  }
  
  cos() {
    if (!imagPart) return realToComplex(Math.cos(realPart));
    
    return new ComplexNumber(Math.cos(realPart) * Math.cosh(imagPart),
                             Math.sin(realPart) * Math.sinh(imagPart));
  }
  
  tan() {
    if (!imagPart) return realToComplex(Math.tan(realPart));
    if (!realPart) return realToComplex(Math.tanh(imagPart));
    
    return this.sin().divide(this.cos());
  }
  
  sqrt() {
    let r = this.abs();
    let t = this.arg() / 2;
    return new ComplexNumber(r * Math.cos(t), r * Math.sin(t));
  }
  
  sinh() {
    let real = Math.sinh(realPart);
    let imag = Math.sin(imagPart);
    if (!imagPart) return realToComplex(real);
    if (!realPart) return imagToComplex(imag);
    
    return new ComplexNumber(real * Math.cos(imagPart),
                             imag * Math.cosh(realPart));
  }
  
  cosh() {
    let real = Math.cosh(realPart);
    let imag = Math.cos(imagPart);
    if (!imagPart) return realToComplex(real);
    if (!realPart) return realToComplex(imag);
    
    return new ComplexNumber(real * imag,
                             Math.sinh(realPart) * Math.sin(imagPart));
  }
  
  tanh() {
    if (!imagPart) return realToComplex(Math.tanh(realPart));
    if (!realPart) return imagToComplex(Math.tan(imagPart));
    
    return this.sinh().divide(this.cosh());
  }
}

ComplexNumber.realToComplex = realToComplex;
ComplexNumber.imagToComplex = imagToComplex;

Object.freeze(ComplexNumber);
let prop;
[Object.freeze(prop) for (prop in allKeys(ComplexNumber))
  if (typeof prop == 'object' && !Object.isFrozen(prop))];

export ComplexNumber;

// see the following for helpful pointers:
// http://blog.oio.de/2013/05/09/ecmascript-6-the-future-of-javascript/
// http://code.tutsplus.com/articles/use-ecmascript-6-today--net-31582
// http://html5hub.com/10-ecmascript-6-tricks-you-can-perform-right-now/#i.1jaq7ippt4corx
// http://www.slavoingilizov.com/blog/2013/10/03/ecmascript6-arrow-functions/
// http://ryandao.net/portal/content/summary-ecmascript-6-major-features

}
