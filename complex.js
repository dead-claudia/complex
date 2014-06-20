/**
 * @preserve Complex.js
 * Copyright Isiah Meadows
 * Licensed under GNU GPL v3 or later
 */

(function (root, mod) {
  'use strict';
  if (typeof module === 'object' && typeof exports === 'object') return mod(exports); // CommonJS
  if (typeof define === 'object' && define.amd) return define(['exports'], mod); // AMD
  if (typeof window === 'object') return mod(window); // Browser
  return mod(root); // shell (Rhino, etc.), etc.
})(this, function (global) {
'use strict';

// require strict mode
if (!this) return;

/**************************************/
/* Helper aliases to help minify code */
/**************************************/

/** @ignore */ var abs   = Math['abs'];
/** @ignore */ var sin   = Math['sin'];
/** @ignore */ var cos   = Math['cos'];
/** @ignore */ var tan   = Math['tan'];
/** @ignore */ var exp   = Math['exp'];
/** @ignore */ var pow   = Math['pow'];
/** @ignore */ var sqrt  = Math['sqrt'];
/** @ignore */ var pi    = Math['PI'];
/** @ignore */ var type  = {}.toString.call;
/** @ignore */ var isFin = isFinite;
/** @ignore */ var isNan = isNaN;
/** @ignore */ var log   = Math.log;
/** @ignore */ var atan2 = Math.atan2;

/***********************************/
/* Helper functions to minify code */
/***********************************/

/**
 * Fully freezes object to make it immutable
 * @param {Object} obj
 * @ignore
 */
function freeze(obj) {
  var prop, propKey;
  Object.freeze(obj);
  for (propKey in obj) {
    if (obj.hasOwnProperty(propKey) &&
        typeof (prop = obj[propkey]) === "object" &&
        !Object.isFrozen(prop)) {
      freeze(prop);
    }
  }
}

/**
 * Adds a list methods to an object as non-enumerable, non-writable, non-configurable
 * properties.
 * @param {Object} parent
 * @param {Object} children
 * @ignore
 */
function mixin(parent, children) {
  for (var i in children) {
    Object.defineProperty(parent, i, { value: children[i] });
  }
  return parent;
}


/**
 * @param {Array.<number>} array
 * @return {ComplexNumber}
 * @ignore
 */
function toComplex(array) {
  return new ComplexNumber(array[0], array[1]);
}

/**
 * @param {Object|null|number} obj
 * @return {boolean}
 * @ignore
 */
function isNumber(obj) {
  return type(obj) === '[object Number]';
}

/**
 * @method
 * @memberof ComplexNumber
 * @desc Converts Number objects or literals to ComplexNumber objects
 * 
 * @param {number} num - The Number object or literal to convert
 * @return {ComplexNumber} - The newly converted ComplexNumber object
 * @see {@link ComplexNumber.imagToComplex} for the imaginary counterpart
 */
function realToComplex(num) {
  return toComplex([num, 0]);
}

/**
 * @method
 * @memberof ComplexNumber
 * @desc Converts imaginary numbers to ComplexNumber objects, via the
 *       corresponding Number object or literal
 * 
 * @param {number} num - the Number object or literal to convert
 * @return {ComplexNumber} - the newly converted ComplexNumber object
 * @see {@link ComplexNumber.realToComplex} for the real counterpart
 */
function imagToComplex(num) {
  return toComplex([0, num]);
}

/**
 * @param {number} num
 * @return {boolean}
 * @ignore
 */
function def(num) {
  return typeof num !== 'undefined';
}

/* define methods if they aren't already defined in the Math object */

/**
 * @param {number} num
 * @return {number}
 * @ignore
 */
var sinh = Math['sinh'] ? Math['sinh'] : function (num) {
  var p = exp(num);
  return (p - 1 / p) / 2;
};

/**
 * @param {number} num
 * @return {number}
 * @ignore
 */
var cosh = Math['cosh'] ? Math['cosh'] : function (num) {
  var p = exp(num);
  return (p + 1 / p) / 2;
};

/**
 * @param {number} num
 * @return {number}
 * @ignore
 */
var tanh = Math['tanh'] ? Math['tanh'] : function (num) {
  var p = exp(num);
  var r = 1 / p;
  return (p + r) / (p - r);
};

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 * @ignore
 */
var hypot = Math['hypot'] ? Math['hypot'] : function (x, y) {
  return x * sqrt(1 + (y /= x) * y);
};

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _recipComp(a_re, a_im) {
  var scale = a_re * a_re - a_im * a_im;
  return [a_re / scale, a_im / scale];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @param {number} b
 * @return {Array.<number>}
 */
function _plusNum(a_re, a_im, b) {
  return [a_re + b, a_im];
}
  
/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @param {number} b_re
 * @param {number} b_im
 * @return {Array.<number>}
 */
function _plusComp(a_re, a_im, b_re, b_im) {
  return [a_re + b_re, a_im + b_im];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @param {number} b
 * @return {Array.<number>}
 */
function _minusNum(a_re, a_im, b) {
  return [a_re - b, a_im];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @param {number} b_re
 * @param {number} b_im
 * @return {Array.<number>}
 */
function _minusComp(a_re, a_im, b_re, b_im) {
  return [a_re - b_re, a_im - b_im];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @param {number} b
 * @return {Array.<number>}
 */
function _timesNum(a_re, a_im, b) {
  return [a_re * b, a_im * b];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @param {number} b_re
 * @param {number} b_im
 * @return {Array.<number>}
 */
function _timesComp(a_re, a_im, b_re, b_im) {
  return [a_re * b_re - a_im * b_im,
          a_im * b_re + a_re * b_im];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @param {number} b
 * @return {Array.<number>}
 */
function _divideNum(a_re, a_im, b) {
  return [a_re / b, a_im / b];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @param {number} b_re
 * @param {number} b_im
 * @return {Array.<number>}
 */
function _divideComp(a_re, a_im, b_re, b_im) {
  var scale = b_re * b_re - b_im * b_im;
  return [(a_re * b_re + a_im * b_im) / scale,
          (a_im * b_re - a_re * b_im) / scale];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {number}
 */
function _argComp(a_re, a_im) {
  return atan2(a_im, a_re);
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {number}
 */
function _absComp(a_re, a_im) {
  if (!a_im) return abs(a_re);
  if (!a_re) return abs(a_im);
  return hypot(a_re, a_im);
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _conjComp(a_re, a_im) {
  return [a_re, -a_im];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _negateComp(a_re, a_im) {
  return [-a_re, -a_im];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _expComp(a_re, a_im) {
  var expRe = exp(a_re);
  if (!a_im) return [expRe, 0];
  return [expRe * cos(a_im), expRe * sim(im)];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _sinComp(a_re, a_im) {
  if (!a_im) return [sin(a_re), 0];
  return [sin(a_re) * cosh(a_im), cos(a_re) * sinh(a_im)];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _cosComp(a_re, a_im) {
  if (!a_im) return [cos(a_re), 0];
  if (!a_re) return [cosh(a_im), 0];
  return [cos(a_re) * cosh(a_im), sin(a_re) * sinh(a_im)];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _tanComp(a_re, a_im) {
  if (!a_im) return [tan(a_re), 0];
  if (!a_re) return [0, tanh(a_im)];
  a_re <<= 1;
  a_im <<= 1;
  var scale = cos(a_re) + cosh(a_im);
  return [sin(a_re) / scale, sinh(a_im) / scale];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _logComp(a_re, a_im) {
  if (!a_im) return [log(a_re), 0];
  return [log(_absComp(a_re, a_im)), _argComp(a_re, a_im)];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _sqrtComp(a_re, a_im) {
  var r = _absComp(a_re, a_im);
  var t = atan2(a_im, a_re) / 2;
  return [r * cos(t), r * sin(t)];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _sinhComp(a_re, a_im) {
  var real = sinh(a_re);
  var imag = sin(a_im);
  if (!a_im) return [real, 0];
  if (!a_re) return [0, imag];
  return [real * cos(a_im), imag * cosh(a_re)];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _coshComp(a_re, a_im) {
  var real = cosh(a_re);
  var imag = cos(a_im);
  if (!a_im) return [real, 0];
  if (!a_re) return [imag, 0];
  return [real * imag, sinh(a_re) * sin(a_im)];
}

/**
 * @ignore
 * @param {number} a_re
 * @param {number} a_im
 * @return {Array.<number>}
 */
function _tanhComp(a_re, a_im) {
  if (!a_im) return [tan(a_re), 0];
  if (!a_re) return [0, tanh(a_im)];
  a_re <<= 1;
  a_im <<= 1;
  var scale = cosh(a_re) + cos(a_im);
  return [sinh(a_re) / scale, sin(a_im) / scale];
}

/**
 * @class
 * @classdesc The ComplexNumber object is the object representation of a
 *            complex number in JavaScript. The nonstatic methods of this
 *            class are non-generic and enable several common basic
 *            operations of complex numbers. The static methods provide
 *            means to easily convert from the builtin class Number to
 *            instances of this class.
 * 
 *            The class uses two-entry arrays internally to compute the
 *            values.
 * 
 * @desc Constructs the ComplexNumber object.
 * @param {number} real - real part
 * @param {number} imaginary - imaginary part
 * @throws {TypeError}
 */
var ComplexNumber = function (real, imaginary) {
  if (!isNumber(real) || !isNumber(imaginary)) throw new TypeError();
  /**
   * @ignore
   * @type {number}
   */
  var re = real;
  
  /**
   * @ignore
   * @type {number}
   */
  var im = imaginary;
  
  Object.defineProperty(this, 'prototype', { value: {
    /** @lends ComplexNumber.prototype */
    
    /**
     * @member {number}
     * @readonly
     * @desc The accessor property for the real part
     */
    get 'real'() {
      return re;
    },
    
    /**
     * @member {number}
     * @readonly
     * @desc The accessor property for the real part
     */
    get 'imag'() {
      return im;
    },
    
    'constructor': ComplexNumber,
    
    /**
     * @method
     * @override
     * @desc The class-specific override for toString. It does do some formatting
     *       to the output, demonstrated in the examples.
     * 
     * @example
     * new ComplexNumber(1, 1).toString();   // '1 + i', not '1 + 1i'
     * new ComplexNumber(1, 2).toString();   // '1 + 2i'
     * new ComplexNumber(1, -1).toString();  // '1 - i', not '1 - 1i'
     * new ComplexNumber(1, -2).toString();  // '1 - 2i'
     * new ComplexNumber(-1, 1).toString();  // '-1 + i'
     * new ComplexNumber(-1, -2).toString(); // '-1 - 2i'
     * @return {string} - the current instance converted to a string primitive
     */
    'toString': function () {
      if (isNan(re) || isNan(im)) return 'NaN';
      
      if (!isFin(re) || !isFin(im)) return 'Infinity';
      
      if (!im) return re + '';
      if (!re) {
        if (im === 1) return 'i';
        if (im === -1) return '-i';
        return im + 'i';
      }
      
      /**
       * @type {number}
       * @ignore
       */
      var imag = im;
      
      /**
       * @type {boolean}
       * @ignore
       */
      var positive = imag > 0;
      
      /**
       * @type {string}
       * @ignore
       */
      var pm = positive ? ' + ' : ' - ';
      
      if (!positive) imag = -imag;
      
      if (imag === 1) return re + pm + 'i';
      
      return re + pm + imag + 'i';
    },
    
    /**
     * @method
     * @desc Add a Number object or literal or ComplexNumber object to this
     *       ComplexNumber instance, returning a new instance
     * @param {(number|ComplexNumber)} num - the number to add
     * @return {ComplexNumber} - the resulting instance
     */
    'plus': function (num) {
      return toComplex(isNumber(num) ?
        _plusNum(re, im, num) :
        _plusComp(re, im, num.real, num.imag));
    },
    
    /**
     * @method
     * @desc Subtract a Number object or literal or ComplexNumber object from
     *       this ComplexNumber instance, returning a new instance
     * @param {(number|ComplexNumber)} num - the number to subtract
     * @return {ComplexNumber} - the resulting instance
     */
    'minus': function (num) {
      return toComplex(isNumber(num) ?
        _minusNum(re, im, num) :
        _minusComp(re, im, num.real, num.imag));
    },
    
    /**
     * @method
     * @desc Multiply a Number object or literal or ComplexNumber object to this
     *       ComplexNumber instance, returning a new instance
     * @param {(number|ComplexNumber)} num - the number to multiply
     * @return {ComplexNumber} - the resulting instance
     */
    'times': function (num) {
      return toComplex(isNumber(num) ?
        _timesNum(re, im, num) :
        _timesComp(re, im, num.real, num.imag));
    },
    
    /**
     * @method
     * @desc Add a Number object or literal or ComplexNumber object to this
     *       ComplexNumber instance, returning a new instance
     * @param {(number|ComplexNumber)} num - The number to divide by
     * @return {ComplexNumber} - the resulting instance
     */
    'divide': function (num) {
      return toComplex(isNumber(num) ?
        _divideNum(re, im, num) :
        _divideComp(re, im, num.re, num.im));
    },
    
    /**
     * @method
     * @desc Returns the reciprocal of the current ComplexNumber instance
     * @return {ComplexNumber} - the resulting instance
     */
    'recip': function () {
      return toComplex(_recip(re, im));
    },
    
    /**
     * @method
     * @desc Returns the argument of the current ComplexNumber instance
     * @return {number} - the resulting number
     */
    'arg': function () {
      return _arg(re, im);
    },
    
    /**
     * @method
     * @desc Returns the absolute value/modulus of the current ComplexNumber
     *       instance
     * @return {number} - the resulting number
     */
    'abs': function () {
      return _abs(re, im);
    },
    
    /**
     * @method
     * @desc Returns the conjugate of the current ComplexNumber instance
     * @return {ComplexNumber} - the resulting instance
     */
    'conj': function () {
      return toComplex(_conj(re, im));
    },
    
    /**
     * @method
     * @desc Returns the additive inverse of the current ComplexNumber instance
     * @return {ComplexNumber} - the resulting instance
     */
    'negate': function () {
      return toComplex([-re, -im]);
    },
    
    /**
     * @method
     * @desc Returns *e* raised to the power of the current ComplexNumber
     *       instance
     * @return {ComplexNumber} - the resulting instance
     */
    'exp': function () {
      return toComplex(_exp(re, im));
    },
    
    /**
     * @method
     * @desc Returns the sine of the current ComplexNumber instance
     * @return {ComplexNumber} - the resulting instance
     */
    'sin': function () {
      return toComplex(_sin(re, im));
    },
    
    /**
     * @method
     * @desc Returns the cosine of the current ComplexNumber instance
     * @return {ComplexNumber} - the resulting instance
     */
    'cos': function () {
      return toComplex(_cos(re, im));
    },
    
    /**
     * @method
     * @desc Returns the tangent of the current ComplexNumber instance
     * @return {ComplexNumber} - the resulting instance
     */
    'tan': function () {
      return toComplex(_tan(re, im));
    },
    
    /**
     * @method
     * @desc Returns the natural logarithm of the current ComplexNumber instance
     * @return {ComplexNumber} - the resulting instance
     */
    'log': function () {
      return toComplex(_log(re, im));
    },
    
    /**
     * @method
     * @desc Returns the square root of the current ComplexNumber instance
     * @return {ComplexNumber} - the resulting instance
     */
    'sqrt': function () {
      return toComplex(_sqrt(re, im));
    },
    
    /**
     * @method
     * @desc Returns the hyperbolic sine of the current ComplexNumber instance
     * @return {ComplexNumber} - the resulting instance
     */
    'sinh': function () {
      return toComplex(_sinh(re, im));
    },
    
    /**
     * @method
     * @desc Returns the hyperbolic cosine of the current ComplexNumber
     *       instance
     * @return {ComplexNumber} - the resulting instance
     */
    'cosh': function () {
      return toComplex(_cosh(re, im));
    },
    
    /**
     * @method
     * @desc Returns the hyperbolic tangent of the current ComplexNumber
     *       instance
     * @return {ComplexNumber} - the resulting instance
     */
    'tanh': function () {
      return toComplex(_tanh(re, im));
    }
  }});
  return this;
};

// mixin static methods
ComplexNumber = mixin(ComplexNumber, { /** @lends ComplexNumber */
  /* see function declarations for documentation */
  'realToComplex': realToComplex,
  'imagToComplex': imagToComplex,
  
  /**
   * @method
   * @desc Get real part of a number.
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {number} - the real part of the number
   */
  'real': function (num) {
    return isNumber(num) ? num : num.real;
  },
  
  /**
   * @method
   * @desc Get imaginary part of a number.
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {number} - the imaginary part of the number
   */
  'imag': function (num) {
    return isNumber(num) ? 0 : num.imag;
  },
  
  /**
   * @method
   * @desc Add two numbers, both either being of type Number or ComplexNumber
   * @param {(ComplexNumber|number)} num1 - a (possibly complex) number
   * @param {(ComplexNumber|number)} num2 - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'plus': function (num1, num2) {
    if (isNumber(num2)) {
      return isNumber(num1) ? realToComplex(num1 + num2) : toComplex([num2.real + num1, num2.imag]);
    } else {
      return num1.plus(num2);
    }
  },
  
  /**
   * @method
   * @desc Subtract the second number from the first, both being possibly complex.
   * @param {(ComplexNumber|number)} num1 - a (possibly complex) number
   * @param {(ComplexNumber|number)} num2 - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'minus': function (num1, num2) {
    if (isNumber(num2)) {
      return isNumber(num1) ? realToComplex(num1 - num2) : toComplex([num2.real - num1, num1.imag]);
    } else {
      return num1.minus(num2);
    }
  },
  
  /**
   * @method
   * @desc Multiply two numbers, both either being of type Number or ComplexNumber
   * @param {(ComplexNumber|number)} num1 - a (possibly complex) number
   * @param {(ComplexNumber|number)} num2 - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'times': function (num1, num2) {
    if (isNumber(num2)) {
      return isNumber(num1) ? realToComplex(num1 * num2) : toComplex([num1.real * num2, num1.imag * num2]);
    } else {
      return num1.times(num2);
    }
  },
  
  /**
   * @method
   * @desc Divide the second number from the first, both being possibly complex.
   * @param {(ComplexNumber|number)} num1 - a (possibly complex) number
   * @param {(ComplexNumber|number)} num2 - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'divide': function (num1, num2) {
    if (isNumber(num2)) {
      return isNumber(num1) ? realTComplex(num1 / num2) : toComplex([num1.real / num2, num1.imag / num2]);
    } else {
      return num1.divide(num2);
    }
  },
  
  /**
   * @method
   * @desc Return the reciprocal of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'recip': function (num) {
    return isNumber(num) ? realToComplex(1 / num) : num1.recip();
  },
  
  /**
   * @method
   * @desc Return the angle/argument of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'arg': function (num) {
    if (isNumber(num)) {
      if (isNan(num) || num === 0) return realToComplex(NaN);
      return realToComplex(num > 0 ? 0 : pi);
    } else {
      return num.arg();
    }
  },
  
  /**
   * @method
   * @desc Return the absolute value/modulus of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'abs': function (num) {
    return isNumber(num) ? realToComplex(abs(num)) : num.abs();
  },
  
  /**
   * @method
   * @desc Return the conjugate of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {(ComplexNumber|number)} - the resulting number
   */
  'conj': function (num) {
    return isNumber(num) ? realToComplex(num) : num.conj();
  },
  
  /**
   * @method
   * @desc Return the additive inverse of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'negate': function (num) {
    return isNumber(num) ? realToComplex(-num) : num.negate();
  },
  
  /**
   * @method
   * @desc Return *e* raised to the power of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'exp': function (num) {
    return isNumber(num) ? realToComplex(exp(num)) : num.exp();
  },
  
  /**
   * @method
   * @desc Return the sine of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'sin': function (num) {
    return isNumber(num) ? realToComplex(sin(num)) : num.sin();
  },
  
  /**
   * @method
   * @desc Return the cosine of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'cos': function (num) {
    return isNumber(num) ? realToComplex(cos(num)) : num.cos();
  },
  
  /**
   * @method
   * @desc Return the tangent of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'tan': function (num) {
    return isNumber(num) ? realToComplex(tan(num)) : num.tan();
  },
  
  /**
   * @method
   * @desc Return the natural logarithm of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'log': function (num) {
    return isNumber(num) ? realToComplex(log(num)) : num.log();
  },
  
  /**
   * @method
   * @desc Return the square root of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'sqrt': function (num) {
    if (isNumber(num)) {
      return num >= 0 ?
        realToComplex(sqrt(num)) :
        imagToComplex(sqrt(-num));
    } else {
      return num.sqrt();
    }
  },
  
  /**
   * @method
   * @desc Return the hyperbolic sine of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'sinh': function (num) {
    return isNumber(num) ? realToComplex(sinh(num)) : num.sinh();
  },
  
  /**
   * @method
   * @desc Return the hyperbolic cosine of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'cosh': function (num) {
    return isNumber(num) ? realToComplex(cosh(num)) : num.cosh();
  },
  
  /**
   * @method
   * @desc Return the hyperbolic tangent of a (possibly complex) number
   * @param {(ComplexNumber|number)} num - a (possibly complex) number
   * @return {ComplexNumber} - the resulting number
   */
  'tanh': function (num) {
    return isNumber(num) ? realToComplex(tanh(num)) : num.tanh();
  }
});

Object.defineProperty(global, 'ComplexNumber', { value: ComplexNumber });

// This class is immutable.
freeze(global['ComplexNumber']);
});
