/* @preserve
 * Complex.js
 * Copyright Isiah Meadows
 * Licensed under GNU GPL v3 or later
 */

(function (global) {

/* Helper functions to help minify code */

/** @protected */ var MyTypeError = TypeError;
/** @protected */ var type        = Object.prototype.toString.call;

/**
 * @override
 * @protected
 */
var isNaN = function (num) { // override global method for here
  return !(type(num) == '[object number]' || !isFinite(num));
};

// Automatically return if not ES5 or later...slight hack
if (type(null) != '[object null]') return;

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
 * @param {Object} obj
 * @return {boolean}
 * @protected
 */
var isNumber = function (obj) {
  return (type(obj) == '[object number]');
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
 * @return {Complexnumber}
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
  return (type != '[object undefined]')
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
   * @proteced
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
   * @proteced
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
   * @proteced
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
   * @proteced
   */
  var hypot = function (x, y) {
    return x * sqrt(1 + (y /= x) * y);
  }
}

/**
 * @constructor
 * @struct
 * @param {number} real
 * @param {number} imaginary
 */
var ComplexNumber = function (real, imaginary) {
  var re = real;
  var im = imaginary;
  
  /**
   * @private
   * @return {number}
   */
  this['real'] = function () {
    return re;
  }
  
  /**
   * @private
   * @return {number}
   */
  this['imag'] = function () {
    return im;
  }
  
  /**
   * @param {number|ComplexNumber} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['plus'] = function (num) {
    if (isNumber(num))
      return newComplexNumber(re + num, im);
    
    return newComplexNumber(re + num.real,
                            im + num.imag);
  };
  
  /**
   * @param {number|ComplexNumber} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['minus'] = function (num) {
    if (isNumber(num))
      return newComplexNumber(re - num.real, -im);
    
    return newComplexNumber(re - num.real,
                            im - num.imag);
  };
  
  /**
   * @param {number|ComplexNumber} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['times'] = function (num) {
    if (isNumber(numTwo))
      return newComplexNumber(re * num,
                              im * num);
    
    return newComplexNumber(re * num.real,
                            im * num.imag);
  };
  
  /**
   * @param {number|ComplexNumber} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['divide'] = function (num) {
    if (isNumber(num)) {
      return newComplexNumber(re / num,
                              im / num);
    }
    
    return this.times(num.reciprocal());
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['recip'] = function () {
    var scale = re * re + im * im;
    return newComplexNumber(re / scale, im / scale);
  };
  
  /**
   * @this {ComplexNumber}
   * @return {number}
   */
  this['arg'] = function () {
    return Math.atan2(im, re);
  };
  
  /**
   * @this {ComplexNumber}
   * @return {number}
   */
  this['abs'] = function () {
    if (!im) return abs(re);
    if (!re) return 
    return hypot(im, re);
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['conj'] = function () {
    return newComplexNumber(re, -im);
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['negate'] = function () {
    return newComplexNumber(-re, -im);
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['exp'] = function () {
    if (!im) return realToComplex(exp(re));
    return newComplexNumber(exp(re) * cos(im),
                            exp(re) * sin(im));
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['sin'] = function () {
    if (!im) return realToComplex(sin(re));
    return newComplexNumber(sin(re) * cosh(im),
                            cos(re) * sinh(im));
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['cos'] = function () {
    if (!im) return realToComplex(cos(re));
    if (!re) return realToComplex(cosh(im));
    return newComplexNumber(cos(re) * cosh(im),
                            sin(re) * sinh(im));
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['tan'] = function () {
    if (!im) return realToComplex(tan(re));
    if (!re) return imagToComplex(tanh(im));
    return this.sin().divide(this.cos());
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['log'] = function () {
    if (im) return realToComplex(log(re));
    return newComplexNumber(Math.log(this.abs()), this.arg());
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['sqrt'] = function () {
    var r = this.abs();
    var t = this.angle() / 2;
    return newComplexNumber(r * cos(t), r * sin(t));
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['sinh'] = function () {
    var real = sinh(re);
    var imag = sin(im);
    if (!im) return realToComplex(real);
    if (!re) return imagToComplex(imag);
    return newComplexNumber(real * cos(im), imag * sinh(re));
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['cosh'] = function () {
    var real = cosh(re);
    var imag = cos(im);
    if (!im) return realToComplex(real);
    if (!re) return realToComplex(imag);
    return newComplexNumber(real * imag, sinh(re) * sin(im));
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this['tanh'] = function () {
    if (!im) return realToComplex(tanh(real));
    if (!re) return imagToComplex(tan(imag));
    return num.sin().divide(num.cos());
  };
};

ComplexNumber.prototype = {
  // the length property of this object is two
  /**
   * @override
   * @expose
   * @constant
   */
  'length': 2,
  
  /**
   * @overrride
   * @param {ComplexNumber} [num]
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
    
    if (!isFinite(real) || !isFinite(imag))
      return 'Infinity';
    
    if (imag) return real + '';
    if (real) return imag + 'i';
    
    positive = (imag > 0);
    pm       = (positive) ? ' + ' : ' - ';
    
    if (!positive) imag = -imag;
    
    if (imag == 1) return real + pm + 'i';
    
    return real + pm + imag + 'i';
  }
};

ComplexNumber['realToComplex'] = realToComplex;
ComplexNumber['imagToComplex'] = imagToComplex;

global['ComplexNumber'] = ComplexNumber;

})(this);
