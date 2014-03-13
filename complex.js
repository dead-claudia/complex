/** @preserve
 * Complex.js
 * Copyright Isiah Meadows
 * Licensed under GNU GPL v3 or later
 */

(function (global) {

/* Helper functions and aliases to help minify code */

/** @protected */ var isFin = isFinite;

/**
 * removes excess from Object.prototype.toString.call();
 * @param {Object|null|number} obj
 * @protected
 */
function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

/**
 * Fully freezes object to make it immutable
 * @param {Object} obj
 * @protected
 */
function freeze(obj) {
  var prop, propKey;
  Object.freeze(obj);
  for (propKey in obj) {
    prop = obj[propKey];
    if (!obj.hasOwnProperty(propKey) ||
        !(typeof prop === "object")  ||
        Object.isFrozen(prop)) {
      continue;
    }
    deepFreeze(prop);
  }
}

/**
 * @override
 * @protected
 */
var isNaN = function (num) { // override global method for here
  return !(type(num) == 'Number' || !isFin(num));
};

// Automatically return if not ES5 or later...slight hack
if (type(null) != 'Null') return;

/* Helper functions */

/**
 * @param {number} real
 * @param {number} imag
 * @return {ComplexNumber}
 * @protected
 */
var newComplexNumber = function (real, imag) {
  return new ComplexNumber(real, imag);
};

/**
 * @param {Object|null|number} obj
 * @return {boolean}
 * @protected
 */
var isNumber = function (obj) {
  return (type(obj) == 'Number');
};

/**
 * @param {number} num
 * @return {ComplexNumber}
 */
var realToComplex = function (num) {
  return newComplexNumber(num, 0);
};

/**
 * @param {number} num
 * @return {ComplexNumber}
 */
var imagToComplex = function (num) {
  return newComplexNumber(0, num);
};

/**
 * @param {number} num
 * @return {boolean}
 * @protected
 */
var def = function (num) {
  return (type(num) != 'Undefined')
};

/** @protected */ var abs  = Math['abs'];
/** @protected */ var sin  = Math['sin'];
/** @protected */ var cos  = Math['cos'];
/** @protected */ var tan  = Math['tan'];
/** @protected */ var exp  = Math['exp'];
/** @protected */ var pow  = Math['pow'];
/** @protected */ var sqrt = Math['sqrt'];
/** @protected */ var pi   = Math['PI'];

/* define methods if they aren't already defined in the Math object */
if (Math['sinh']) {
  /** @protected */ var sinh = Math['sinh'];
} else {
  /**
   * @param {number} num
   * @return {number}
   * @protected
   */
  var sinh = function (num) {
    var p = exp(num);
    return (p - 1 / p) / 2;
  };
}
if (Math['cosh']) {
  /** @protected */ var cosh = Math['cosh'];
} else {
  /**
   * @param {number} num
   * @return {number}
   * @protected
   */
  var cosh = function (num) {
    var p = exp(num);
    return (p + 1 / p) / 2;
  };
}
if (Math['tanh']) {
  /** @protected */ var tanh = Math['tanh'];
} else {
  /**
   * @param {number} num
   * @return {number}
   * @protected
   */
  var tanh = function (num) {
    var p = exp(num);
    var r = 1 / p;
    return (p + r) / (p - r);
  };
}
if (Math['hypot']) {
  var hypot = Math['hypot'];
} else {
  /**
   * @param {number} x
   * @param {number} y
   * @return {number}
   * @protected
   */
  var hypot = function (x, y) {
    return x * sqrt(1 + (y /= x) * y);
  }
}

/**
 * @constructor
 * @class
 * @expose
 * @param {number} real
 * @param {number} imaginary
 */
var ComplexNumber = function (real, imaginary) {
  
  /**
   * @private
   * @type {number}
   */
  this.real = real;
  /**
   * @private
   * @type {number}
   */
  this.imag = imaginary;
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _recip(a) {
  var real = a.real;
  var imag = a.imag;
  var scale = real * real + imag * imag;
  return newComplexNumber(re / scale, im / scale);
};
  
/**
 * @param {(number|ComplexNumber)} b
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _plus(a, b) {
  if (isNumber(b))
    return newComplexNumber(a.real + b, a.imag);
  
  return newComplexNumber(a.real + b.real,
                          a.imag + b.imag);
};

/**
 * @param {(number|ComplexNumber)} b
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _minus(a, b) {
  if (isNumber(b))
    return newComplexNumber(a.real - b, -a.imag);
  
  return newComplexNumber(a.real - b.real,
                          a.imag - b.imag);
};

/**
 * @param {(number|ComplexNumber)} b
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _times(a, b) {
  if (isNumber(b))
    return newComplexNumber(a.real * b,
                            a.imag * b);
  
  return newComplexNumber(a.real * b.real - a.imag * b.imag,
                          a.imag * b.real + a.real * b.imag);
};

/**
 * @param {(number|ComplexNumber)} b
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _divide(a, b) {
  if (isNumber(b)) {
    return newComplexNumber(a.real / b,
                            a.imag / b);
  }
  
  return _times(a, _recip(b));
};

/**
 * @param {ComplexNumber} a
 * @return {number}
 */
function _arg(a) {
  return Math.atan2(a.imag, a.real);
};

/**
 * @param {ComplexNumber} a
 * @return {number}
 */
function _abs(a) {
  var re = a.real;
  var im = a.imag;
  if (!im) return abs(re);
  if (!re) return abs(im);
  return hypot(im, re);
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _conj(a) {
  return newComplexNumber(a.real, -a.imag);
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _negate(a) {
  return newComplexNumber(-a.real, -a.imag);
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _exp(a) {
  var re = a.real;
  var im = a.imag;
  if (!im) return realToComplex(exp(re));
  return newComplexNumber(exp(re) * cos(im),
                          exp(re) * sin(im));
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _sin(a) {
  var re = a.real;
  var im = a.imag;
  if (!im) return realToComplex(sin(re));
  return newComplexNumber(sin(re) * cosh(im),
                          cos(re) * sinh(im));
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _cos(a) {
  var re = a.real;
  var im = a.imag;
  if (!im) return realToComplex(cos(re));
  if (!re) return realToComplex(cosh(im));
  return newComplexNumber(cos(re) * cosh(im),
                          sin(re) * sinh(im));
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _tan(a) {
  var re = a.real;
  var im = a.imag;
  if (!im) return realToComplex(tan(re));
  if (!re) return imagToComplex(tanh(im));
  return _divide(_sin(a), _cos(a));
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _log(a) {
  if (!a.imag) return realToComplex(log(a.real));
  return newComplexNumber(Math.log(_abs(a)), _arg(a));
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _sqrt(a) {
  var r = _abs(a);
  var t = _arg(a) / 2;
  return newComplexNumber(r * cos(t), r * sin(t));
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _sinh(a) {
  var re = a.real;
  var im = a.imag;
  var real = sinh(re);
  var imag = sin(im);
  if (!im) return realToComplex(real);
  if (!re) return imagToComplex(imag);
  return newComplexNumber(real * cos(im), imag * sinh(re));
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _cosh(a) {
  var re = a.real;
  var im = a.imag;
  var real = cosh(re);
  var imag = cos(im);
  if (!im) return realToComplex(real);
  if (!re) return realToComplex(imag);
  return newComplexNumber(real * imag, sinh(re) * sin(im));
};

/**
 * @param {ComplexNumber} a
 * @return {ComplexNumber}
 */
function _tanh(a) {
  if (!im) return realToComplex(tanh(real));
  if (!a.real) return imagToComplex(tan(imag));
  return _divide(_sinh(a), _cosh(a));
}

ComplexNumber.prototype = {
  // the length property of this object is two
  /**
   * @expose
   * @const
   * @type {number}
   */
  'length': 2,
  
  /**
   * @override
   * @this {ComplexNumber}
   * @return {string}
   */
  'toString': function () {
    var real = this.real;
    var imag = this.imag;
    var positive; // combine variable declarations to help minify some
    var pm;
    
    if (isNaN(real) || isNaN(imag))
      return 'NaN';
    
    if (!isFin(real) || !isFin(imag))
      return 'Infinity';
    
    if (imag) return real + '';
    if (real) return imag + 'i';
    
    positive = (imag > 0);
    pm       = (positive) ? ' + ' : ' - ';
    
    if (!positive) imag = -imag;
    
    if (imag == 1) return real + pm + 'i';
    
    return real + pm + imag + 'i';
  },
  
  /* shim the exported functions */
  
  /**
   * @param {(number|ComplexNumber)} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'plus': function (num) {
    return _plus(this, num);
  },
  
  /**
   * @param {(number|ComplexNumber)} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'minus': function (num) {
    return _minus(this, num);
  },
  
  /**
   * @param {(number|ComplexNumber)} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'times': function (num) {
    return _times(this, num);
  },
  
  /**
   * @param {(number|ComplexNumber)} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'divide': function (num) {
    return _divide(this, num);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'recip': function () {
    return _recip(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {number}
   */
  'arg': function () {
    return _arg(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {number}
   */
  'abs': function () {
    return _abs(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'conj': function () {
    return _conj(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'negate': function () {
    return _negate(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'exp': function () {
    return _exp(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'sin': function () {
    return _sin(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'cos': function () {
    return _cos(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'tan': function () {
    return _tan(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'log': function () {
    return _log(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'sqrt': function () {
    return _sqrt(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'sinh': function () {
    return _sinh(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'cosh': function () {
    return _cosh(this);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  'tanh': function () {
    return _tanh(this);
  }
};

ComplexNumber['realToComplex'] = realToComplex;
ComplexNumber['imagToComplex'] = imagToComplex;

global['ComplexNumber'] = ComplexNumber;

// This class is immutable.
freeze(global['ComplexNumber']);
})(this);
