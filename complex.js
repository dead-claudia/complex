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
 * @param {Object} object
 * @param {string} publicName
 * @param {*} symbol
 * @see goog.exportProperty() for original source code
 */
function exportProperty(object, publicName, symbol) {
  object[publicName] = symbol;
};

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

ComplexNumber.prototype = {
  // the length property of this object is two
  /**
   * @expose
   * @const
   */
  length: 2,
  
  /**
   * @override
   * @this {ComplexNumber}
   * @return {string}
   */
  toString: function () {
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
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  recip: function () {
    var real = this.real;
    var imag = this.imag;
    var scale = real * real + imag * imag;
    return newComplexNumber(re / scale, im / scale);
  },
    
  /**
   * @param {(number|ComplexNumber)} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  plus: function (num) {
    if (isNumber(num))
      return newComplexNumber(this.real + num, this.imag);
    
    return newComplexNumber(this.real + num.real,
                            this.imag + num.imag);
  },
  
  /**
   * @param {(number|ComplexNumber)} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  minus: function (num) {
    if (isNumber(num))
      return newComplexNumber(this.real - num.real, -this.imag);
    
    return newComplexNumber(this.real - num.real,
                            this.imag - num.imag);
  },
  
  /**
   * @param {(number|ComplexNumber)} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  times: function (num) {
    if (isNumber(numTwo))
      return newComplexNumber(this.real * num,
                              this.imag * num);
    
    return newComplexNumber(this.real * num.real,
                            this.imag * num.imag);
  },
  
  /**
   * @param {(number|ComplexNumber)} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  divide: function (num) {
    if (isNumber(num)) {
      return newComplexNumber(this.real / num,
                              this.imag / num);
    }
    
    return this.times(num.recip());
  },
  
  /**
   * @this {ComplexNumber}
   * @return {number}
   */
  arg: function () {
    return Math.atan2(this.imag, this.real);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {number}
   */
  abs: function () {
    var re = this.real;
    var im = this.imag;
    if (!im) return abs(re);
    if (!re) return abs(im);
    return hypot(im, re);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  conj: function () {
    return newComplexNumber(this.real, -this.imag);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  negate: function () {
    return newComplexNumber(-this.real, -this.imag);
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  exp: function () {
    var re = this.real;
    var im = this.imag;
    if (!im) return realToComplex(exp(re));
    return newComplexNumber(exp(re) * cos(im),
                            exp(re) * sin(im));
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  sin: function () {
    var re = this.real;
    var im = this.imag;
    if (!im) return realToComplex(sin(re));
    return newComplexNumber(sin(re) * cosh(im),
                            cos(re) * sinh(im));
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  cos: function () {
    var re = this.real;
    var im = this.imag;
    if (!im) return realToComplex(cos(re));
    if (!re) return realToComplex(cosh(im));
    return newComplexNumber(cos(re) * cosh(im),
                            sin(re) * sinh(im));
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  tan: function () {
    var re = this.real;
    var im = this.imag;
    if (!im) return realToComplex(tan(re));
    if (!re) return imagToComplex(tanh(im));
    return this.sin().divide(this.cos());
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  log: function () {
    if (!this.imag) return realToComplex(log(this.real));
    return newComplexNumber(Math.log(this.abs()), this.arg());
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  sqrt: function () {
    var r = this.abs();
    var t = this.arg() / 2;
    return newComplexNumber(r * cos(t), r * sin(t));
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  sinh: function () {
    var re = this.real;
    var im = this.imag;
    var real = sinh(re);
    var imag = sin(im);
    if (!im) return realToComplex(real);
    if (!re) return imagToComplex(imag);
    return newComplexNumber(real * cos(im), imag * sinh(re));
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  cosh: function () {
    var re = this.real;
    var im = this.imag;
    var real = cosh(re);
    var imag = cos(im);
    if (!im) return realToComplex(real);
    if (!re) return realToComplex(imag);
    return newComplexNumber(real * imag, sinh(re) * sin(im));
  },
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  tanh: function () {
    if (!im) return realToComplex(tanh(real));
    if (!this.real) return imagToComplex(tan(imag));
    return this.sinh().divide(this.cosh());
  }
};

exportProperty(ComplexNumber.prototype, 'toString', ComplexNumber.prototype.toString);
exportProperty(ComplexNumber.prototype, 'plus', ComplexNumber.prototype.plus);
exportProperty(ComplexNumber.prototype, 'minus', ComplexNumber.prototype.minus);
exportProperty(ComplexNumber.prototype, 'times', ComplexNumber.prototype.times);
exportProperty(ComplexNumber.prototype, 'divide', ComplexNumber.prototype.divide);
exportProperty(ComplexNumber.prototype, 'recip', ComplexNumber.prototype.recip);
exportProperty(ComplexNumber.prototype, 'arg', ComplexNumber.prototype.arg);
exportProperty(ComplexNumber.prototype, 'abs', ComplexNumber.prototype.abs);
exportProperty(ComplexNumber.prototype, 'conj', ComplexNumber.prototype.conj);
exportProperty(ComplexNumber.prototype, 'times', ComplexNumber.prototype.times);
exportProperty(ComplexNumber.prototype, 'divide', ComplexNumber.prototype.divide);
exportProperty(ComplexNumber.prototype, 'recip', ComplexNumber.prototype.recip);
exportProperty(ComplexNumber.prototype, 'arg', ComplexNumber.prototype.arg);
exportProperty(ComplexNumber.prototype, 'abs', ComplexNumber.prototype.abs);
exportProperty(ComplexNumber.prototype, 'conj', ComplexNumber.prototype.conj);
exportProperty(ComplexNumber.prototype, 'negate', ComplexNumber.prototype.negate);
exportProperty(ComplexNumber.prototype, 'exp', ComplexNumber.prototype.exp);
exportProperty(ComplexNumber.prototype, 'sin', ComplexNumber.prototype.sin);
exportProperty(ComplexNumber.prototype, 'cos', ComplexNumber.prototype.cos);
exportProperty(ComplexNumber.prototype, 'tan', ComplexNumber.prototype.tan);
exportProperty(ComplexNumber.prototype, 'log', ComplexNumber.prototype.log);
exportProperty(ComplexNumber.prototype, 'sqrt', ComplexNumber.prototype.sqrt);
exportProperty(ComplexNumber.prototype, 'sinh', ComplexNumber.prototype.sinh);
exportProperty(ComplexNumber.prototype, 'cosh', ComplexNumber.prototype.cosh);
exportProperty(ComplexNumber.prototype, 'tanh', ComplexNumber.prototype.tanh);

exportProperty(ComplexNumber, 'realToComplex', realToComplex);
exportProperty(ComplexNumber, 'imagToComplex', imagToComplex);

exportProperty(global, 'ComplexNumber', ComplexNumber);

// This class is immutable.
freeze(global['ComplexNumber']);
})(this);
