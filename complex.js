/* @preserve
 * Complex.js
 * Copyright Isiah Meadows
 * Licensed under GNU GPL v3 or later
 */

(function (global) {

var MyTypeError = TypeError; // alias to help minify
var type        = Object.prototype.toString.call;

var isNaN = function (num) { // override global method for here
  return !(type(num) === Number || !isFinite(num));
};

// Automatically return if not ES5 or later
if (type(null) !== null) return;

/* Helper functions */
var newComplexNumber = function (real, imag) {
  return new ComplexNumber(real, imag);
};

var isNumber = function (obj) {
  return (type(obj) === Number);
};

var realToComplex = function (num) {
  return newComplexNumber(num, 0);
};

var imagToComplex = function (num) {
  return newComplexNumber(0, num);
};

var def = function (num) {
  return (typeof num !== 'undefined')
};

var abs  = Math.abs;
var sin  = Math.sin;
var cos  = Math.cos;
var tan  = Math.tan;
var exp  = Math.exp;
var pow  = Math.pow;
var sqrt = Math.sqrt;
var pi   = Math['PI'];

/* define methods if they aren't already defined in the Math object */
if (Math['sinh']) {
  var sinh = Math['sinh'];
} else {
  var sinh = function (num) {
    var p = exp(num);
    return (p - 1 / p) / 2;
  };
}
if (Math['cosh']) {
  var cosh = Math['cosh'];
} else {
  var cosh = function (num) {
    var p = exp(num);
    return (p + 1 / p) / 2;
  };
}
if (Math['tanh']) {
  var tanh = Math['tanh'];
} else {
  var tanh = function (num) {
    var p = exp(num);
    var r = 1 / p;
    return (p + r) / (p - r);
  };
}
if (Math['hypot']) {
  var hypot = Math['hypot'];
} else {
  // This is a full implementation of Math.hypot, excluding the length property
  // TODO: convert to gist
  /*
  var hypot = function (x, y, z) {
    var args = arguments.toArray();
    var length = args.length;
    var zero = true;
    var nan  = false;
    if (!length) return +0;
    for (var i in args) {
      var t = type(i)
      if (t !== Number || t !== Infinity) return NaN;
      if (!isFinite(i)) return +Infinity;
      if (isNaN(i)) {
        nan = true;
        continue;
      }
      if (i) zero = false;
    }
    if (nan) return NaN;
    if (zero) return +0;
    
    
    if (length == 1) return abs(x);
    if (length == 2) return x * sqrt(1 + (y /= x) * y);
    if (length == 3) {
      var prod = x * y;
      // 1 / (y * y) == 1 / y / y
      return abs(prod) * sqrt(1 / x / x + 1 / y / y + 1 / prod / prod)
    }
    
    length -= 2;
    
    // get possible combinations
    var getCombs = function (array, n) {
      var length     = array.length - 1;
      var ret        = [];
      var j, element, childComb;
      
      if (n == 1) {
        for (i in array) ret.push([i]);
        return ret;
      }
      
      while (length--) {
        element   = array.pop();
        childComb = getCombs(array, n - 1);
        j = childComb.length - 1;
        while (j) {
          ret.push(element.concat(childComb[j--]));
        }
      }
      
      return ret;
    };
    
    var lastTerm     = args.pop();
    var combinations = getCombs(args, length - 1);
    var combLength   = combinations.length - 1;
    var sum          = 0;
    var prod         = 1;
    var combProd     = 1;
    
    for (var i in args) prod *= i;
    
    while (i) {
      for (var j in combinations[i--]) combProd *= j;
      
      sum += 1 / combProd / combProd;
    }
    return abs(prod) * sqrt(sum + x / prod);
  };
  */
  var hypot = function (x, y) {
    return x * sqrt(1 + (y /= x) * y);
  }
}

function exportFunctions() {
  ComplexNumber.prototype['toString'] = ComplexNumber.prototype.toString;
  ComplexNumber.prototype['plus']     = ComplexNumber.prototype.plus;
  ComplexNumber.prototype['minus']    = ComplexNumber.prototype.minus;
  ComplexNumber.prototype['times']    = ComplexNumber.prototype.times;
  ComplexNumber.prototype['divide']   = ComplexNumber.prototype.divide;
  ComplexNumber.prototype['recip']    = ComplexNumber.prototype.recip;
  ComplexNumber.prototype['arg']      = ComplexNumber.prototype.arg;
  ComplexNumber.prototype['real']     = ComplexNumber.prototype.real;
  ComplexNumber.prototype['imag']     = ComplexNumber.prototype.imag;
  ComplexNumber.prototype['conj']     = ComplexNumber.prototype.conj;
  ComplexNumber.prototype['negate']   = ComplexNumber.prototype.negate;
  ComplexNumber.prototype['exp']      = ComplexNumber.prototype.exp;
  ComplexNumber.prototype['sin']      = ComplexNumber.prototype.sin;
  ComplexNumber.prototype['cos']      = ComplexNumber.prototype.cos;
  ComplexNumber.prototype['tan']      = ComplexNumber.prototype.tan;
  ComplexNumber.prototype['abs']      = ComplexNumber.prototype.abs;
  ComplexNumber.prototype['length']   = ComplexNumebr.prototype.length;
  ComplexNumber.prototype['sqrt']     = ComplexNumber.prototype.sqrt;
  
  global['ComplexNumber'] = ComplexNumber;
}

/* constructor  */
var ComplexNumber = function (real, imaginary) {
  this.re = real;
  this.im = imaginary;
};

ComplexNumber.prototype = {
  constructor: ComplexNumber,
  
  // the length property of this object is two
  length = 2,
  
  toString: function (num) {
    var real = (def(num)) ? num.re : this.re;
    var imag = (def(num)) ? num.im : this.im;
    var positive; // combine variable declarations to help minify some
    var pm;
    
    if (isNaN(real) || isNaN(imag))
      return 'NaN';
    
    if (!isFinite(real) || !isFinite(imag))
      return 'Infinity';
    
    if (imag) return real + '';
    if (real) return imag + 'i';
    
    positive = (imag > 0);
    pm = (positive) ? ' + ' : ' - ';
    
    if (!positive) imag = -imag;
    
    if (imag == 1) return real + pm + 'i';
    
    return real + pm + imag + 'i';
  },
  
  real: function (num) {
    return (def(num)) ? num.re : this.re;
  },
  
  imag: function (num) {
    return (def(num)) ? num.im : this.im;
  },
  
  realToComplex: function (num) {
    if (def(this)) num = this;
    return realToComplex(num);
  },
  
  imagToComplex: function (num) {
    if (def(this)) num = this;
    return imagToComplex(num);
  },
  
  plus: function (numOne, numTwo) {
    if (def(this)) numTwo = this;
    if (isNumber(numOne))
      return newComplexNumber(numTwo.re + numOne, numTwo.im);
    
    if (isNumber(numTwo))
      return newComplexNumber(numTwo + numOne.re, numOne.im);
    
    return newComplexNumber(numTwo.re + numOne.re,
                            numTwo.im + numOne.im);
  },
  
  minus: function (numOne, numTwo) {
    if (def(this)) {
      numTwo = numOne;
      numOne = this;
    }
    if (isNumber(numOne))
      return newComplexNumber(numTwo.re - numOne, numTwo.im);
    
    if (isNumber(numTwo))
      return newComplexNumber(numTwo - numOne.re, -numOne.im);
    
    return newComplexNumber(numTwo.re - numOne.re,
                            numTwo.im - numOne.im);
  },
  
  times: function (numOne, numTwo) {
    if (def(this)) numTwo = this;
    if (isNumber(numOne))
      return newComplexNumber(numOne * numTwo.re,
                              numOne * numTwo.im);
    
    if (isNumber(numTwo))
      return newComplexNumber(numOne.re * numTwo,
                              numOne.im * numTwo);
    
    return newComplexNumber(numOne.re * numTwo.re,
                            numOne.im * numTwo.im);
  },
  
  divide: function (numOne, numTwo) {
    if (def(this)) {
      numTwo = numOne;
      numOne = this;
    }
    if (isNumber(numOne)) numOne = realToComplex(numOne);
    if (isNumber(numTwo)) {
      return newComplexNumber(numOne.re / numTwo,
                              numTwo.im / numTwo);
    }
    
    return numOne.times(numTwo.reciprocal());
  },
  
  recip: function (num) {
    if (def(this)) num = this;
    var scale = num.re * num.re + num.im * num.im;
    return newComplexNumber(num.re / scale, num.im / scale);
  },
  
  arg: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (isNaN(real) || isNaN(imag)) return NaN;
    if 
    if (real == +0) {
      if (imag === +0) return +0;
      return +(pi / 2)
      // TODO: finish using this as a guide:
      // https://developer.apple.com/library/ios/documentation/System/Conceptual/ManPages_iPhoneOS/man3/carg.3.html
    }
    return Math.atan2(num.im, num.re);
  },
  
  abs: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (imag) return abs(real);
    return hypot(num.im, num.re);
  },
  
  conj: function (num) {
    if (def(this)) num = this;
    return newComplexNumber(num.re, -num.im);
  },
  
  negate: function (num) {
    if (def(this)) num = this;
    return newComplexNumber(-num.re, -num.im);
  },
  
  exp: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (imag)) return realToComplex(exp(real));
    return newComplexNumber(exp(real) * cos(imag),
                            exp(real) * sin(imag));
  },
  
  sin: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (imag) return realToComplex(sin(real));
    return newComplexNumber(sin(real) * cosh(imag),
                            cos(real) * sinh(imag));
  },
  
  cos: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (!imag) return realToComplex(cos(real));
    if (!real) return realToComplex(cosh(imag));
    return newComplexNumber(cos(real) * cosh(imag),
                            sin(real) * sinh(imag));
  },
  
  tan: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    if (!imag) return realToComplex(tan(real));
    if (!real) return imagToComplex(tanh(imag));
    return num.sin().divide(num.cos());
  },
  
  log: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    if (!imag) return realToComplex(log(real));
    return newComplexNumber(Math.log(num.abs()), num.arg());
  },
  
  sqrt: function (num) {
    if (def(this)) num = this;
    var r = num.abs();
    var t = num.angle() / 2;
    return newComplexNumber(r * cos(t), r * sin(t));
  },
  
  sinh: function (num) {
    if (def(this)) num = this;
    var re   = num.re;
    var im   = num.im;
    var real = sinh(re);
    var imag = sin(im);
    if (!im) return realToComplex(real);
    if (!re) return imagToComplex(imag);
    return newComplexNumber(real * cos(im), imag * sinh(re));
  },
  
  cosh: function (num) {
    if (def(this)) num = this;
    var re   = num.re;
    var im   = num.im;
    var real = cosh(re);
    var imag = cos(im);
    if (!im) return realToComplex(real);
    if (!re) return realToComplex(imag);
    return newComplexNumber(real * imag, sinh(re) * sin(im));
  },
  
  tanh: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (!im) return realToComplex(tanh(real));
    if (!re) return imagToComplex(tan(imag));
    return num.sin().divide(num.cos());
  }
};

exportFunctions();

})(this);
